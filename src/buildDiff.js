const buildDiff = (dataFromFile1, dataFromFile2) => sortDiffs(getDiffs(dataFromFile1, dataFromFile2));



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



const sortDiffs = (diffs) => {
	return diffs.sort((firstDiff, secondDiff) => {
		if (Array.isArray(firstDiff.value)) {
			firstDiff.value = sortDiffs(firstDiff.value);
		}
		if (Array.isArray(secondDiff.value)) {
			secondDiff.value = sortDiffs(secondDiff.value);
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

export default buildDiff;