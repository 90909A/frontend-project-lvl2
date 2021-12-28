import { calculateDiffs } from '../src/gendiff.js';
import { program } from 'commander';

//const program = require('commander');//

program
.description(' Compares two configuration files and shows a difference.')
.version('0.0.1')
.option('-f, --format [type]', 'output format')
.argument('<filepath1>')
.argument('<filepath2>')
.action((filepath1, filepath2) => {
  console.log(gendiff(filepath1,filepath2));
  })
.parse(process.argv);