import fs from 'fs';
import yaml from 'js-yaml';

const jsonFormat = 0;
const yamlFormat = 1;

const getFormat = (filepath1, filepath2) => {
	if (filepath1.substr(-4) === 'json' && filepath2.substr(-4) === 'json') {
		return jsonFormat;
	}
	if (filepath1.substr(-4) === 'yaml'  && filepath2.substr(-4) === 'yaml') {
		return yamlFormat;
	}
	if (filepath1.substr(-3) === 'yml'  && filepath2.substr(-3) === 'yml') {
		return yamlFormat;
	}
};



const getDiffs = (object1, object2) => {
	let diffs = [];

	for (const key in object1) {
		let sign = ' ';
		if (object1[key] !== object2[key]) {
			sign = '-';
		}
		let diff = { sign: sign, key: key, value: object1[key] };
		diffs.push(diff);
	}

	for (const key in object2) {
		if (object1[key] !== object2[key]) {
			let sign = '+';
			let diff = { sign: sign, key: key, value: object2[key] };
			diffs.push(diff);
		}
	}

	return diffs;
};


const getSortedDiffs = (diffs) => {
	return diffs.sort(function (a, b) {
		if (a.key > b.key) {
		return 1;
		}
		if (a.key < b.key) {
		return -1;
		}
		return 0;
	});
};


const convertToString = (diffs) => {
	let result = '{';
	for (const item of diffs) {
		result += (`\n${item.sign} ${item.key}: ${item.value}`);
	}
	result += '\n}';
	return result;
};

const calculateDiffs = (filepath1, filepath2) => {
	const file1 = fs.readFileSync(filepath1);
    const file2 = fs.readFileSync(filepath2);
	let object1 = {};
	let object2 = {}
	if (getFormat(filepath1, filepath2) === jsonFormat) {
    	object1 = JSON.parse(file1);
    	object2 = JSON.parse(file2);
	}
	if (getFormat(filepath1, filepath2) === yamlFormat) {
		object1 = yaml.load(file1);
		object2 = yaml.load(file2);
		}
	const diffs = getDiffs(object1, object2);
	const sortedDiffs = getSortedDiffs(diffs);
	const result = convertToString(sortedDiffs);
	return result;
};




export { calculateDiffs, getDiffs, getSortedDiffs, convertToString };
