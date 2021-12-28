const obj1 = {
	common: {
		setting1: "Value 1",
		setting2: 200,
		setting3: true,
		setting6: {
			key: "value",
			doge: {
				wow: "",
			},
		},
	},
	group1: {
		baz: "bas",
		foo: "bar",
		nest: {
			key: "value",
		},
	},
	group2: {
		abc: 12345,
		deep: {
			id: 45,
		},
	},
};

const obj2 = {
	common: {
		follow: false,
		setting1: "Value 1",
		setting3: null,
		setting4: "blah blah",
		setting5: {
			key5: "value5",
		},
		setting6: {
			key: "value",
			ops: "vops",
			doge: {
				wow: "so much",
			},
		},
	},
	group1: {
		foo: "bar",
		baz: "bars",
		nest: "str",
	},
	group3: {
		deep: {
			id: {
				number: 45,
			},
		},
		fee: 100500,
	},
};

const obj3 = {
	host: "hexlet.io",
	timeout: 50,
	proxy: "123.234.53.22",
	follow: false,
};

const obj4 = {
	timeout: 20,
	verbose: true,
	host: "hexlet.io",
};

const getDiffs = (object1, object2) => {
	let diffs = [];

	for (const key in object1) {
		if (typeof object1[key] === "object") {
			if (typeof object2[key] !== "object") {
				diffs.push({
					sign: "-",
					key: key,
					value: getDiffs(object1[key], object1[key]),
			});
				continue;
			}
			if (object2[key] === undefined) {
				diffs.push({
					sign: "-",
					key: key,
					value: getDiffs(object1[key], object1[key]),
				});
			} else {
				diffs.push({
					sign: " ",
					key: key,
					value: getDiffs(object1[key], object2[key]),
				});
			}
		}

		if (typeof object1[key] !== "object" || object1[key] === null) {
			if (object1[key] === object2[key]) {
				diffs.push({ sign: " ", key: key, value: object1[key] });
			} else {
				diffs.push({ sign: "-", key: key, value: object1[key] });
			}
		}
	}

	////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	for (const key in object2) {
		if (typeof object2[key] === "object" && object2[key] !== null) {
			if (object1[key] === undefined) {
				diffs.push({
					sign: "+",
					key: key,
					value: getDiffs(object2[key], object2[key]),
				});
			} else {
				continue;
			}
		}

		if (typeof object2[key] !== "object" || object2[key] === null) {
			if (object1[key] === undefined || object1[key] !== object2[key]) {
				diffs.push({ sign: "+", key: key, value: object2[key] });
			}
		}
	}
	return diffs;
};

const getSortedDiffs = (diffs) => {
			return diffs.sort((firstDiff, secondDiff) => {
					if (Array.isArray(firstDiff.value)) {
						firstDiff.value = getSortedDiffs(firstDiff.value);
					}
					if (Array.isArray(secondDiff.value)) {
						secondDiff.value = getSortedDiffs(secondDiff.value);
					}
					if (firstDiff.key > secondDiff.key) {
						return 1;
					}
					if (firstDiff.key < secondDiff.key) {
						return -1;
					}		
					return 0;
			});


};

const formatDiffs = (sortedDiffs, space = ' ', spacesCount = 2, depth = 0) => {
		let result = '';
		for (const diff of sortedDiffs) {
			if (Array.isArray(diff.value)) {
				result += `${space.repeat(spacesCount * (depth + 1))}${diff.sign} ${diff.key}: ${formatDiffs(diff.value, space, spacesCount, depth + 2)}`
			} else {
				result += `${space.repeat(spacesCount * (depth + 1))}${diff.sign} ${diff.key}: ${(diff.value)}\n`
			} 
		}
		if (depth === 0) {
			return `{\n${result}${space.repeat(spacesCount * (depth))}}`;
		}
	return `{\n${result}${space.repeat(spacesCount * (depth))}}\n`;
};

let a = getDiffs(obj1, obj2);
let b = getSortedDiffs(getDiffs(obj1, obj2));
let c = formatDiffs(getSortedDiffs(getDiffs(obj1, obj2)));
console.log(c);