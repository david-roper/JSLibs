/* eslint-disable perfectionist/sort-classes */

import { InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Document, type FilterQuery, type Model, Types, isValidObjectId } from 'mongoose';

import type { EntityClass, EntityObject } from '../types';

export function EntityRepository<T extends object>(Entity: EntityClass<T>) {
  abstract class Repository {
    constructor(@InjectModel(Entity.modelName) protected readonly model: Model<T>) {}

    async create(entity: T): Promise<EntityObject<T>> {
      return this.model.create(entity).then((doc) => this.docToObject(doc)!);
    }

    async find(filter: FilterQuery<T> = {}): Promise<EntityObject<T>[]> {
      return this.model.find(filter).then((arr) => arr.map((doc) => this.docToObject(doc)!));
    }

    async findOne(filter: FilterQuery<T>): Promise<EntityObject<T> | null> {
      return this.model.findOne(filter).then(this.docToObject);
    }

    async findById(id: string, filter: FilterQuery<T> = {}): Promise<EntityObject<T> | null> {
      return this.findOne(this.createFilter(id, filter));
    }

    async exists(filter: FilterQuery<T>): Promise<boolean> {
      return (await this.model.exists(filter)) !== null;
    }

    async updateOne(filter: FilterQuery<T>, update: Partial<T>): Promise<EntityObject<T> | null> {
      return this.model.findOneAndUpdate(filter, update, { new: true }).then(this.docToObject);
    }

    async updateById(id: string, update: Partial<T>, filter: FilterQuery<T> = {}): Promise<EntityObject<T> | null> {
      return this.updateOne(this.createFilter(id, filter), update);
    }

    async deleteOne(filter: FilterQuery<T>): Promise<EntityObject<T> | null> {
      return this.model.findOneAndDelete(filter, { new: true }).then(this.docToObject);
    }

    async deleteById(id: string, filter: FilterQuery<T> = {}) {
      return this.deleteOne(this.createFilter(id, filter));
    }

    private docToObject(this: void, doc: Document<unknown, object, T> | null): EntityObject<T> | null {
      if (!doc) {
        return null;
      }
      return doc.toObject({
        transform: (doc, obj) => {
          obj.id = doc._id?.toString();
          delete obj._id;
          return Object.setPrototypeOf(obj, Entity.prototype) as EntityObject<T>;
        }
      });
    }

    private createFilter(id: string, filter: FilterQuery<T>): FilterQuery<T> {
      if (!isValidObjectId(id)) {
        throw new InternalServerErrorException(`Cannot coerce value to ObjectId: ${id}`);
      }
      return { $and: [{ _id: new Types.ObjectId(id) }, filter] };
    }
  }
  return Repository;
}
