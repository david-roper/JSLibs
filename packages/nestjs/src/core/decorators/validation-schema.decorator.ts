import type { Class } from 'type-fest';
import type { ZodType } from 'zod';

/**
 * Decorator to define the zod validation schema for DTO classes */
export function ValidationSchema<T, U extends ZodType<T>>(schema: U) {
  return (target: Class<T>) => {
    Reflect.defineMetadata('ValidationSchema', schema, target);
  };
}
