import Bun from 'bun';
import crypto from 'node:crypto';

import { Inject, Injectable } from '@nestjs/common';

import { CRYPTO_MODULE_OPTIONS_TOKEN, type CryptoModuleOptions } from './crypto.config';

@Injectable()
export class CryptoService {
  private textDecoder = new TextDecoder();
  private textEncoder = new TextEncoder();

  constructor(@Inject(CRYPTO_MODULE_OPTIONS_TOKEN) private readonly options: CryptoModuleOptions) {}

  async comparePassword(password: string, hash: string) {
    return Bun.password.verify(password, hash);
  }

  /**
   * Decrypts an ArrayBuffer using the provided private key.
   *
   * @param buffer - The data to be decrypted.
   * @param privateKey - The private key to be used for decryption.
   * @returns A promise that resolves to the decrypted string.
   */
  async decrypt(buffer: ArrayBuffer, privateKey: CryptoKey): Promise<string> {
    const decrypted = await crypto.webcrypto.subtle.decrypt(
      {
        name: 'RSA-OAEP'
      },
      privateKey,
      buffer
    );
    return this.textDecoder.decode(decrypted);
  }

  /**
   * Encrypts a text string using the provided public key.
   *
   * @param text - The text to be encrypted.
   * @param publicKey - The public key to be used for encryption.
   * @return A promise that resolves to the encrypted data in ArrayBuffer format.
   */
  async encrypt(text: string, publicKey: CryptoKey): Promise<ArrayBuffer> {
    const encoded = this.textEncoder.encode(text);
    return crypto.webcrypto.subtle.encrypt(
      {
        name: 'RSA-OAEP'
      },
      publicKey,
      encoded
    );
  }

  /**
   * Asynchronously generates an RSA-OAEP key pair with the SHA-512 hash
   * algorithm. The modulus length is 4096 bits, and the public exponent
   * is 0x010001 (65537). The generated keys are extractable and can be
   * used for encryption and decryption.
   */
  async generateKeyPair(): Promise<{ privateKey: CryptoKey; publicKey: CryptoKey }> {
    const { privateKey, publicKey } = await crypto.webcrypto.subtle.generateKey(
      {
        hash: 'SHA-512',
        modulusLength: 4096,
        name: 'RSA-OAEP',
        publicExponent: new Uint8Array([1, 0, 1])
      },
      true,
      ['encrypt', 'decrypt']
    );
    return { privateKey, publicKey };
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
