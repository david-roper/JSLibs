import Ajv from 'ajv';
import addErrors from 'ajv-errors';
import addFormats from 'ajv-formats';

export class AjvFactory {
  static create() {
    const ajv = new Ajv({ allErrors: true, coerceTypes: false });
    addErrors(ajv);
    addFormats(ajv);
    return ajv;
  }
}

// Unfortunately, ajv does not include modern ESM compatible types
export { default as Ajv } from 'ajv';
export * from 'ajv';