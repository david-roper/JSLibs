import { InternalServerErrorException } from '@nestjs/common';
import { ObjectId } from 'mongodb';
import type { Collection, Db, Document, Filter, InferIdType, OptionalUnlessRequiredId } from 'mongodb';

import { InjectDatabaseConnection } from './database.decorators';

import type { EntityClass } from '../../core/types';

export function DatabaseRepository<T extends Document>(entity: EntityClass<T>) {
  class Repository {
    public readonly collection: Collection<T>;

    constructor(@InjectDatabaseConnection() db: Db) {
      this.collection = db.collection(entity.modelName);
    }

    async count(filter?: Document) {
      return this.collection.countDocuments(filter);
    }

    async create(entity: OptionalUnlessRequiredId<T>) {
      const result = await this.collection.insertOne(entity);
      if (!result.acknowledged) {
        throw new InternalServerErrorException(`Failed to create entity: ${JSON.stringify(entity)} `);
      }
      return this.findById(result.insertedId).then((value) => value!);
    }

    async exists(filter: Filter<T>) {
      return this.collection.findOne(filter).then((value) => value !== null);
    }

    async find(filter: Filter<T>) {
      return this.collection.find(filter).toArray();
    }

    async findById(id: InferIdType<T>) {
      if (!ObjectId.isValid(id)) {
        throw new InternalServerErrorException(`Cannot coerce value to ObjectID: ${id.toString()}`);
      }
      return this.collection.findOne({ _id: id } as Filter<T>);
    }

    async findOne(filter: Filter<T>) {
      return this.collection.findOne(filter);
    }
  }
  return Repository;
}

export type Repository<T extends Document> = InstanceType<ReturnType<typeof DatabaseRepository<T>>>;
