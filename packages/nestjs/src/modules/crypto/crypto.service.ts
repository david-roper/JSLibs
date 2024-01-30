import Bun from 'bun';
import crypto from 'node:crypto';

import { Inject, Injectable } from '@nestjs/common';

import { CRYPTO_MODULE_OPTIONS_TOKEN, type CryptoModuleOptions } from './crypto.config';
import { AsymmetricEncryptionKeyPair, SerializableUint8Array } from './crypto.utils';

@Injectable()
export class CryptoService {
  private textDecoder = new TextDecoder();
  private textEncoder = new TextEncoder();

  constructor(@Inject(CRYPTO_MODULE_OPTIONS_TOKEN) private readonly options: CryptoModuleOptions) {}

  async comparePassword(password: string, hash: string) {
    return Bun.password.verify(password, hash);
  }

  /**
   * Decrypts the encrypted data using the provided private key.
   *
   * @param data - The data to be decrypted.
   * @param privateKey - The private key to be used for decryption.
   * @returns A promise that resolves to the decrypted string.
   */
  async decrypt(data: Uint8Array, privateKey: CryptoKey): Promise<string> {
    const decrypted = await crypto.webcrypto.subtle.decrypt(
      {
        name: 'RSA-OAEP'
      },
      privateKey,
      data
    );
    return this.textDecoder.decode(decrypted);
  }

  /**
   * Encrypts a string using the provided public key
   *
   * @param text - The text to be encrypted.
   * @param publicKey - The public key to be used for encryption.
   * @return A promise that resolves to the encrypted data
   */
  async encrypt(text: string, publicKey: CryptoKey): Promise<SerializableUint8Array> {
    const encoded = this.textEncoder.encode(text);
    const arrayBuffer = await crypto.webcrypto.subtle.encrypt(
      {
        name: 'RSA-OAEP'
      },
      publicKey,
      encoded
    );
    return new SerializableUint8Array(arrayBuffer);
  }

  /**
   * Asynchronously generates an RSA-OAEP key pair with the SHA-512 hash
   * algorithm. The modulus length is 4096 bits, and the public exponent
   * is 0x010001 (65537). The generated keys are extractable and can be
   * used for encryption and decryption.
   */
  async generateKeyPair(): Promise<AsymmetricEncryptionKeyPair> {
    return AsymmetricEncryptionKeyPair.generate();
  }

  hash(source: string) {
    return crypto
      .createHash('sha256')
      .update(source + this.options.secretKey)
      .digest('hex');
  }

  async hashPassword(password: string) {
    return Bun.password.hash(password);
  }
}
