import * as program from 'commander';

import runDude from './dude';
import { DudeArgs } from './types';

// TODO: add args and options validations based on ./types
program
  .option('-d, --baseDir <baseDir>', 'Base dir for generating files, defaults to cwd', process.cwd())
  .option('-s, --scaffoldsDir <scaffoldsDir>', 'Where scaffolds are located', '__scaffolds__')
  .arguments('<scaffold> <name>')
  .action(() => {
    const { scaffoldsDir, baseDir } = program;
    runDude(program.args as DudeArgs, { scaffoldsDir, baseDir });
  }).parse(process.argv);
