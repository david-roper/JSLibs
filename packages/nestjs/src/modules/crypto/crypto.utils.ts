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
