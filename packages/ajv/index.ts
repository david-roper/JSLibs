import _Ajv from 'ajv';
import _addErrors from 'ajv-errors';
import _addFormats from 'ajv-formats';

// To learn why this is necessary, please see:
// https://github.com/arethetypeswrong/arethetypeswrong.github.io/blob/main/docs/problems/FalseExportDefault.md
const Ajv = _Ajv as unknown as typeof _Ajv.default;
const addErrors = _addErrors as unknown as typeof _addErrors.default;
const addFormats = _addFormats as unknown as typeof _addFormats.default;

export class AjvFactory {
  static create() {
    const ajv = new Ajv({ allErrors: true, coerceTypes: false, strict: true });
    addErrors(ajv);
    addFormats(ajv);
    return ajv;
  }
}
