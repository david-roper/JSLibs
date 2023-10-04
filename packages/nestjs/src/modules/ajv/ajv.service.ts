import { Ajv, AjvFactory } from '@douglasneuroinformatics/ajv';
import type { ErrorObject, JSONSchemaType } from '@douglasneuroinformatics/ajv';
import { Injectable } from '@nestjs/common';

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
