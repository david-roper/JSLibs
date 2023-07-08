import Ajv from 'ajv';
import addErrors from 'ajv-errors';
import addFormats from 'ajv-formats';

const ajv = new Ajv({ allErrors: true, coerceTypes: false, strict: true });
addErrors(ajv);
addFormats(ajv);

export { ajv };
