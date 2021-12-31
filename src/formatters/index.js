import stylish from './stylish.js';
import plain from './plain.js';

export default (formatName, diff) => {
  switch (formatName) {
    case 'stylish':
      return stylish(diff);
    case 'plain':
      return plain(diff);
    case 'json':
      return JSON.stringify(diff);
    default:
      throw new Error('Unsupported format. Please enter the correct format.');
  }
};
