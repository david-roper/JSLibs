import assert from 'node:assert/strict';
import { describe, it } from 'node:test';

import { camelToSnakeCase, snakeToCamelCase } from './string.js';

describe('camelToSnakeCase', () => {
  it('should convert from camel to snake case ', () => {
    assert.strictEqual(camelToSnakeCase('toSnakeCase'), 'to_snake_case');
    assert.strictEqual(camelToSnakeCase('foo'), 'foo');
    assert.strictEqual(camelToSnakeCase(''), '');
  });
});

describe('snakeToCamelCase', () => {
  it('should convert from snake to camel case ', () => {
    assert.strictEqual(snakeToCamelCase('to_camel_case'), 'toCamelCase');
    assert.strictEqual(camelToSnakeCase('foo'), 'foo');
    assert.strictEqual(camelToSnakeCase(''), '');
  });
});
