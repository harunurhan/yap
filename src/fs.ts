import * as fs from 'fs';
import * as mkdirp from 'mkdirp';
import * as path from 'path';
import { promisify } from 'util';
import { asyncFilter } from './utils';

export const writeFile = promisify(fs.writeFile);

export function createDirsUnlessExist(dir: string): Promise<void> {
  return new Promise((resolve, reject) => {
    mkdirp(dir, (error) => {
      if (error) {
        return reject(error);
      }
      resolve();
    });
  });
}

export const readFile = promisify(fs.readFile);

const lstat = promisify(fs.lstat);
async function isFile(maybeFilePath): Promise<boolean> {
  const stats = await lstat(maybeFilePath);
  return stats.isFile();
}

const readdir = promisify(fs.readdir);
export async function getFilePathsInDir(dir: string): Promise<string[]> {
  const filesAndFolders = await readdir(dir);
  const resolvedPaths = filesAndFolders
    .map((fileOrFolder) => path.resolve(dir, fileOrFolder));
  const onlyFilePaths = await asyncFilter(resolvedPaths, isFile);
  return onlyFilePaths;
}
