import crypto from 'node:crypto';

export type RawAsymmetricEncryptionKeyPair = {
  privateKey: Uint8Array;
  publicKey: Uint8Array;
};

export class AsymmetricEncryptionKeyPair {
  privateKey: CryptoKey;
  publicKey: CryptoKey;

  constructor({ privateKey, publicKey }: { privateKey: CryptoKey; publicKey: CryptoKey }) {
    this.privateKey = privateKey;
    this.publicKey = publicKey;
  }

  static async import({ privateKey, publicKey }: RawAsymmetricEncryptionKeyPair) {
    return new this({
      privateKey: await crypto.webcrypto.subtle.importKey('pkcs8', privateKey, { name: 'RSA-OAEP' }, true, [
        'encrypt',
        'decrypt'
      ]),
      publicKey: await crypto.webcrypto.subtle.importKey('spki', publicKey, { name: 'RSA-OAEP' }, true, [
        'encrypt',
        'decrypt'
      ])
    });
  }

  async export(): Promise<RawAsymmetricEncryptionKeyPair> {
    return {
      privateKey: new Uint8Array(await crypto.webcrypto.subtle.exportKey('pkcs8', this.privateKey)),
      publicKey: new Uint8Array(await crypto.webcrypto.subtle.exportKey('spki', this.publicKey))
    };
  }
}

export class EncryptedData extends Uint8Array {
  constructor(buffer: ArrayBufferLike) {
    super(buffer);
  }

  toArray() {
    return Array.from(this);
  }

  toJSON() {
    return this.toArray();
  }
}
