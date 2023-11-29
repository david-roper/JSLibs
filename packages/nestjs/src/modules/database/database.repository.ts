import type { Collection, Db, Document, OptionalUnlessRequiredId } from 'mongodb';

import { InjectDatabaseConnection } from './database.decorators';

import type { EntityClass } from '../../core/types';

export function DatabaseRepository<T extends Document>(entity: EntityClass<T>) {
  class Repository {
    public readonly collection: Collection<T>;

    constructor(@InjectDatabaseConnection() db: Db) {
      this.collection = db.collection(entity.modelName);
    }

    async count() {
      return this.collection.countDocuments();
    }

    async find(filter: Partial<T>) {
      return this.collection.find().filter(filter).toArray();
    }

    async insertOne(entity: OptionalUnlessRequiredId<T>) {
      return this.collection.insertOne(entity);
    }
  }
  return Repository;
}

export type Repository<T extends Document> = InstanceType<ReturnType<typeof DatabaseRepository<T>>>;
