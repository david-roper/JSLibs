import type { ObjectId } from 'mongodb';

import type { EntityClass } from '../../core/types';

export type ObjectIdLike = ObjectId | Uint8Array | number | string;
export function getRepositoryToken<T extends object>(entity: EntityClass<T>) {
  return `${entity.modelName}Repository`;
}
