import type { Class } from 'type-fest';

export type EntityClass<T extends object> = Class<T> & {
  readonly modelName: string;
};
