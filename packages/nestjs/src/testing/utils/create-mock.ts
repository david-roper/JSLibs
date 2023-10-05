import type { AnyFunction } from 'bun';
import { type Mock, jest } from 'bun:test';

import type { Class } from 'type-fest';

export type MockedInstance<T extends object> = {
  [K in keyof T as T[K] extends AnyFunction ? K : never]: Mock<AnyFunction>;
};

export function createMock<T extends object>(constructor: Class<T>) {
  const prototype = constructor.prototype as Record<string, unknown>;
  if (!Object.getPrototypeOf(prototype) === Object.prototype) {
    throw new Error(`Invalid prototype, expected plain object, got: ${JSON.stringify(prototype)}`);
  }
  const obj: Record<string, unknown> = {};
  Object.getOwnPropertyNames(prototype)
    .filter((s) => s !== 'constructor')
    .forEach((prop) => {
      const value = prototype[prop];
      if (typeof value === 'function') {
        obj[prop] = jest.fn();
      } else {
        throw new Error(`Unexpected type for property '${prop}': ${typeof prototype[prop]}`);
      }
    });
  return obj as MockedInstance<T>;
}
