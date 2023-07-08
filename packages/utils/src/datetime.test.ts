import assert from 'node:assert/strict';
import { describe, it } from 'node:test';

import { toBasicISOString, yearsPassed } from './datetime.js';

describe('toBasicISOString', () => {
  it('should return a string of the format yyyy-mm-dd', () => {
    assert(toBasicISOString(new Date(2000, 0, 1)) === '2000-01-01');
  });
});

describe('yearsPassed', () => {
  it('should return zero for the date eleven months ago', () => {
    const today = new Date();
    const date = new Date(today.setMonth(today.getMonth() - 11));
    assert(yearsPassed(date) === 0);
  });
  it('should return one for the date eighteen months ago', () => {
    const today = new Date();
    const date = new Date(today.setMonth(today.getMonth() - 18));
    assert(yearsPassed(date) === 1);
  });
});
