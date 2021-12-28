import fs from 'fs';
import path from 'path';
import parse from './parsers.js';
import stylish1 from './formatters/stylish.js';
import buildDiff from './buildDiff.js';

const genDiff = (filepath1, filepath2, formatName = 'stylish') => {
const fileContents1 = fs.readFileSync(filepath1, 'utf8');
const fileContents2 = fs.readFileSync(filepath2, 'utf8');

const format1 = path.extname(filepath1).slice(1);;
const format2 = path.extname(filepath2).slice(1);;

const dataFromFile1 = parse(format1, fileContents1);
const dataFromFile2 = parse(format2, fileContents2);

const diffs = buildDiff(dataFromFile1, dataFromFile2);

const formattedDiff = stylish1(diffs);
return formattedDiff;
};



export default genDiff;