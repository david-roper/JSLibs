import { type Types } from 'mongoose';

/**
 * The basic methods for performing CRUD operations on entities stored in the
 * database. All controllers that represent such entities should implement this
 * controller and inject a service that implements the `EntityService` interface.
 */
export interface EntityController<T> {
  create(entity: T): Promise<T>;

  findAll(): Promise<T[]>;

  findById(id: Types.ObjectId): Promise<T>;
}
