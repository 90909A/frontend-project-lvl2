import { getDiffs, getSortedDiffs, convertToString } from '../diffsCalculator.js';
import { test, expect } from '@jest/globals';

const obj1 = {
  "host": "hexlet.io",
  "timeout": 50,
  "follow": false
};

const obj2 = {
  "timeout": 20,
  "host": "hexlet.io"
};


test('getDiffs1', () => {
    expect(getDiffs(obj1, obj2))
    .toEqual([{"key": "host", "sign": " ", "value": "hexlet.io"}, {"key": "timeout", "sign": "-", "value": 50}, {"key": "follow", "sign": "-", "value": false}, {"key": "timeout", "sign": "+", "value": 20}]);
  });


  test('getDiffs2', () => {
    expect(getDiffs({}, {}))
    .toEqual([]);
  });

  test('getSortedDiffs1', () => {
    expect(getSortedDiffs([{"key": "host", "sign": " ", "value": "hexlet.io"}, {"key": "timeout", "sign": "-", "value": 50}, {"key": "follow", "sign": "-", "value": false}, {"key": "timeout", "sign": "+", "value": 20}]))
    .toEqual([{"key": "follow", "sign": "-", "value": false}, {"key": "host", "sign": " ", "value": "hexlet.io"}, {"key": "timeout", "sign": "-", "value": 50}, {"key": "timeout", "sign": "+", "value": 20}]);
  });

  test('getSortedDiffs2', () => {
    expect(getSortedDiffs([]))
    .toEqual([]);
  });

  test('convertToString1', () => {
    expect(convertToString([{"key": "follow", "sign": "-", "value": false}, {"key": "host", "sign": " ", "value": "hexlet.io"}, {"key": "timeout", "sign": "+", "value": 20}]))
    .toEqual('{\n- follow: false\n  host: hexlet.io\n+ timeout: 20\n}');
  });
  test('convertToString2', () => {
    expect(convertToString([]))
    .toEqual('{\n}');
  });