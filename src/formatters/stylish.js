const stylish1 = (sortedDiffs, space = ' ', spacesCount = 2, depth = 0) => {
	if (sortedDiffs.length === 0) {
		return '';
	}
	let result = '';
	for (const diff of sortedDiffs) {
		if (Array.isArray(diff.value)) {
			result += `${space.repeat(spacesCount * (depth + 1))}${diff.sign} ${diff.key}: ${stylish1(diff.value, space, spacesCount, depth + 2)}`
		} else {
			result += `${space.repeat(spacesCount * (depth + 1))}${diff.sign} ${diff.key}: ${(diff.value)}\n`
		}
	}
	if (depth === 0) {
		return `{\n${result}${space.repeat(spacesCount * (depth))}}`;
	}
	return `{\n${result}${space.repeat(spacesCount * (depth))}}\n`;
};

export default stylish1;