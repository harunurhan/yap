import * as mockFs from 'mock-fs'; /* tslint:disable-line: no-implicit-dependencies*/
import { resolve } from 'path';

import { getFilePathsInDir } from '../fs';

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
});
