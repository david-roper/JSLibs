/**
 * The basic methods for performing CRUD operations on entities stored in the
 * database. All controllers that represent such entities should implement this
 * controller and inject a service that implements the `EntityService` interface.
 */
export type EntityController<TEntity extends object> = {
  create(entity: Omit<TEntity, 'id'>): Promise<TEntity>;

  deleteById(id: string): Promise<void>;

  findAll(): Promise<TEntity[]>;

  findById(id: string): Promise<TEntity>;

  updateById(id: string, update: Partial<Omit<TEntity, 'id'>>): Promise<void>;
};
