"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _core = require("@emotion/core");

var _standardButton = _interopRequireDefault(require("@atlaskit/button/standard-button"));

var _check = _interopRequireDefault(require("@atlaskit/icon/glyph/check"));

var _cross = _interopRequireDefault(require("@atlaskit/icon/glyph/cross"));

var _colors = require("@atlaskit/theme/colors");

var _constants = require("./constants");

/** @jsx jsx */
var buttonsContainerStyles = (0, _core.css)({
  display: 'flex',
  marginTop: _constants.gridSize - 2,
  position: 'absolute',
  top: '100%',
  right: 0,
  flexShrink: 0
});
var buttonWrapperElevationDarkStyles = (0, _core.css)({
  boxShadow: "var(--ds-shadow-overlay, ".concat("0 4px 8px -2px ".concat(_colors.DN50A, ", 0 0 1px ").concat(_colors.DN60A), ")")
});
var buttonWrapperElevationLightStyles = (0, _core.css)({
  boxShadow: "var(--ds-shadow-overlay, ".concat("0 4px 8px -2px ".concat(_colors.N50A, ", 0 0 1px ").concat(_colors.N60A), ")")
});
var buttonWrapperBaseStyles = (0, _core.css)({
  boxSizing: 'border-box',
  width: _constants.gridSize * 4,
  zIndex: 200,
  backgroundColor: "var(--ds-surface-overlay, ".concat(_colors.N0, ")"),
  borderRadius: _constants.gridSize / 2 - 1,
  fontSize: _constants.fontSize,
  '&:last-child': {
    marginLeft: _constants.gridSize / 2
  }
});

var Buttons = function Buttons(_ref) {
  var mode = _ref.mode,
      confirmButtonLabel = _ref.confirmButtonLabel,
      cancelButtonLabel = _ref.cancelButtonLabel,
      onMouseDown = _ref.onMouseDown,
      onCancelClick = _ref.onCancelClick;
  return (0, _core.jsx)("div", {
    css: buttonsContainerStyles
  }, (0, _core.jsx)("div", {
    css: [buttonWrapperBaseStyles, mode === 'light' ? buttonWrapperElevationLightStyles : buttonWrapperElevationDarkStyles]
  }, (0, _core.jsx)(_standardButton.default, {
    "aria-label": confirmButtonLabel,
    type: "submit",
    iconBefore: (0, _core.jsx)(_check.default, {
      label: confirmButtonLabel,
      size: "small"
    }),
    shouldFitContainer: true,
    onMouseDown: onMouseDown
  })), (0, _core.jsx)("div", {
    css: [buttonWrapperBaseStyles, mode === 'light' ? buttonWrapperElevationLightStyles : buttonWrapperElevationDarkStyles]
  }, (0, _core.jsx)(_standardButton.default, {
    "aria-label": cancelButtonLabel,
    iconBefore: (0, _core.jsx)(_cross.default, {
      label: cancelButtonLabel,
      size: "small"
    }),
    onClick: onCancelClick,
    shouldFitContainer: true,
    onMouseDown: onMouseDown
  })));
};

var _default = Buttons;
exports.default = _default;