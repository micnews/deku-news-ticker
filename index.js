'use strict';
/** @jsx element */

import element from 'magic-virtual-element';

export default {
  render: function ({ props }) {
    return (<div class='news-ticker'>
      <span class='news-ticker__label'>{ props.label || 'The Latest News'}</span>
      <span class='news-ticker__slider'>
        {props.children}
      </span>
    </div>);
  }
};
