import type { EntityObject } from '../types';

export abstract class EntityController<T extends object> {
  abstract create(entity: Omit<T, 'id'>): Promise<EntityObject<T>>;

  abstract deleteById(id: string): Promise<EntityObject<T>>;

  abstract findAll(): Promise<EntityObject<T>[]>;

  abstract findById(id: string): Promise<EntityObject<T>>;

  abstract updateById(id: string, update: Partial<Omit<EntityObject<T>, 'id'>>): Promise<EntityObject<T>>;
}
