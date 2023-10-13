import type { Class } from 'type-fest';
import type { ZodType } from 'zod';

/**
 * Decorator to define the validation schema for DTO objects. Modifies the default
 * AJV behavior such that if not defined, additional properties are prohibited.
 */
export function ValidationSchema<T, U extends ZodType<T>>(schema: U) {
  return (target: Class<T>) => {
    Reflect.defineMetadata('ValidationSchema', schema, target);
  };
}
