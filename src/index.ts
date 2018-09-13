import * as program from 'commander';
import { resolve } from 'path';

import { requireMaybeExistentJson } from './fs';
import { YapArgs } from './types';
import yap from './yap';

// TODO: add args and options validations based on ./types
program
  .option(
    '-c, --configPath <configPath>',
    'Path to config json file, defaults to yapconfig.json',
    resolve('yapconfig.json'))
  .option('-d, --baseDir <baseDir>', 'Base dir for generating files, defaults to cwd', process.cwd())
  .option('-s, --scaffoldsDir <scaffoldsDir>', 'Dir where scaffolds are, defaults to __scaffolds__', '__scaffolds__')
  .arguments('<scaffold> <name>')
  .action(() => {
    const { scaffoldsDir, baseDir, configPath } = program;
    const options = {
      ...requireMaybeExistentJson(configPath),
      baseDir,
      scaffoldsDir,
    };
    yap(program.args as YapArgs, options);
  }).parse(process.argv);
