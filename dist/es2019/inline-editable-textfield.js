import _extends from "@babel/runtime/helpers/extends";

/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import ErrorIcon from '@atlaskit/icon/glyph/error';
import InlineDialog from '@atlaskit/inline-dialog';
import Textfield from '@atlaskit/textfield';
import { R400 } from '@atlaskit/theme/colors';
import InlineEdit from './inline-edit';
import { fontSize, gridSize } from './internal/constants';
const errorIconContainerStyles = css({
  paddingRight: gridSize - 2,
  lineHeight: '100%'
});
const readViewForTextFieldStyles = css({
  display: 'flex',
  maxWidth: '100%',
  minHeight: `${gridSize * 2.5 / fontSize}em`,
  padding: `${gridSize}px ${gridSize - 2}px`,
  fontSize: fontSize,
  lineHeight: gridSize * 2.5 / fontSize,
  wordBreak: 'break-word'
});
const compactStyles = css({
  padding: `${gridSize / 2}px ${gridSize - 2}px`
});

const InlineEditableTextfield = props => {
  const {
    isCompact = false,
    defaultValue,
    placeholder,
    testId
  } = props;
  return jsx(InlineEdit, _extends({}, props, {
    defaultValue: defaultValue,
    editView: ({
      errorMessage,
      isInvalid,
      ...props
    }) => jsx(InlineDialog, {
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
        primaryColor: `var(--ds-icon-danger, ${R400})`
      })),
      testId: testId,
      isCompact: isCompact,
      autoFocus: true
    }))),
    readView: () => jsx("div", {
      css: [readViewForTextFieldStyles, isCompact && compactStyles],
      "data-compact": isCompact,
      "data-testid": testId && `read-view-${testId}`
    }, defaultValue || placeholder)
  }));
};

export default InlineEditableTextfield;