import test from 'ava';

import { generate } from '../index';

test('logs', t => {
  t.log(generate());
});