import test from 'ava';

import RyzeHackGenerator from '../index';

test('logs', t => {
  t.log(RyzeHackGenerator.generate({
    length: 300,
    lowercaseProbability: 100,
    minChineseSequenceLength: 15,
    maxChineseSequenceLength: 20
  }));
});