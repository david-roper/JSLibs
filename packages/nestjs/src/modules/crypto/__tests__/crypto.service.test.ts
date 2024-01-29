import { beforeEach, describe, expect, it } from 'bun:test';

import { Test, TestingModule } from '@nestjs/testing';

import { CRYPTO_MODULE_OPTIONS_TOKEN, type CryptoModuleOptions, EncryptedData } from '..';
import { CryptoService } from '../crypto.service';

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
    it('should generate a key pair with private and public keys', async () => {
      const keyPair = await cryptoService.generateKeyPair();
      expect(keyPair).toHaveProperty('privateKey');
      expect(keyPair).toHaveProperty('publicKey');
      expect(keyPair.privateKey).toBeInstanceOf(CryptoKey);
      expect(keyPair.publicKey).toBeInstanceOf(CryptoKey);
    });
  });

  describe('encrypt and decrypt', () => {
    const originalText = 'Cela devrait fonctionner avec les caractères unicode 😃';
    let publicKey: CryptoKey, privateKey: CryptoKey;

    beforeEach(async () => {
      const keyPair = await cryptoService.generateKeyPair();
      publicKey = keyPair.publicKey;
      privateKey = keyPair.privateKey;
    });

    it('encrypt should return an instance of EncryptedData', async () => {
      const encrypted = await cryptoService.encrypt(originalText, publicKey);
      expect(encrypted).toBeInstanceOf(EncryptedData);
    });

    it('decrypt should return original text', async () => {
      const encrypted = await cryptoService.encrypt(originalText, publicKey);
      const decrypted = await cryptoService.decrypt(encrypted, privateKey);
      expect(decrypted).toBe(originalText);
    });

    it('decrypt with incorrect private key should fail', async () => {
      const encrypted = await cryptoService.encrypt(originalText, publicKey);
      const keyPair = await cryptoService.generateKeyPair();
      expect(cryptoService.decrypt(encrypted, keyPair.privateKey)).rejects.toThrow();
    });
  });
});
