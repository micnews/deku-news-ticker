'use strict';
/** @jsx element */

import element from 'magic-virtual-element';

let intervals = {};

export default {
  render: function (component) {
    const {state, props} = component;
    let style;
    if (state.offset) {
      style = 'left: -' + state.offset + 'px;';
    } else {
      style = 'transition: none; left: 0;';
    }

    return (<div class='news-ticker'>
      <span class='news-ticker__label'>{ props.label || 'The Latest News'}</span>
      <span class='news-ticker__slider' style={style}>
        {props.children}
      </span>
    </div>);
  },
  afterMount: function (component, el, setState) {
    const {props} = component;
    const slider = el.querySelector('.news-ticker__slider');

    slider.addEventListener('transitionend', function (event) {
      if (event.target !== slider) {
        return;
      }

      props.children.push(props.children.shift());
      setState({
        offset: false
      });
    });

    intervals[component.id] = setInterval(function () {
      setState({
        offset: slider.firstChild.offsetWidth
      });
    }, 1000 * 3);
  },
  beforeUnmount: function (component, el) {
    window.clearInterval(intervals[component.id]);
    delete intervals[component.id];
  }
};
