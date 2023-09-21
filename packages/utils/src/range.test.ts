import { describe, expect, it } from 'bun:test';

import { range } from './range';

describe('range', () => {
  it('should return an array equal in length to the range', () => {
    const arr = range(10);
    expect(arr.length).toBe(10);
  });
});
