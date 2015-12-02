'use strict';
/** @jsx element */

import test from 'tape';
import { renderString, tree } from 'deku';
import element from 'magic-virtual-element';
import NewsTicker from './';

test('NewsTicker', function (t) {
  t.equal(renderString(tree(<NewsTicker />)),
    '<div></div>');

  t.end();
});
