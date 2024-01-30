import { beforeAll, describe, expect, it } from 'bun:test';

import { AsymmetricEncryptionKeyPair, SerializableUint8Array } from '../crypto.utils';

describe('SerializableUint8Array', () => {
  it('should correctly wrap an ArrayBufferLike object', () => {
    const buffer = new ArrayBuffer(8);
    const uint8Array = new SerializableUint8Array(buffer);
    expect(uint8Array.buffer).toBe(buffer);
  });

  it('toArray returns an array with correct elements', () => {
    const serializableArray = new SerializableUint8Array([1, 2, 3]);
    expect(serializableArray.toArray()).toEqual([1, 2, 3]);
  });

  it('toJSON returns an array similar to toArray', () => {
    const buffer = new Uint8Array([4, 5, 6]);
    const serializableArray = new SerializableUint8Array(buffer);
    expect(serializableArray.toJSON()).toEqual(serializableArray.toArray());
  });
});

describe('AsymmetricEncryptionKeyPair', () => {
  let keyPair: AsymmetricEncryptionKeyPair;

  beforeAll(async () => {
    keyPair = await AsymmetricEncryptionKeyPair.generate();
  });

  describe('generate', () => {
    it('should create a privateKey and publicKey, which are instances of CryptoKeys', () => {
      expect(keyPair.privateKey).toBeInstanceOf(CryptoKey);
      expect(keyPair.publicKey).toBeInstanceOf(CryptoKey);
    });
    it('should return an AsymmetricEncryptionKeyPair instance', () => {
      expect(keyPair).toBeInstanceOf(AsymmetricEncryptionKeyPair);
    });
  });

  describe('fromRaw', () => {
    it('should create an AsymmetricEncryptionKeyPair instance', async () => {
      const rawKeyPair = await keyPair.export();
      const newKeyPair = await AsymmetricEncryptionKeyPair.fromRaw(rawKeyPair);
      expect(newKeyPair).toBeInstanceOf(AsymmetricEncryptionKeyPair);
      expect(newKeyPair.privateKey).toBeInstanceOf(CryptoKey);
      expect(newKeyPair.publicKey).toBeInstanceOf(CryptoKey);
    });
  });

  describe('export', () => {
    it('should return RawAsymmetricEncryptionKeyPair', async () => {
      const rawKeyPair = await keyPair.export();
      expect(rawKeyPair).toHaveProperty('privateKey');
      expect(rawKeyPair).toHaveProperty('publicKey');
      expect(rawKeyPair.privateKey).toBeInstanceOf(SerializableUint8Array);
      expect(rawKeyPair.publicKey).toBeInstanceOf(SerializableUint8Array);
    });
  });

  describe('export and fromRaw', () => {
    it('should be able to continuously convert between formats ', async () => {
      const exportedKeys = await keyPair.export();
      const importedKeys = await AsymmetricEncryptionKeyPair.fromRaw(exportedKeys);
      const reexportedKeys = await importedKeys.export();
      expect(exportedKeys).toMatchObject(reexportedKeys);
    });
  });
});
