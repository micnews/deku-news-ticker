'use strict';
/** @jsx element */

import test from 'tape';
import { renderString, tree } from 'deku';
import element from 'magic-virtual-element';
import NewsTicker from './index';
import tsml from 'tsml';

test('NewsTicker', function (t) {
  t.equal(renderString(tree(<NewsTicker />)),
    tsml`<div class="news-ticker">
      <span class="news-ticker__label">The Latest News</span>
      <span class="news-ticker__slider" style="transition: none; left: 0;"></span>
    </div>`);

  t.equal(renderString(tree(<NewsTicker label='custom label'/>)),
    tsml`<div class="news-ticker">
      <span class="news-ticker__label">custom label</span>
      <span class="news-ticker__slider" style="transition: none; left: 0;"></span>
    </div>`);

  t.equal(renderString(tree(<NewsTicker>
      <span>slide1</span>
      <span>slide2</span>
      <span>slide3></span>
    </NewsTicker>)),
    tsml`<div class="news-ticker">
      <span class="news-ticker__label">The Latest News</span>
      <span class="news-ticker__slider" style="transition: none; left: 0;">
        <span>slide1</span>
        <span>slide2</span>
        <span>slide3></span>
      </span>
    </div>`);

  t.end();
});
