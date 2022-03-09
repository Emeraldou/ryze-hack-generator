import test from 'ava';

import RyzeHackGenerator from '../index';

test('logs', t => {
  t.log(RyzeHackGenerator.generate({
    wordPool: (pool: Array<string>) => {
      pool.push("TEST");
      return pool;
    },
  }));
});