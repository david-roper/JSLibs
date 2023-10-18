import { Schema, type SchemaOptions } from '@nestjs/mongoose';
import type { ConditionalExcept } from 'type-fest';

import type { EntityClass } from '../abstract/entity.repository';

const defaultSchemaOptions = {
  id: true,
  strict: 'throw',
  timestamps: true
} satisfies SchemaOptions;

type EntitySchemaOptions = ConditionalExcept<SchemaOptions, keyof typeof defaultSchemaOptions>;

export function EntitySchema<T>(options: EntitySchemaOptions = {}) {
  return (target: EntityClass<Omit<T, 'id'>>) => {
    Schema({ ...defaultSchemaOptions, ...options })(target);
  };
}
