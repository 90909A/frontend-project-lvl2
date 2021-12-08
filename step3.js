import fs from 'fs';

const getUnsortedArray = (object1, object2) => {
	let unsortedArray = [];
	let newObject = { sign: " ", key: "key", value: "value" };

	for (const key in object1) {
		if (object1[key] === object2[key]) {
			newObject = { sign: " ", key: key, value: object1[key] };
			unsortedArray.push(newObject);
		}
		if (object1[key] !== object2[key]) {
			newObject = { sign: "-", key: key, value: object1[key] };
			unsortedArray.push(newObject);
		}
	}

	for (const key in object2) {
		if (object1[key] !== object2[key]) {
			newObject = { sign: "+", key: key, value: object2[key] };
			unsortedArray.push(newObject);
		}
	}

	return unsortedArray;
};


const getSortedArray = (unsortedArray) => {
	let sortedArray = unsortedArray.sort(function (a, b) {
		if (a.key > b.key) {
		return 1;
		}
		if (a.key < b.key) {
		return -1;
		}
		return 0;
	});
	return sortedArray;
};


const makeString = (sortedArray) => {
	let result = '{';
	for (const item of sortedArray) {
		result += (`\n${item.sign} ${item.key}: ${item.value}`);
	}
	result += '\n}';
	return result;
};

const step3 = (filepath1, filepath2) => {
	const file1 = fs.readFileSync(filepath1);
    const file2 = fs.readFileSync(filepath2);
    const object1 = JSON.parse(file1);
    const object2 = JSON.parse(file2);
	const unsortedArray = getUnsortedArray(object1, object2);
	const sortedArray = getSortedArray(unsortedArray);
	const result = makeString(sortedArray);
	return result;
};




export { step3 };
