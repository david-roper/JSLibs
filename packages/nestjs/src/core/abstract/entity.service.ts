import type { EntityObject } from '../types';

export abstract class EntityService<TEntity extends object, TOptions extends object = object> {
  abstract create(entity: Omit<TEntity, 'id'>, options?: TOptions): Promise<EntityObject<TEntity>>;

  abstract deleteById(id: string, options?: TOptions): Promise<EntityObject<TEntity>>;

  abstract findAll(options?: TOptions): Promise<EntityObject<TEntity>[]>;

  abstract findById(id: string, options?: TOptions): Promise<EntityObject<TEntity>>;

  abstract updateById(
    id: string,
    update: Partial<Omit<EntityObject<TEntity>, 'id'>>,
    options?: TOptions
  ): Promise<EntityObject<TEntity>>;
}
