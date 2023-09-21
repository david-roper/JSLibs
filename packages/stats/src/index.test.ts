import { describe, expect, it } from 'bun:test';

import * as stats from './index';

describe('Stats', () => {
  describe('mean', () => {
    it('should return NaN for an empty array', () => {
      expect(Number.isNaN(stats.mean([]))).toBeTrue();
    });
    it('should return the correct mean for a non-empty array', () => {
      expect(stats.mean([1, 2, 3, 4, 5])).toBe(3);
    });
  });

  describe('std', () => {
    it('should return NaN for an array of only one number', () => {
      expect(Number.isNaN(stats.std([1]))).toBeTrue();
    });
    it('should return the correct sample standard deviation for a non-empty array', () => {
      expect(stats.std([1, 2, 3, 4, 5]).toFixed(5)).toBe((1.5811388).toFixed(5));
    });
    it('should return the correct population standard deviation for a non-empty array', () => {
      expect(stats.std([1, 2, 3, 4, 5], true).toFixed(5)).toBe((1.4142136).toFixed(5));
    });
  });
});
