import _ from 'lodash';

const buildDiff = (object1, object2) => {
	const keys = _.sortBy(_.union(_.keys(object1), _.keys(object2)));

	const diff = keys.map((key) => {
		const firstValue = object1[key];
		const secondValue = object2[key];

		const hasFirstObjectKey = _.has(object1, key);
		const hasSecondObjectKey = _.has(object2, key);

		if (_.isPlainObject(firstValue) && _.isPlainObject(secondValue)) {
			return {key: key, status: 'nested', children: buildDiff(firstValue, secondValue)};
		}

		if (!hasSecondObjectKey) {
			return {key: key, value: firstValue, status: 'removed'};
		}

		if (!hasFirstObjectKey) {
			return {key: key, value: secondValue, status: 'added'};
		}

		if (!_.isEqual(firstValue, secondValue)) {
			return {key: key, value: secondValue, oldValue: firstValue, status: 'updated'};
		}

		return {key: key, value: firstValue, status: 'unchanged'};
	});

	return diff;
};

export default buildDiff;