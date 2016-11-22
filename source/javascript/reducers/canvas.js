import _map from 'lodash/map';
import _assign from 'lodash/assign';
import _isElement from 'lodash/iselement';
import _isObject from 'lodash/isobject';
import _indexOf from 'lodash/indexof';

import TTDOM from '../common/TTDOM';
import * as Actions from '../actions/constants';

const targets = [
  'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
  'strong', 'em', 'i', 'span', 'p', 'a',
  'li', 'ul',
  'div',
  'img', 'input', 'textarea', 'blockquote',
  'figcaption'
].join(',');

const mouseEnterEvent = function () {
  this.classList.add('ab-ch');
};

const mouseLeaveEvent = function () {
  this.classList.remove('ab-ch');
};

var incrementingId = 0;
const getId = (function () {
  return function(element) {
    if (!element.getAttribute('data-ttid')) {
      element.setAttribute('data-ttid', `id_${incrementingId++}`);
      // Possibly add a check if this ID really is unique
    }
    return element.getAttribute('data-ttid');
  };
}());

const canvasInitialState = {
  iFrameWindow: null,

  currentHoverBlock: {
    block: {},
    elementReference: null,
    topX: 10
  },

  eventedElements: []
};

export default function canvas (state = canvasInitialState, action) {
  switch (action.type) {
    case Actions.LOGIC_INITIALIZED: {
      const iFrame = TTDOM.iframe.get('ab-cfrm');
      const iFrameWindow = TTDOM.iframe.getWindow(iFrame);

      return _assign({}, state, {
        iFrameWindow: iFrameWindow
      });
    }

    case Actions.LOAD_PREVIOUS_PAGE:
    case Actions.LOAD_CONTENTBLOCK_TO_PAGE:
    case Actions.CLOSE_MODAL: {
      const { iFrameWindow } = state;
      const filesToUpdate = iFrameWindow.document.querySelectorAll('[data-update]');
      let script = null;

      _map(filesToUpdate, (file) => {
        const fileSource = file.getAttribute('src');

        TTDOM.element.remove(file);

        script = iFrameWindow.document.createElement('script');
        script.src = fileSource;
        script.async = true;
        script.setAttribute('data-update', true);

        iFrameWindow.document.head.appendChild(script);
      });

      return state;
    }

    case Actions.CURRENT_HOVER_BLOCK: {
      const { elementReference, block } = action;

      if (_isElement(elementReference) && _isObject(block)) {
        const { iFrameWindow } = state;
        const topX = TTDOM.misc.getAbsPosition(elementReference, iFrameWindow)[0] + 10;

        return _assign({}, state, {
          currentHoverBlock: {
            block: block,
            elementReference: elementReference,
            topX: topX
          }
        });
      } else {
        throw 'Missing element or object in hover object.';
      }
    }

    case Actions.REMOVE_CONTENTBLOCK: {
      return _assign({}, state, {
        currentHoverBlock: {
          block: {}
        }
      });
    }

    case Actions.CLONE_ITEM:
    case Actions.SET_CANVAS_ELEMENTS_HOVER_EVENTS: {
      const { iFrameWindow } = state;
      let { eventedElements } = state;
      const targetElements = iFrameWindow.document.querySelectorAll(targets);

      // Add mouse events to elements inside core block.
      _map(targetElements, (target) => {
        if (_indexOf(eventedElements, getId(target)) !== -1) {
          return false;
        }

        const findUp = TTDOM.find.findUpAttr(target, 'data-abcpanel data-abctoolbox');

        if (findUp !== null || target.getAttribute('data-abcpanel')) {
          return false;
        }

        target.contentEditable = true;

        // First remove old events.
        target.removeEventListener('mouseenter', mouseEnterEvent);
        target.removeEventListener('mouseleave', mouseLeaveEvent);

        // Add new events.
        target.addEventListener('mouseenter', mouseEnterEvent, false);
        target.addEventListener('mouseleave', mouseLeaveEvent, false);

        eventedElements.push(getId(target));
      });

      return _assign({}, state, {
        eventedElements: eventedElements
      });
    }
  }

  return state;
}
