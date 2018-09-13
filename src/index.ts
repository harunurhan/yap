import * as program from 'commander';

import yap from './yap';
import { YapArgs } from './types';

// TODO: add args and options validations based on ./types
program
  .option('-d, --baseDir <baseDir>', 'Base dir for generating files, defaults to cwd', process.cwd())
  .option('-s, --scaffoldsDir <scaffoldsDir>', 'Where scaffolds are located', '__scaffolds__')
  .arguments('<scaffold> <name>')
  .action(() => {
    const { scaffoldsDir, baseDir } = program;
    yap(program.args as YapArgs, { scaffoldsDir, baseDir });
  }).parse(process.argv);
