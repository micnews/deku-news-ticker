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
  },
  afterMount: function (component, el) {
    var slider = el.querySelector('.news-ticker__slider');

    setInterval(function () {
      slider.style.transition = '';
      slider.style.left = -slider.firstChild.offsetWidth + 'px';

      setTimeout(function () {
        slider.style.transition = 'none';
        slider.appendChild(slider.firstChild);
        slider.style.left = '0px';
      }, 400);
    }, 1000 * 3);
  }
};
