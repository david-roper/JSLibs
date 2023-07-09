import assert from 'node:assert/strict';
import { describe, it } from 'node:test';

import { Stats } from './index.js';

describe('Stats', () => {
  describe('mean', () => {
    it('should return NaN for an empty array', () => {
      assert(Number.isNaN(Stats.mean([])));
    });
    it('should return the correct mean for a non-empty array', () => {
      assert.strictEqual(Stats.mean([1, 2, 3, 4, 5]), 3);
    });
  });

  describe('std', () => {
    it('should return NaN for an array of only one number', () => {
      assert(Number.isNaN(Stats.std([1])));
    });
    it('should return the correct sample standard deviation for a non-empty array', () => {
      assert.strictEqual(Stats.std([1, 2, 3, 4, 5]).toFixed(5), (1.5811388).toFixed(5));
    });
    it('should return the correct population standard deviation for a non-empty array', () => {
      assert.strictEqual(Stats.std([1, 2, 3, 4, 5], true).toFixed(5), (1.4142136).toFixed(5));
    });
  });
});
