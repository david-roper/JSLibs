function arrayBufferToString(buffer: ArrayBuffer): string {
  return String.fromCharCode.apply(null, Array.from(new Uint8Array(buffer)));
}

function stringToArrayBuffer(str: string): ArrayBuffer {
  const buf = new ArrayBuffer(str.length);
  const bufView = new Uint8Array(buf);
  for (let i = 0, strLen = str.length; i < strLen; i++) {
    bufView[i] = str.charCodeAt(i);
  }
  return buf;
}

export type ExportedAsymmetricEncryptionKeyPair = {
  privateKey: string;
  publicKey: string;
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

  private static privateKeyPemFooter = '-----END PRIVATE KEY-----';
  private static privateKeyPemHeader = '-----BEGIN PRIVATE KEY-----';
  private static publicKeyPemFooter = '-----END PUBLIC KEY-----';
  private static publicKeyPemHeader = '-----BEGIN PUBLIC KEY-----';

  constructor({ privateKey, publicKey }: { privateKey: CryptoKey; publicKey: CryptoKey }) {
    this.privateKey = privateKey;
    this.publicKey = publicKey;
  }

  static async fromRaw({ privateKey }: { privateKey: string; publicKey: string }) {
    return {
      privateKey: await this.importPrivateKey(privateKey)
    };
  }

  static async generate() {
    const { privateKey, publicKey } = await globalThis.crypto.subtle.generateKey(this.algorithm, true, [
      'encrypt',
      'decrypt'
    ]);
    return new this({ privateKey, publicKey });
  }

  private static async importPrivateKey(pem: string) {
    const pemContents = pem.substring(this.privateKeyPemHeader.length, pem.length - this.privateKeyPemFooter.length);
    const decoded = atob(pemContents);
    const buffer = stringToArrayBuffer(decoded);
    return globalThis.crypto.subtle.importKey('pkcs8', buffer, this.algorithm, true, ['decrypt']);
  }

  async export(): Promise<{ privateKey: string; publicKey: string }> {
    return {
      privateKey: await this.exportPrivateKey(this.privateKey),
      publicKey: await this.exportPublicKey(this.publicKey)
    };
  }

  private async exportPrivateKey(key: CryptoKey) {
    const exported = await globalThis.crypto.subtle.exportKey('pkcs8', key);
    const exportedAsString = arrayBufferToString(exported);
    const exportedAsBase64 = btoa(exportedAsString);
    return [this.static.privateKeyPemHeader, exportedAsBase64, this.static.privateKeyPemFooter].join('\n');
  }

  private async exportPublicKey(key: CryptoKey) {
    const exported = await globalThis.crypto.subtle.exportKey('spki', key);
    const exportedAsString = arrayBufferToString(exported);
    const exportedAsBase64 = btoa(exportedAsString);
    return [this.static.publicKeyPemHeader, exportedAsBase64, this.static.publicKeyPemFooter].join('\n');
  }

  private get static() {
    return AsymmetricEncryptionKeyPair;
  }

  // private toPem(content: string, label: string) {
  //   return `-----BEGIN ${label}-----\n${content}\n-----END PUBLIC KEY-----`;
  // }
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
