import { expect, test } from '@jest/globals';
import fs from 'fs';
import genDiff from '../src/index.js';

test('test genDiff format stylish', () => {
  expect(genDiff('./__fixtures__/before.yaml', './__fixtures__/after.yaml', 'stylish')).
  toEqual(
    `{
    common: {
      + follow: false
        setting1: Value 1
      - setting2: 200
      - setting3: true
      + setting3: null
      + setting4: blah blah
      + setting5: {
            key5: value5
        }
        setting6: {
            doge: {
              - wow: 
              + wow: so much
            }
            key: value
          + ops: vops
        }
    }
    group1: {
      - baz: bas
      + baz: bars
        foo: bar
      - nest: {
            key: value
        }
      + nest: str
    }
  - group2: {
        abc: 12345
        deep: {
            id: 45
        }
    }
  + group3: {
        deep: {
            id: {
                number: 45
            }
        }
        fee: 100500
    }
}`
);
});

test('test genDiff format plain', () => {
expect(genDiff('./__fixtures__/before.yaml', './__fixtures__/after.yaml', 'plain'))
.toEqual(
`Property 'common.follow' was added with value: false
Property 'common.setting2' was removed
Property 'common.setting3' was updated. From true to null
Property 'common.setting4' was added with value: 'blah blah'
Property 'common.setting5' was added with value: [complex value]
Property 'common.setting6.doge.wow' was updated. From '' to 'so much'
Property 'common.setting6.ops' was added with value: 'vops'
Property 'group1.baz' was updated. From 'bas' to 'bars'
Property 'group1.nest' was updated. From [complex value] to 'str'
Property 'group2' was removed
Property 'group3' was added with value: [complex value]`);
});

test('test genDiff format json', () => {
  expect(genDiff('./__fixtures__/before.yaml', './__fixtures__/after.yaml', 'json')).toEqual(`[{"key":"common","status":"nested","children":[{"key":"follow","value":false,"status":"added"},{"key":"setting1","value":"Value 1","status":"unchanged"},{"key":"setting2","value":200,"status":"removed"},{"key":"setting3","value":null,"oldValue":true,"status":"updated"},{"key":"setting4","value":"blah blah","status":"added"},{"key":"setting5","value":{"key5":"value5"},"status":"added"},{"key":"setting6","status":"nested","children":[{"key":"doge","status":"nested","children":[{"key":"wow","value":"so much","oldValue":"","status":"updated"}]},{"key":"key","value":"value","status":"unchanged"},{"key":"ops","value":"vops","status":"added"}]}]},{"key":"group1","status":"nested","children":[{"key":"baz","value":"bars","oldValue":"bas","status":"updated"},{"key":"foo","value":"bar","status":"unchanged"},{"key":"nest","value":"str","oldValue":{"key":"value"},"status":"updated"}]},{"key":"group2","value":{"abc":12345,"deep":{"id":45}},"status":"removed"},{"key":"group3","value":{"deep":{"id":{"number":45}},"fee":100500},"status":"added"}]`);
});