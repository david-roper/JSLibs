import Ajv from 'ajv';
import addErrors from 'ajv-errors';
import addFormats from 'ajv-formats';

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class AjvFactory {
  static create() {
    const ajv = new Ajv({ allErrors: true, coerceTypes: false, strict: true });
    addErrors(ajv);
    addFormats(ajv);
    return ajv;
  }
}