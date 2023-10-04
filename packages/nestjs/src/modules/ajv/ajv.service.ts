import { AjvFactory } from '@douglasneuroinformatics/ajv';
import { Injectable } from '@nestjs/common';
import Ajv, { type ErrorObject, type JSONSchemaType } from 'ajv';

@Injectable()
export class AjvService {
  private readonly ajv: Ajv;

  constructor() {
    this.ajv = AjvFactory.create();
  }

  private formatErrorMessage(errors?: ErrorObject[] | null) {
    if (!errors) {
      return 'Schema validation failed, yet errors is ' + errors;
    }
    return errors;
  }

  validate<T>(data: unknown, schema: JSONSchemaType<T>, onError: (message: unknown) => never): T {
    const validateFunction = this.ajv.compile(schema);
    const isValid = validateFunction(data);
    if (!isValid) {
      onError(this.formatErrorMessage(validateFunction.errors));
    }
    return data;
  }
}
