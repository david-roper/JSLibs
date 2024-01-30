import { SerializableUint8Array } from './utils';

const ALGORITHM_NAME = 'RSA-OAEP';

abstract class EncryptionKey<T extends string> {
  static algorithm = {
    hash: 'SHA-512',
    modulusLength: 4096,
    name: ALGORITHM_NAME,
    publicExponent: new Uint8Array([1, 0, 1])
  };

  constructor(public cryptoKey: CryptoKey) {}

  abstract __type: T;

  abstract toRaw(): Promise<SerializableUint8Array>;
}

type EncryptionKeyConstructor<T extends string> = {
  fromRaw: (key: Uint8Array) => Promise<EncryptionKey<T>>;
  new (cryptoKey: CryptoKey): EncryptionKey<T>;
};

export const PublicKey: EncryptionKeyConstructor<'PUBLIC'> = class extends EncryptionKey<'PUBLIC'> {
  __type = 'PUBLIC' as const;
  static async fromRaw(key: Uint8Array) {
    return new this(await globalThis.crypto.subtle.importKey('spki', key, this.algorithm, true, ['encrypt']));
  }
  async toRaw() {
    return new SerializableUint8Array(await globalThis.crypto.subtle.exportKey('spki', this.cryptoKey));
  }
};

export const PrivateKey: EncryptionKeyConstructor<'PRIVATE'> = class extends EncryptionKey<'PRIVATE'> {
  __type = 'PRIVATE' as const;
  static async fromRaw(key: Uint8Array) {
    return new this(await globalThis.crypto.subtle.importKey('pkcs8', key, this.algorithm, true, ['decrypt']));
  }
  async toRaw() {
    return new SerializableUint8Array(await globalThis.crypto.subtle.exportKey('pkcs8', this.cryptoKey));
  }
};

export class AsymmetricEncryptionKeyPair {
  privateKey: EncryptionKey<'PRIVATE'>;
  publicKey: EncryptionKey<'PUBLIC'>;

  constructor({ privateKey, publicKey }: { privateKey: EncryptionKey<'PRIVATE'>; publicKey: EncryptionKey<'PUBLIC'> }) {
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

export class Encrypter {
  private textEncoder = new TextEncoder();

  constructor(private publicKey: EncryptionKey<'PUBLIC'>) {}

  /**
   * Encrypts a string using the public key
   *
   * @param text - The text to be encrypted.
   * @return A promise that resolves to the encrypted data
   */
  async encrypt(text: string): Promise<SerializableUint8Array> {
    const encoded = this.textEncoder.encode(text);
    const arrayBuffer = await globalThis.crypto.subtle.encrypt(
      { name: ALGORITHM_NAME },
      this.publicKey.cryptoKey,
      encoded
    );
    return new SerializableUint8Array(arrayBuffer);
  }
}

export class Decrypter {
  private textDecoder = new TextDecoder();

  constructor(private privateKey: EncryptionKey<'PRIVATE'>) {}

  /**
   * Decrypts the encrypted data using the private key.
   *
   * @param data - The data to be decrypted.
   * @returns A promise that resolves to the decrypted string.
   */
  async decrypt(data: Uint8Array): Promise<string> {
    const decrypted = await globalThis.crypto.subtle.decrypt(
      {
        name: ALGORITHM_NAME
      },
      this.privateKey.cryptoKey,
      data
    );
    return this.textDecoder.decode(decrypted);
  }
}
