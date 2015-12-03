'use strict';
/** @jsx element */

import element from 'magic-virtual-element';

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

    slider.addEventListener('transitionend', function () {
      props.children.push(props.children.shift());
      setState({
        offset: false
      });
    });

    component.interval = setInterval(function () {
      setState({
        offset: slider.firstChild.offsetWidth
      });
    }, 1000 * 3);
  },
  beforeUnmount: function (component, el) {
    window.clearInterval(component.interval);
  }
};
