/* eslint-disable perfectionist/sort-classes */

import { InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Document, type FilterQuery, type Model, Types, isValidObjectId } from 'mongoose';

import type { EntityClass, EntityObject } from '../types';

export function EntityRepository<TBase extends object>(Entity: EntityClass<TBase>) {
  abstract class Repository {
    constructor(@InjectModel(Entity.modelName) protected readonly model: Model<TBase>) {}

    async count<TEntity extends TBase = TBase>(filter?: FilterQuery<TEntity>) {
      return this.model.count(filter);
    }

    async create<TEntity extends TBase = TBase>(entity: TEntity): Promise<EntityObject<TEntity>> {
      return this.model.create(entity).then((doc) => this.docToObject(doc)!);
    }

    async find<TEntity extends TBase = TBase>(filter: FilterQuery<TEntity> = {}): Promise<EntityObject<TEntity>[]> {
      return this.model.find(filter).then((arr) => arr.map((doc) => this.docToObject(doc)!));
    }

    async findOne<TEntity extends TBase = TBase>(filter: FilterQuery<TEntity>): Promise<EntityObject<TEntity> | null> {
      return this.model.findOne(filter).then((doc) => this.docToObject(doc));
    }

    async findById<TEntity extends TBase = TBase>(
      id: string,
      filter: FilterQuery<TEntity> = {}
    ): Promise<EntityObject<TEntity> | null> {
      return this.findOne(this.createFilter(id, filter));
    }

    async exists(filter: FilterQuery<TBase>): Promise<boolean> {
      return (await this.model.exists(filter)) !== null;
    }

    async updateOne<TEntity extends TBase = TBase>(
      filter: FilterQuery<TEntity>,
      update: Partial<TEntity>
    ): Promise<EntityObject<TEntity> | null> {
      return this.model.findOneAndUpdate(filter, update, { new: true }).then((doc) => this.docToObject(doc));
    }

    async updateById<TEntity extends TBase = TBase>(
      id: string,
      update: Partial<TEntity>,
      filter: FilterQuery<TEntity> = {}
    ): Promise<EntityObject<TEntity> | null> {
      return this.updateOne(this.createFilter(id, filter), update);
    }

    async deleteOne<TEntity extends TBase = TBase>(
      filter: FilterQuery<TEntity>
    ): Promise<EntityObject<TEntity> | null> {
      return this.model.findOneAndDelete(filter, { new: true }).then((doc) => this.docToObject(doc));
    }

    async deleteById<TEntity extends TBase = TBase>(id: string, filter: FilterQuery<TEntity> = {}) {
      return this.deleteOne(this.createFilter(id, filter));
    }

    private docToObject<TEntity extends TBase = TBase>(
      this: void,
      doc: Document<unknown, object, TBase> | null
    ): EntityObject<TEntity> | null {
      if (!doc) {
        return null;
      }
      return doc.toObject({
        transform: (doc, obj) => {
          obj.id = doc._id?.toString();
          delete obj._id;
          return Object.setPrototypeOf(obj, Entity.prototype) as EntityObject<TEntity>;
        }
      });
    }

    private createFilter<TEntity extends TBase = TBase>(
      id: string,
      filter: FilterQuery<TEntity>
    ): FilterQuery<TEntity> {
      if (!isValidObjectId(id)) {
        throw new InternalServerErrorException(`Cannot coerce value to ObjectId: ${id}`);
      }
      return { $and: [{ _id: new Types.ObjectId(id) }, filter] };
    }
  }
  return Repository;
}
