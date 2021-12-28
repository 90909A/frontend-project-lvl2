import genDiff from '../src/gendiff.js';
import { test, expect } from '@jest/globals';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import module from 'path';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = module.dirname(__filename);

const inputFormats = ['json', 'yaml'];

const getFilepaths = (formats) => formats.map((item) => [
  module.join(__dirname, '..', '__fixtures__', `before.${item}`),
  module.join(__dirname, '..', '__fixtures__', `after.${item}`),
]);

const getResult = (otputFormat) => {
  const resultPath = module.join(__dirname, '..', '__fixtures__', `diff-${otputFormat}`);
  return fs.readFileSync(resultPath, 'utf8');
};

test.each(getFilepaths(inputFormats))('gendiff', (beforePath, afterPath) => {
  expect(genDiff(beforePath, afterPath)).toBe(getResult('stylish'));
  expect(genDiff(beforePath, afterPath, 'stylish')).toBe(getResult('stylish'));
  },
);