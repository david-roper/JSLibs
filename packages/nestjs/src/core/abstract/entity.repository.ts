/* eslint-disable perfectionist/sort-classes */

import { InjectModel } from '@nestjs/mongoose';
import { Document, type FilterQuery, type Model, Types } from 'mongoose';
import type { Class } from 'type-fest';

export type EntityObject<T extends object> = T & {
  id: string;
};

export type EntityClass<T extends object> = Class<T> & {
  readonly modelName: string;
};

export function EntityRepository<T extends object>(entity: EntityClass<T>) {
  abstract class Repository<T extends object> {
    constructor(@InjectModel(entity.modelName) protected readonly model: Model<T>) {}

    async create(entity: T): Promise<EntityObject<T>> {
      const doc = await this.model.create(entity);
      return doc.toObject({
        transform: this.transform
      });
    }

    async find(filter: FilterQuery<T> = {}): Promise<EntityObject<T>[]> {
      return this.model.find(filter).then((arr) =>
        arr.map((doc) =>
          doc.toObject({
            transform: this.transform
          })
        )
      );
    }

    async findOne(filter: FilterQuery<T>): Promise<EntityObject<T> | null> {
      return this.model.findOne(filter).then((doc) => {
        if (doc) {
          return doc.toObject({
            transform: this.transform
          });
        }
        return null;
      });
    }

    async exists(filter: FilterQuery<T>): Promise<boolean> {
      return (await this.model.exists(filter)) !== null;
    }

    async updateOne(filter: FilterQuery<T>, update: Partial<T>): Promise<EntityObject<T> | null> {
      return this.model.findOneAndUpdate(filter, update, { new: true }).then((doc) => {
        if (doc) {
          return doc.toObject({
            transform: this.transform
          });
        }
        return null;
      });
    }

    async deleteOne(filter: FilterQuery<T>): Promise<EntityObject<T> | null> {
      return this.model.findOneAndDelete(filter, { new: true }).then((doc) => {
        if (doc) {
          return doc.toObject({
            transform: this.transform
          });
        }
        return null;
      });
    }

    private transform(this: void, doc: Document<Types.ObjectId>, obj: Record<string, unknown>) {
      obj.id = doc._id?.toString();
      delete obj._id;
      return obj;
    }
  }
  return Repository;
}
