import type { AnyFunction } from 'bun';
import { type Mock, mock } from 'bun:test';

type ClassConstructor = new (...args: any[]) => any;

export type MockedInstance<ClassType extends ClassConstructor> = ClassType extends new (
  ...args: any[]
) => infer InstanceType
  ? InstanceType extends object
    ? {
        [K in keyof InstanceType as InstanceType[K] extends (...args: any) => any
          ? K
          : never]: InstanceType[K] extends (...args: any) => any ? Mock<InstanceType[K]> : never;
      }
    : unknown
  : unknown;

export function createMock<T extends ClassConstructor>(constructor: T) {
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
        obj[prop] = mock(value as AnyFunction);
      } else {
        throw new Error(`Unexpected type for property '${prop}': ${typeof prototype[prop]}`);
      }
    });
  return obj as MockedInstance<T>;
}
