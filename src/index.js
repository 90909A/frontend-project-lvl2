import fs from 'fs';
import path from 'path';
import parse from './parsers.js';
import buildDiff from './buildDiff.js';
import format from './formatters/index.js';

const genDiff = (filepath1, filepath2, formatName = 'stylish') => {
const fileContents1 = fs.readFileSync(filepath1, 'utf8');
const fileContents2 = fs.readFileSync(filepath2, 'utf8');

const format1 = path.extname(filepath1).slice(1);;
const format2 = path.extname(filepath2).slice(1);;

const dataFromFile1 = parse(format1, fileContents1);
const dataFromFile2 = parse(format2, fileContents2);

const diff = buildDiff(dataFromFile1, dataFromFile2);

return format(formatName, diff);
};



export default genDiff;