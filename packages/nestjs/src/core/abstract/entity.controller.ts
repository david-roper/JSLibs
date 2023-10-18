import type { EntityObject } from '../types';

export abstract class EntityController<TEntity extends object> {
  abstract create(entity: object): Promise<EntityObject<TEntity>>;

  abstract deleteById(id: string): Promise<EntityObject<TEntity>>;

  abstract findAll(): Promise<EntityObject<TEntity>[]>;

  abstract findById(id: string): Promise<EntityObject<TEntity>>;

  abstract updateById(id: string, update: Partial<Omit<EntityObject<TEntity>, 'id'>>): Promise<EntityObject<TEntity>>;
}
