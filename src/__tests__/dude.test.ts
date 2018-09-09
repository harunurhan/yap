import { exec } from 'child_process';
import * as fs from 'fs';
import * as mockFs from 'mock-fs';
import { promisify } from 'util';

import runDude from '../dude';

const readFile = promisify(fs.readFile);
const execShellCommand = promisify(exec);

const FILE_ENCODING = 'utf8';
const DUDE_COMMAND = 'node ./dist/index.js';

describe('dude', () => {
  it('should create files for given scaffolds', async (done) => {
    mockFs({
      __scaffolds__: {
        component: {
          '__name__.js': `class <%= this.classify(name) %>Component { }`,
          '__tests__@slash__name__.test.js': `describe('<%= this.classify(name) %> component', () => { })`,
        },
      },
    });

    await runDude(['component', 'button'], { scaffoldsDir: '__scaffolds__', baseDir: process.cwd() });

    const buttonFileContent = await readFile('button.js', FILE_ENCODING);
    expect(buttonFileContent).toEqual(`class ButtonComponent { }`);

    const buttonTestFileContent = await readFile('__tests__/button.test.js', FILE_ENCODING);
    expect(buttonTestFileContent).toEqual(`describe('Button component', () => { })`);

    done();
  });

  afterEach(() => {
    mockFs.restore();
  });
});
