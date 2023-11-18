import type { Collection, Db, Document, OptionalUnlessRequiredId } from 'mongodb';

import type { EntityClass } from '../../core/types';

export function DatabaseRepository<TBase extends Document>(entity: EntityClass<TBase>) {
  abstract class Repository {
    public readonly collection: Collection<TBase>;

    constructor(db: Db) {
      this.collection = db.collection(entity.modelName);
    }

    async count(filter: Partial<TBase> = {}) {
      return this.collection.countDocuments(filter);
    }

    async find(filter: Partial<TBase> = {}) {
      return this.collection.find().filter(filter).toArray();
    }

    async insertOne(entity: OptionalUnlessRequiredId<TBase>) {
      return this.collection.insertOne(entity);
    }
  }
  return Repository;
}
