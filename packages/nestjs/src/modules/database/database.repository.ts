/* eslint-disable perfectionist/sort-classes */
import { InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { ObjectId } from 'mongodb';
import type {
  Collection,
  Db,
  DeleteOptions,
  Document,
  Filter,
  FindOptions,
  OptionalUnlessRequiredId,
  UpdateOptions
} from 'mongodb';

import { InjectDatabaseConnection } from './database.decorators';

import type { EntityClass } from '../../core/types';
import type { ObjectIdLike } from './database.utils';

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

    exists(filter: Filter<T>, options: FindOptions = {}) {
      return this.collection.findOne(filter, options).then((value) => value !== null);
    }

    find(filter: Filter<T> = {}, options: FindOptions = {}) {
      return this.collection.find(filter, options).toArray();
    }

    findById(id: ObjectIdLike, options: FindOptions = {}) {
      this.checkId(id);
      return this.collection.findOne({ _id: new ObjectId(id) } as Filter<T>, options);
    }

    findOne(filter: Filter<T>, options: FindOptions = {}) {
      return this.collection.findOne(filter, options);
    }

    async updateOne(filter: Filter<T>, update: Partial<T>, options: UpdateOptions = {}) {
      const result = await this.collection.updateOne(filter, update, options);
      if (!(result.acknowledged && result.upsertedId)) {
        throw new NotFoundException('Failed to update entity: not found!');
      }
      return (await this.findById(result.upsertedId))!;
    }

    async updateById(id: ObjectIdLike, update: Partial<T>, options: UpdateOptions = {}) {
      this.checkId(id);
      return this.updateOne({ _id: new ObjectId(id) } as Filter<T>, update, options);
    }

    async deleteOne(filter: Filter<T>, options: DeleteOptions = {}) {
      const result = await this.collection.deleteOne(filter, options);
      if (!(result.acknowledged && result.deletedCount)) {
        throw new NotFoundException('Failed to delete entity: not found!');
      }
      return { success: true };
    }

    async deleteById(id: ObjectIdLike, options: DeleteOptions = {}) {
      this.checkId(id);
      return this.deleteOne({ _id: new ObjectId(id) } as Filter<T>, options);
    }

    private checkId(id: ObjectIdLike) {
      if (!ObjectId.isValid(id)) {
        throw new InternalServerErrorException(`Cannot coerce value to ObjectID: ${id.toString()}`);
      }
    }
  }
  return Repository;
}

export type Repository<T extends Document> = InstanceType<ReturnType<typeof DatabaseRepository<T>>>;
