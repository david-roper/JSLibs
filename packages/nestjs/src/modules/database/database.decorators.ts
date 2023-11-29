import { Inject } from '@nestjs/common';

import { DATABASE_CONNECTION_TOKEN } from './database.constants';
import { getRepositoryToken } from './database.utils';

import type { EntityClass } from '../../core/types';

export const InjectDatabaseConnection = () => {
  return Inject(DATABASE_CONNECTION_TOKEN);
};

export const InjectRepository = <T extends object>(entity: EntityClass<T>): ReturnType<typeof Inject> => {
  return Inject(getRepositoryToken(entity));
};
