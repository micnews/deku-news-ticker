'use strict';
/** @jsx element */

import element from 'magic-virtual-element';

let intervals = {};
let hoverStates = {};

export default {
  defaultProps: {
    interval: 1000 * 3
  },
  render: function (component) {
    const {state, props} = component;
    let style;
    if (state.offset) {
      style = 'left: -' + state.offset + 'px;';
    } else {
      style = 'transition: none; left: 0;';
    }

    function hover () {
      hoverStates[component.id] = true;
    }

    function blur () {
      hoverStates[component.id] = false;
    }

    return (<div class='news-ticker'>
      <span class='news-ticker__label'>{ props.label || 'The Latest News'}</span>
      <span class='news-ticker__slider' style={style} onMouseOver={hover} onMouseOut={blur}>
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
      if (!hoverStates[component.id]) {
        setState({
          offset: slider.firstChild.offsetWidth
        });
      }
    }, props.interval);
  },
  beforeUnmount: function (component, el) {
    window.clearInterval(intervals[component.id]);
    delete intervals[component.id];
    delete hoverStates[component.id];
  }
};
