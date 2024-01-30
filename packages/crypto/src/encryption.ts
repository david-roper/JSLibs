import { SerializableUint8Array } from './utils';

export abstract class EncryptionKey {
  static algorithm = {
    hash: 'SHA-512',
    modulusLength: 4096,
    name: 'RSA-OAEP',
    publicExponent: new Uint8Array([1, 0, 1])
  };

  abstract cryptoKey: CryptoKey;
  abstract toRaw(): Promise<SerializableUint8Array>;
}

export type EncryptionKeyConstructor = {
  fromRaw: (key: Uint8Array) => Promise<EncryptionKey>;
  new (cryptoKey: CryptoKey): EncryptionKey;
};

export const PublicKey: EncryptionKeyConstructor = class extends EncryptionKey {
  constructor(public cryptoKey: CryptoKey) {
    super();
  }

  static async fromRaw(key: Uint8Array) {
    return new this(await globalThis.crypto.subtle.importKey('spki', key, this.algorithm, true, ['encrypt']));
  }
  async toRaw() {
    return new SerializableUint8Array(await globalThis.crypto.subtle.exportKey('spki', this.cryptoKey));
  }
};

export const PrivateKey: EncryptionKeyConstructor = class extends EncryptionKey {
  constructor(public cryptoKey: CryptoKey) {
    super();
  }

  static async fromRaw(key: Uint8Array) {
    return new this(await globalThis.crypto.subtle.importKey('pkcs8', key, this.algorithm, true, ['decrypt']));
  }
  async toRaw() {
    return new SerializableUint8Array(await globalThis.crypto.subtle.exportKey('pkcs8', this.cryptoKey));
  }
};

export class AsymmetricEncryptionKeyPair {
  privateKey: EncryptionKey;
  publicKey: EncryptionKey;

  constructor({ privateKey, publicKey }: { privateKey: EncryptionKey; publicKey: EncryptionKey }) {
    this.privateKey = privateKey;
    this.publicKey = publicKey;
  }

  static async fromRaw({ privateKey, publicKey }: { privateKey: Uint8Array; publicKey: Uint8Array }) {
    return new this({
      privateKey: await PrivateKey.fromRaw(privateKey),
      publicKey: await PublicKey.fromRaw(publicKey)
    });
  }

  static async generate() {
    const cryptoKeys = await globalThis.crypto.subtle.generateKey(EncryptionKey.algorithm, true, [
      'encrypt',
      'decrypt'
    ]);
    return new this({
      privateKey: new PrivateKey(cryptoKeys.privateKey),
      publicKey: new PublicKey(cryptoKeys.publicKey)
    });
  }

  async toRaw() {
    return {
      privateKey: await this.privateKey.toRaw(),
      publicKey: await this.publicKey.toRaw()
    };
  }
}
