import type { EntityObject } from '../types';

export abstract class EntityService<TEntity extends object> {
  abstract create(data: object, options?: object): Promise<EntityObject<TEntity>>;

  abstract deleteById(id: string, options?: object): Promise<EntityObject<TEntity>>;

  abstract findAll(options?: object): Promise<EntityObject<TEntity>[]>;

  abstract findById(id: string, options?: object): Promise<EntityObject<TEntity>>;

  abstract updateById(
    id: string,
    update: Partial<Omit<EntityObject<TEntity>, 'id'>>,
    options?: object
  ): Promise<EntityObject<TEntity>>;
}
