import type { AnyFunction } from 'bun';
import { type Mock, jest } from 'bun:test';
import { type Simplify } from 'type-fest';

import { type EntityService } from '../..';

type EntityServiceMethod = Simplify<keyof EntityService<any>>;

export type MockEntityService = {
  [K in EntityServiceMethod]: Mock<AnyFunction>;
};

export const createMockEntityService = (): MockEntityService => ({
  create: jest.fn(),
  findAll: jest.fn(),
  findById: jest.fn()
});
