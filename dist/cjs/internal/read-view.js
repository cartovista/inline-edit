"use strict";

var _typeof = require("@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _core = require("@emotion/core");

var _colors = require("@atlaskit/theme/colors");

var _constants = require("./constants");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/** @jsx jsx */
var readViewContainerStyles = (0, _core.css)({
  lineHeight: 1
});
var editButtonStyles = (0, _core.css)({
  display: 'block',
  margin: '0',
  padding: '0',
  appearance: 'none',
  background: 'transparent',
  border: 0,
  lineHeight: 1,
  outline: '0',
  '&:focus + div': {
    border: "2px solid ".concat("var(--ds-border-focused, ".concat(_colors.B100, ")"))
  }
});
var readViewWrapperStyles = (0, _core.css)({
  display: 'inline-block',
  boxSizing: 'border-box',
  width: 'auto',
  maxWidth: '100%',
  border: '2px solid transparent',
  borderRadius: _constants.borderRadius,
  transition: 'background 0.2s',
  '&:hover': {
    background: "var(--ds-background-neutral-subtle-hovered, ".concat(_colors.N30, ")")
  }
});
var readViewFitContainerWidthStyles = (0, _core.css)({
  width: '100%'
});
var DRAG_THRESHOLD = 5;

var ReadView = function ReadView(_ref) {
  var editButtonLabel = _ref.editButtonLabel,
      onEditRequested = _ref.onEditRequested,
      postReadViewClick = _ref.postReadViewClick,
      editButtonRef = _ref.editButtonRef,
      readViewFitContainerWidth = _ref.readViewFitContainerWidth,
      readView = _ref.readView;
  var startX = (0, _react.useRef)(0);
  var startY = (0, _react.useRef)(0);

  var mouseHasMovedAfterMouseDown = function mouseHasMovedAfterMouseDown(event) {
    return Math.abs(startX.current - event.clientX) >= DRAG_THRESHOLD || Math.abs(startY.current - event.clientY) >= DRAG_THRESHOLD;
  };

  var onReadViewClick = function onReadViewClick(event) {
    var element = event.target;
    /** If a link is clicked in the read view, default action should be taken */

    if (element.tagName.toLowerCase() !== 'a' && !mouseHasMovedAfterMouseDown(event)) {
      event.preventDefault();
      onEditRequested();
      postReadViewClick();
    }
  };
  /* eslint-disable jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions,jsx-a11y/no-noninteractive-element-interactions */


  return (0, _core.jsx)("div", {
    css: readViewContainerStyles
  }, (0, _core.jsx)("button", {
    css: editButtonStyles,
    "aria-label": editButtonLabel,
    type: "button",
    onClick: onEditRequested,
    ref: editButtonRef
  }), (0, _core.jsx)("div", {
    css: [readViewWrapperStyles, readViewFitContainerWidth && readViewFitContainerWidthStyles],
    onClick: onReadViewClick,
    onMouseDown: function onMouseDown(e) {
      startX.current = e.clientX;
      startY.current = e.clientY;
    },
    "data-read-view-fit-container-width": readViewFitContainerWidth
  }, readView()));
  /* eslint-enable jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions,jsx-a11y/no-noninteractive-element-interactions */
};

var _default = ReadView;
exports.default = _default;