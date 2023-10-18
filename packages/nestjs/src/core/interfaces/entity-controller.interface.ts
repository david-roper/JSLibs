import type { EntityObject } from '../types';

/**
 * The basic methods for performing CRUD operations on entities stored in the
 * database. All controllers that represent such entities should implement this
 * controller and inject a service that implements the `EntityService` interface.
 */
export type EntityController<T extends object> = {
  create(entity: Omit<T, 'id'>): Promise<EntityObject<T>>;

  deleteById(id: string): Promise<EntityObject<T>>;

  findAll(): Promise<EntityObject<T>[]>;

  findById(id: string): Promise<EntityObject<T>>;

  updateById(id: string, update: Partial<Omit<EntityObject<T>, 'id'>>): Promise<EntityObject<T>>;
};
