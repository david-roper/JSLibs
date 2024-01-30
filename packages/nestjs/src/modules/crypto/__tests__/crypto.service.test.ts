import { beforeEach, describe, expect, it } from 'bun:test';

import { Test, TestingModule } from '@nestjs/testing';

import { CRYPTO_MODULE_OPTIONS_TOKEN, type CryptoModuleOptions } from '../crypto.config';
import { CryptoService } from '../crypto.service';
import { AsymmetricEncryptionKeyPair, SerializableUint8Array } from '../crypto.utils';

describe('CryptoService', () => {
  let cryptoService: CryptoService;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [
        CryptoService,
        {
          provide: CRYPTO_MODULE_OPTIONS_TOKEN,
          useValue: {
            secretKey: 'testing'
          } satisfies CryptoModuleOptions
        }
      ]
    }).compile();
    cryptoService = moduleRef.get(CryptoService);
  });

  it('should be defined', () => {
    expect(cryptoService).toBeDefined();
  });

  describe('hash', () => {
    it('should create a hash that is not equal to the input value', () => {
      expect(cryptoService.hash('foo')).not.toBe('foo');
    });

    it('should create two hashes with the same value', () => {
      expect(cryptoService.hash('foo')).toBe(cryptoService.hash('foo'));
    });
  });

  describe('hashPassword', () => {
    it('should create a hash that is not equal to the input value', () => {
      expect(cryptoService.hashPassword('foo')).resolves.not.toBe('foo');
    });

    it('should create two different hashes for the same value, both of which can be verified', async () => {
      const h1 = await cryptoService.hashPassword('foo');
      const h2 = await cryptoService.hashPassword('foo');
      expect(h1).not.toBe(h2);
      expect(cryptoService.comparePassword('foo', h1)).resolves.toBeTrue();
      expect(cryptoService.comparePassword('foo', h2)).resolves.toBeTrue();
    });

    it('should return false when comparing a hash with an incorrect value', async () => {
      const hash = await cryptoService.hashPassword('foo');
      expect(cryptoService.comparePassword('bar', hash)).resolves.toBeFalse();
    });
  });

  describe('generateKeyPair', () => {
    let keyPair: AsymmetricEncryptionKeyPair;

    beforeEach(async () => {
      keyPair = await cryptoService.generateKeyPair();
    });

    it('should generate a key pair with private and public keys', () => {
      expect(keyPair).toHaveProperty('privateKey');
      expect(keyPair).toHaveProperty('publicKey');
    });
    it('should have private and public keys that are instances of CryptoKey', () => {
      expect(keyPair.privateKey).toBeInstanceOf(CryptoKey);
      expect(keyPair.publicKey).toBeInstanceOf(CryptoKey);
    });
    it('should return an instance of AsymmetricEncryptionKeyPair', () => {
      expect(keyPair).toBeInstanceOf(AsymmetricEncryptionKeyPair);
    });
  });

  describe('encrypt and decrypt', () => {
    const originalText = 'Cela devrait fonctionner avec les caractères unicode 😃';
    let keyPair: AsymmetricEncryptionKeyPair;

    beforeEach(async () => {
      keyPair = await cryptoService.generateKeyPair();
    });

    it('encrypt should return an instance of SerializableUint8Array', async () => {
      const encrypted = await cryptoService.encrypt(originalText, keyPair.publicKey);
      expect(encrypted).toBeInstanceOf(SerializableUint8Array);
    });

    it('decrypt should return original text', async () => {
      const encrypted = await cryptoService.encrypt(originalText, keyPair.publicKey);
      const decrypted = await cryptoService.decrypt(encrypted, keyPair.privateKey);
      expect(decrypted).toBe(originalText);
    });

    it('decrypt with incorrect private key should fail', async () => {
      const encrypted = await cryptoService.encrypt(originalText, keyPair.publicKey);
      const newKeyPair = await cryptoService.generateKeyPair();
      expect(cryptoService.decrypt(encrypted, newKeyPair.privateKey)).rejects.toThrow();
    });
  });

  describe('integration with AsymmetricEncryptionKeyPair', () => {
    const originalText = 'Cela devrait fonctionner avec les caractères unicode 😃';
    let keyPair: AsymmetricEncryptionKeyPair;

    beforeEach(async () => {
      keyPair = await cryptoService.generateKeyPair();
    });

    it('should be able to encrypt data, export the key, import the key, and decode the data', async () => {
      const encrypted = await cryptoService.encrypt(originalText, keyPair.publicKey);
      const rawKeyPair = await keyPair.export();
      const importedKeyPair = await AsymmetricEncryptionKeyPair.fromRaw(rawKeyPair);
      const decrypted = await cryptoService.decrypt(encrypted, importedKeyPair.privateKey);
      expect(decrypted).toBe(originalText);
    });
  });
});
