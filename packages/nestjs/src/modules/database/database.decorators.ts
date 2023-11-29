import { Inject } from '@nestjs/common';

import { getRepositoryToken } from './database.utils';

import type { EntityClass } from '../../core/types';

export const InjectRepository = <T extends object>(entity: EntityClass<T>): ReturnType<typeof Inject> => {
  return Inject(getRepositoryToken(entity));
};
