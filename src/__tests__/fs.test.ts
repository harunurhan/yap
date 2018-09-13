import * as mockFs from 'mock-fs'; /* tslint:disable-line: no-implicit-dependencies*/
import { resolve } from 'path';

import { getFilePathsInDir, requireMaybeExistentJson } from '../fs';

describe('fs', () => {
  describe('getFilePathsInDir', () => {
    it('returns all path of all (non-recursive) files in dir', async () => {
      mockFs({
        testdir: {
          emptyfolder: {},
          file1: '',
          file2: '',
          folder: {
            filer3: '',
          },
        },
      });
      const expected = [resolve('testdir/file1'), resolve('testdir/file2')];
      const files = await getFilePathsInDir('testdir');
      expect(files).toEqual(expected);
    });

    afterEach(() => {
      mockFs.restore();
    });
  });

  describe('requireMaybeExistentJson', () => {
    it('returns json as object if it exist', async () => {
      mockFs({
        'file.json': `{"foo":"bar"}`,
      });
      const expected = { foo: 'bar' };
      const object = await requireMaybeExistentJson(resolve('file.json'));
      expect(object).toEqual(expected);
    });

    it('returns empty object if does not exist', async () => {
      mockFs({});
      const expected = {};
      const object = await requireMaybeExistentJson(resolve('nope.json'));
      expect(object).toEqual(expected);
    });

    afterEach(() => {
      mockFs.restore();
    });
  });
});
