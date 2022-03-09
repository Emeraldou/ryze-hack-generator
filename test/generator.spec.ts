import test from 'ava';

import { generate } from '../src';

test('logs', t => {
  for (let i = 0; i < 20; i++) {
    t.log(generate());
  }
  
  t.pass();
});