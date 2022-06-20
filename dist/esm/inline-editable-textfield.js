import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
var _excluded = ["errorMessage", "isInvalid"];

/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import ErrorIcon from '@atlaskit/icon/glyph/error';
import InlineDialog from '@atlaskit/inline-dialog';
import Textfield from '@atlaskit/textfield';
import { R400 } from '@atlaskit/theme/colors';
import InlineEdit from './inline-edit';
import { fontSize, gridSize } from './internal/constants';
var errorIconContainerStyles = css({
  paddingRight: gridSize - 2,
  lineHeight: '100%'
});
var readViewForTextFieldStyles = css({
  display: 'flex',
  maxWidth: '100%',
  minHeight: "".concat(gridSize * 2.5 / fontSize, "em"),
  padding: "".concat(gridSize, "px ").concat(gridSize - 2, "px"),
  fontSize: fontSize,
  lineHeight: gridSize * 2.5 / fontSize,
  wordBreak: 'break-word'
});
var compactStyles = css({
  padding: "".concat(gridSize / 2, "px ").concat(gridSize - 2, "px")
});

var InlineEditableTextfield = function InlineEditableTextfield(props) {
  var _props$isCompact = props.isCompact,
      isCompact = _props$isCompact === void 0 ? false : _props$isCompact,
      defaultValue = props.defaultValue,
      placeholder = props.placeholder,
      testId = props.testId;
  return jsx(InlineEdit, _extends({}, props, {
    defaultValue: defaultValue,
    editView: function editView(_ref) {
      var errorMessage = _ref.errorMessage,
          isInvalid = _ref.isInvalid,
          props = _objectWithoutProperties(_ref, _excluded);

      return jsx(InlineDialog, {
        isOpen: isInvalid,
        content: jsx("div", {
          id: "error-message"
        }, errorMessage),
        placement: "right"
      }, jsx(Textfield, _extends({}, props, {
        elemAfterInput: isInvalid && jsx("div", {
          css: errorIconContainerStyles
        }, jsx(ErrorIcon, {
          label: "error",
          primaryColor: "var(--ds-icon-danger, ".concat(R400, ")")
        })),
        testId: testId,
        isCompact: isCompact,
        autoFocus: true
      })));
    },
    readView: function readView() {
      return jsx("div", {
        css: [readViewForTextFieldStyles, isCompact && compactStyles],
        "data-compact": isCompact,
        "data-testid": testId && "read-view-".concat(testId)
      }, defaultValue || placeholder);
    }
  }));
};

export default InlineEditableTextfield;