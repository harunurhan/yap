import { asyncFilter } from '../utils';

describe('utils', () => {
  describe('asyncFilter', () => {
    it('filters async', async () => {
      const array = [1, 2, 3, 4, 5];
      const expected = [4, 5];
      const asyncGreaterThanThree = async (n) => Promise.resolve(n > 3);
      const filtered = await asyncFilter(array, asyncGreaterThanThree);
      expect(filtered).toEqual(expected);
    });

    it('filters async with empty result', async () => {
      const array = [1, 2, 3, 4, 5];
      const expected = [];
      const asyncGreaterThanFive = async (n) => Promise.resolve(n > 5);
      const filtered = await asyncFilter(array, asyncGreaterThanFive);
      expect(filtered).toEqual(expected);
    });
  });
});
