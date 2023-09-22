import { jest } from 'bun:test';

export const createMockModel = () => ({
  create: jest.fn(),
  exists: jest.fn(),
  find: jest.fn(),
  findById: jest.fn()
});

export type MockModel = ReturnType<typeof createMockModel>;
