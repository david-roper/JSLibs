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

    async count() {
      return this.collection.countDocuments();
    }

    async create(entity: OptionalUnlessRequiredId<T>) {
      const result = await this.collection.insertOne(entity);
      if (!result.acknowledged) {
        throw new InternalServerErrorException(`Failed to create entity: ${JSON.stringify(entity)} `);
      }
      return (await this.findById(result.insertedId))!;
    }

    async find(filter: Partial<T>) {
      return this.collection.find().filter(filter).toArray();
    }

    async findById(id: InferIdType<T>) {
      if (!ObjectId.isValid(id)) {
        throw new InternalServerErrorException(`Cannot coerce value to ObjectID: ${id.toString()}`);
      }
      return this.collection.findOne({ _id: id } as Filter<T>);
    }
  }
  return Repository;
}

export type Repository<T extends Document> = InstanceType<ReturnType<typeof DatabaseRepository<T>>>;
