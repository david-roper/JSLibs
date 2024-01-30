import crypto from 'node:crypto';

type EncryptionKey = {
  export(): Promise<Uint8Array>;
};

type EncryptionKeyConstructor = {
  import: (data: Uint8Array) => Promise<EncryptionKey>;
  new (nativeKey: CryptoKey): EncryptionKey;
};

export const PublicKey: EncryptionKeyConstructor = class implements EncryptionKey {
  constructor(public nativeKey: CryptoKey) {}

  static async import(data: Uint8Array): Promise<EncryptionKey> {
    return new this(
      await crypto.webcrypto.subtle.importKey('spki', data, { name: 'RSA-OAEP' }, true, ['encrypt', 'decrypt'])
    );
  }
  async export(): Promise<Uint8Array> {
    return new Uint8Array(await crypto.webcrypto.subtle.exportKey('spki', this.nativeKey));
  }
};

export const PrivateKey: EncryptionKeyConstructor = class implements EncryptionKey {
  constructor(public nativeKey: CryptoKey) {}

  static async import(data: Uint8Array): Promise<EncryptionKey> {
    return new this(
      await crypto.webcrypto.subtle.importKey('pkcs8', data, { name: 'RSA-OAEP' }, true, ['encrypt', 'decrypt'])
    );
  }
  async export(): Promise<Uint8Array> {
    return new Uint8Array(await crypto.webcrypto.subtle.exportKey('pkcs8', this.nativeKey));
  }
};

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
