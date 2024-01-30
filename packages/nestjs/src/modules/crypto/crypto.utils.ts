export class SerializableUint8Array extends Uint8Array {
  constructor(array: ArrayBufferLike | ArrayLike<number>) {
    super(array);
  }

  toArray() {
    return Array.from(this);
  }

  toJSON() {
    return this.toArray();
  }
}

export type RawAsymmetricEncryptionKeyPair = {
  privateKey: SerializableUint8Array;
  publicKey: SerializableUint8Array;
};

export class AsymmetricEncryptionKeyPair {
  privateKey: CryptoKey;
  publicKey: CryptoKey;

  private static algorithm = {
    hash: 'SHA-512',
    modulusLength: 4096,
    name: 'RSA-OAEP',
    publicExponent: new Uint8Array([1, 0, 1])
  };

  constructor({ privateKey, publicKey }: { privateKey: CryptoKey; publicKey: CryptoKey }) {
    this.privateKey = privateKey;
    this.publicKey = publicKey;
  }

  static async fromRaw({
    privateKey,
    publicKey
  }: RawAsymmetricEncryptionKeyPair): Promise<AsymmetricEncryptionKeyPair> {
    return new this({
      privateKey: await this.importPrivateKey(privateKey),
      publicKey: await this.importPublicKey(publicKey)
    });
  }

  static async generate(): Promise<AsymmetricEncryptionKeyPair> {
    const { privateKey, publicKey } = await globalThis.crypto.subtle.generateKey(this.algorithm, true, [
      'encrypt',
      'decrypt'
    ]);
    return new this({ privateKey, publicKey });
  }

  private static async importPrivateKey(rawKey: Uint8Array): Promise<CryptoKey> {
    return globalThis.crypto.subtle.importKey('pkcs8', rawKey, this.algorithm, true, ['decrypt']);
  }

  private static async importPublicKey(rawKey: Uint8Array): Promise<CryptoKey> {
    return globalThis.crypto.subtle.importKey('spki', rawKey, this.algorithm, true, ['encrypt']);
  }

  async export(): Promise<RawAsymmetricEncryptionKeyPair> {
    return {
      privateKey: await this.exportPrivateKey(this.privateKey),
      publicKey: await this.exportPublicKey(this.publicKey)
    };
  }

  private async exportPrivateKey(key: CryptoKey) {
    return new SerializableUint8Array(await globalThis.crypto.subtle.exportKey('pkcs8', key));
  }

  private async exportPublicKey(key: CryptoKey) {
    return new SerializableUint8Array(await globalThis.crypto.subtle.exportKey('spki', key));
  }
}
