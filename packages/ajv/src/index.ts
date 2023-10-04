/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-call */

// ESM compatibility issues with AJV which are solved by Bun

import Ajv from 'ajv';
import addErrors from 'ajv-errors';
import addFormats from 'ajv-formats';

export class AjvFactory {
  static create() {
    const ajv = new Ajv({ allErrors: true, coerceTypes: false });
    addErrors(ajv);
    (addFormats as any)(ajv);
    return ajv;
  }
}
