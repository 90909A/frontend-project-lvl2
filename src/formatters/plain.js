import _ from 'lodash';

const stringify = (value) => {
  if (_.isPlainObject(value)) {
    return '[complex value]';
  }

  return typeof value === 'string' ? `'${value}'` : value;
};

const plain = (diff) => {
  const iter = (tree, path) => tree.flatMap((node) => {
    const {
      key, value, oldValue, status, children,
    } = node;

    const outputValue = stringify(value);
    const outputOldValue = stringify(oldValue);
    const currentPath = [...path, key];
    const currentPathStr = currentPath.join('.');

    switch (status) {
      case 'nested':
        return iter(children, currentPath);
      case 'added':
        return `Property '${currentPathStr}' was added with value: ${outputValue}`;
      case 'removed':
        return `Property '${currentPathStr}' was removed`;
      case 'updated':
        return `Property '${currentPathStr}' was updated. From ${outputOldValue} to ${outputValue}`;
      default:
        return [];
    }
  });

  return iter(diff, []).join('\n');
};

export default plain;