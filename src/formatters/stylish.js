import _ from 'lodash';

const getIndent = (depth, spacesCount = 4) => ' '.repeat(depth * spacesCount - 2);

const stringify = (diff, depth) => {
  if (!_.isPlainObject(diff)) {
    return diff;
  }

  const obj = diff;
  const keys = Object.keys(obj);
  const indent = getIndent(depth);
  const braceIndent = getIndent(depth - 1);

  const innerPart = keys.map((key) => {
    const currentValue = obj[key];
    if (_.isPlainObject(currentValue)) {
      return `${indent}  ${key}: ${stringify(currentValue, depth + 1)}`;
    }

    return `${indent}  ${key}: ${currentValue}`;
  });

  return `{\n${innerPart.join('\n')}\n${braceIndent}  }`;
};

const stylish = (diff) => {
  const iter = (depth, node) => node.flatMap((child) => {
    const {
      key, value, status, oldValue, children,
    } = child;
    const indent = getIndent(depth);
    const nextLevelDepth = depth + 1;

    switch (status) {
      case 'nested':
        return `${indent}  ${key}: {\n${iter(nextLevelDepth, children)}\n${indent}  }`.split(',');
      case 'updated':
        return `${indent}- ${key}: ${stringify(oldValue, nextLevelDepth)}\n${indent}+ ${key}: ${stringify(value, nextLevelDepth)}`;
      case 'added':
        return `${indent}+ ${key}: ${stringify(value, nextLevelDepth)}`;
      case 'removed':
        return `${indent}- ${key}: ${stringify(value, nextLevelDepth)}`;
      case 'unchanged':
        return `${indent}  ${key}: ${value}`;
      default:
        throw new Error(`Unexpected condition ${status}. Please check the input data.`);
    }
  });

  const startDepth = 1;
  const innerPart = iter(startDepth, diff);

  return `{\n${innerPart.join('\n')}\n}`;
};

export default stylish;