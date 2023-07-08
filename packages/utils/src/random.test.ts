import assert from 'node:assert/strict';
import { describe, it } from 'node:test';

import { randomDate, randomInt } from './random.js';

describe('randomInt', () => {
  it('should return an integer value within the range', () => {
    const min = 5;
    const max = 8;
    const result = randomInt(min, max);
    assert(result >= min);
    assert(result < max);
    assert(Number.isInteger(result));
  });
  it('should throw if the min value is larger than the max', () => {
    assert.throws(() => randomInt(10, 5));
  });
  it('should throw if the min value equals the max', () => {
    assert.throws(() => randomInt(10, 10));
  });
  it('should handle negative values', () => {
    const min = -5;
    const max = -3;
    const result = randomInt(min, max);
    assert(result >= min);
    assert(result < max);
    assert(Number.isInteger(result));
    assert.throws(() => randomInt(max, min));
  });
});

describe('randomDate', () => {
  it('should return a date within the range', () => {
    const start = new Date(2000, 0, 1);
    const end = new Date();
    const random = randomDate(start, end);
    assert(random.getTime() >= start.getTime());
    assert(random.getTime() <= end.getTime());
  });
  it('should throw if the end is before the start', () => {
    assert.throws(() => randomDate(new Date(), new Date(2000, 0, 1)));
  });
});
