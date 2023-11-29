import type { EntityClass } from '../../core/types';

export function getRepositoryToken<T extends object>(entity: EntityClass<T>) {
  return `${entity.modelName}Repository`;
}
