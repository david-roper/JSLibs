import { beforeAll, describe, expect, it } from 'bun:test';

import { AsymmetricEncryptionKeyPair, PrivateKey, PublicKey } from './encryption';
import { SerializableUint8Array } from './utils';

describe('AsymmetricEncryptionKeyPair', () => {
  let keyPair: AsymmetricEncryptionKeyPair;

  beforeAll(async () => {
    keyPair = await AsymmetricEncryptionKeyPair.generate();
  });

  describe('generate', () => {
    it('should create a privateKey and publicKey', () => {
      expect(keyPair.privateKey).toBeInstanceOf(PrivateKey);
      expect(keyPair.publicKey).toBeInstanceOf(PublicKey);
    });
    it('should return an AsymmetricEncryptionKeyPair instance', () => {
      expect(keyPair).toBeInstanceOf(AsymmetricEncryptionKeyPair);
    });
  });

  describe('fromRaw', () => {
    it('should create an AsymmetricEncryptionKeyPair instance', async () => {
      const rawKeyPair = await keyPair.toRaw();
      const newKeyPair = await AsymmetricEncryptionKeyPair.fromRaw(rawKeyPair);
      expect(newKeyPair).toBeInstanceOf(AsymmetricEncryptionKeyPair);
      expect(newKeyPair.privateKey).toBeInstanceOf(PrivateKey);
      expect(newKeyPair.publicKey).toBeInstanceOf(PublicKey);
    });
  });

  describe('toRaw', () => {
    it('should return RawAsymmetricEncryptionKeyPair', async () => {
      const rawKeyPair = await keyPair.toRaw();
      expect(rawKeyPair).toHaveProperty('privateKey');
      expect(rawKeyPair).toHaveProperty('publicKey');
      expect(rawKeyPair.privateKey).toBeInstanceOf(SerializableUint8Array);
      expect(rawKeyPair.publicKey).toBeInstanceOf(SerializableUint8Array);
    });
  });

  describe('toRaw and fromRaw', () => {
    it('should be able to export the keys to raw, and then import those keys', async () => {
      const exportedKeys = await keyPair.toRaw();
      const importedKeys = await AsymmetricEncryptionKeyPair.fromRaw(exportedKeys);
      const reexportedKeys = await importedKeys.toRaw();
      expect(exportedKeys).toMatchObject(reexportedKeys);
    });
  });
});
