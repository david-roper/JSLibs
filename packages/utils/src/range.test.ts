import assert from 'node:assert/strict';
import { describe, it } from 'node:test';

import { range } from './range.js';

describe('range', () => {
  it('should return an array equal in length to the range', () => {
    const arr = range(10);
    assert(arr.length === 10);
  });
});
