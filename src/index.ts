import * as program from 'commander';
import * as ejs from 'ejs';
import * as path from 'path';

import context from './context';
import { createDirsUnlessExist, getFilePathsInDir, readFile, writeFile } from './fs';

program
  .option('-d, --baseDir <baseDir>', 'Base dir for generating files, defaults to cwd', process.cwd())
  .option('-s, --scaffoldsDir <scaffoldsDir>', 'Where scaffolds are located', '__scaffolds__')
  .arguments('<scaffold> <name>')
  .action(() => {
    run();
  }).parse(process.argv);

const SLASH = '@slash';
const FILE_NAME_PLACEHOLDER = '__name__';
const ESJ_OPTIONS = { async: true, context };
const FILE_ENCODING = 'utf8';

async function run() {
  const { scaffoldsDir, baseDir } = program;
  const [scaffold, name] = program.args;
  const scaffoldDir = path.resolve(scaffoldsDir, scaffold);
  const scaffoldFilePaths = await getFilePathsInDir(scaffoldDir);
  scaffoldFilePaths.forEach(async (filePath) => {
    const fileContent = await readFile(filePath, FILE_ENCODING);
    const generatedContent = await ejs.render(fileContent, { name }, ESJ_OPTIONS);

    const parsedPath = path.parse(filePath);
    const generatedFilePathItems = parsedPath.base.split(SLASH);
    const generatedFileName = generatedFilePathItems[generatedFilePathItems.length - 1]
      .replace(FILE_NAME_PLACEHOLDER, name);
    const generatedFileDirPath = generatedFilePathItems.slice(0, -1);
    const absoluteGeneratedFileDirPath = path.join(baseDir, ...generatedFileDirPath);
    await createDirsUnlessExist(absoluteGeneratedFileDirPath);

    const absolutionGeneratedFilePath = path.join(absoluteGeneratedFileDirPath, generatedFileName);
    await writeFile(absolutionGeneratedFilePath, generatedContent);
  });
  // process.exit();
}
