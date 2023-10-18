import type { Class } from 'type-fest';

export type EntityObject<T extends object> = T & {
  id: string;
};

export type EntityClass<T extends object> = Class<T> & {
  readonly modelName: string;
};
