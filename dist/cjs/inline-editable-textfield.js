"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _core = require("@emotion/core");

var _error = _interopRequireDefault(require("@atlaskit/icon/glyph/error"));

var _inlineDialog = _interopRequireDefault(require("@atlaskit/inline-dialog"));

var _textfield = _interopRequireDefault(require("@atlaskit/textfield"));

var _colors = require("@atlaskit/theme/colors");

var _inlineEdit = _interopRequireDefault(require("./inline-edit"));

var _constants = require("./internal/constants");

var _excluded = ["errorMessage", "isInvalid"];
var errorIconContainerStyles = (0, _core.css)({
  paddingRight: _constants.gridSize - 2,
  lineHeight: '100%'
});
var readViewForTextFieldStyles = (0, _core.css)({
  display: 'flex',
  maxWidth: '100%',
  minHeight: "".concat(_constants.gridSize * 2.5 / _constants.fontSize, "em"),
  padding: "".concat(_constants.gridSize, "px ").concat(_constants.gridSize - 2, "px"),
  fontSize: _constants.fontSize,
  lineHeight: _constants.gridSize * 2.5 / _constants.fontSize,
  wordBreak: 'break-word'
});
var compactStyles = (0, _core.css)({
  padding: "".concat(_constants.gridSize / 2, "px ").concat(_constants.gridSize - 2, "px")
});

var InlineEditableTextfield = function InlineEditableTextfield(props) {
  var _props$isCompact = props.isCompact,
      isCompact = _props$isCompact === void 0 ? false : _props$isCompact,
      defaultValue = props.defaultValue,
      placeholder = props.placeholder,
      testId = props.testId;
  return (0, _core.jsx)(_inlineEdit.default, (0, _extends2.default)({}, props, {
    defaultValue: defaultValue,
    editView: function editView(_ref) {
      var errorMessage = _ref.errorMessage,
          isInvalid = _ref.isInvalid,
          props = (0, _objectWithoutProperties2.default)(_ref, _excluded);
      return (0, _core.jsx)(_inlineDialog.default, {
        isOpen: isInvalid,
        content: (0, _core.jsx)("div", {
          id: "error-message"
        }, errorMessage),
        placement: "right"
      }, (0, _core.jsx)(_textfield.default, (0, _extends2.default)({}, props, {
        elemAfterInput: isInvalid && (0, _core.jsx)("div", {
          css: errorIconContainerStyles
        }, (0, _core.jsx)(_error.default, {
          label: "error",
          primaryColor: "var(--ds-icon-danger, ".concat(_colors.R400, ")")
        })),
        testId: testId,
        isCompact: isCompact,
        autoFocus: true
      })));
    },
    readView: function readView() {
      return (0, _core.jsx)("div", {
        css: [readViewForTextFieldStyles, isCompact && compactStyles],
        "data-compact": isCompact,
        "data-testid": testId && "read-view-".concat(testId)
      }, defaultValue || placeholder);
    }
  }));
};

var _default = InlineEditableTextfield;
exports.default = _default;