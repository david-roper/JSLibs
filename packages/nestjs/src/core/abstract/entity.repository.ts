/* eslint-disable perfectionist/sort-classes */

import { InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import type { FilterQuery, HydratedDocument, Model, QueryOptions } from 'mongoose';
import { Types, isValidObjectId } from 'mongoose';

import type { EntityClass } from '../types';

export function EntityRepository<TBase extends object>(Entity: EntityClass<TBase>) {
  abstract class Repository {
    constructor(@InjectModel(Entity.modelName) protected readonly model: Model<TBase>) {}

    async count<TEntity extends TBase = TBase>(filter?: FilterQuery<TEntity>) {
      return this.model.count(filter);
    }

    async create<TEntity extends TBase = TBase>(entity: TEntity) {
      return this.model.create(entity) as Promise<HydratedDocument<TEntity>>;
    }

    async find<TEntity extends TBase = TBase>(
      filter: FilterQuery<TEntity> = {},
      options?: QueryOptions<TEntity>
    ): Promise<HydratedDocument<TEntity>[]> {
      return this.model.find(filter, null, options);
    }

    async findOne<TEntity extends TBase = TBase>(
      filter: FilterQuery<TEntity>
    ): Promise<HydratedDocument<TEntity> | null> {
      return this.model.findOne(filter);
    }

    async findById<TEntity extends TBase = TBase>(
      id: string,
      filter: FilterQuery<TEntity> = {}
    ): Promise<HydratedDocument<TEntity> | null> {
      return this.findOne(this.createFilter(id, filter));
    }

    async exists(filter: FilterQuery<TBase>): Promise<boolean> {
      return (await this.model.exists(filter)) !== null;
    }

    async updateOne<TEntity extends TBase = TBase>(
      filter: FilterQuery<TEntity>,
      update: Partial<TEntity>
    ): Promise<HydratedDocument<TEntity> | null> {
      return this.model.findOneAndUpdate(filter, update, { new: true });
    }

    async updateById<TEntity extends TBase = TBase>(
      id: string,
      update: Partial<TEntity>,
      filter: FilterQuery<TEntity> = {}
    ): Promise<HydratedDocument<TEntity> | null> {
      return this.updateOne(this.createFilter(id, filter), update);
    }

    async deleteOne<TEntity extends TBase = TBase>(
      filter: FilterQuery<TEntity>
    ): Promise<HydratedDocument<TEntity> | null> {
      return this.model.findOneAndDelete(filter, { new: true });
    }

    async deleteById<TEntity extends TBase = TBase>(
      id: string,
      filter: FilterQuery<TEntity> = {}
    ): Promise<HydratedDocument<TEntity> | null> {
      return this.deleteOne(this.createFilter(id, filter));
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
