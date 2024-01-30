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
