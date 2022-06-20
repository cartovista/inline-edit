/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import Button from '@atlaskit/button/standard-button';
import ConfirmIcon from '@atlaskit/icon/glyph/check';
import CancelIcon from '@atlaskit/icon/glyph/cross';
import { DN50A, DN60A, N0, N50A, N60A } from '@atlaskit/theme/colors';
import { fontSize, gridSize } from './constants';
const buttonsContainerStyles = css({
  display: 'flex',
  marginTop: gridSize - 2,
  position: 'absolute',
  top: '100%',
  right: 0,
  flexShrink: 0
});
const buttonWrapperElevationDarkStyles = css({
  boxShadow: `var(--ds-shadow-overlay, ${`0 4px 8px -2px ${DN50A}, 0 0 1px ${DN60A}`})`
});
const buttonWrapperElevationLightStyles = css({
  boxShadow: `var(--ds-shadow-overlay, ${`0 4px 8px -2px ${N50A}, 0 0 1px ${N60A}`})`
});
const buttonWrapperBaseStyles = css({
  boxSizing: 'border-box',
  width: gridSize * 4,
  zIndex: 200,
  backgroundColor: `var(--ds-surface-overlay, ${N0})`,
  borderRadius: gridSize / 2 - 1,
  fontSize: fontSize,
  '&:last-child': {
    marginLeft: gridSize / 2
  }
});

const Buttons = ({
  mode,
  confirmButtonLabel,
  cancelButtonLabel,
  onMouseDown,
  onCancelClick
}) => {
  return jsx("div", {
    css: buttonsContainerStyles
  }, jsx("div", {
    css: [buttonWrapperBaseStyles, mode === 'light' ? buttonWrapperElevationLightStyles : buttonWrapperElevationDarkStyles]
  }, jsx(Button, {
    "aria-label": confirmButtonLabel,
    type: "submit",
    iconBefore: jsx(ConfirmIcon, {
      label: confirmButtonLabel,
      size: "small"
    }),
    shouldFitContainer: true,
    onMouseDown: onMouseDown
  })), jsx("div", {
    css: [buttonWrapperBaseStyles, mode === 'light' ? buttonWrapperElevationLightStyles : buttonWrapperElevationDarkStyles]
  }, jsx(Button, {
    "aria-label": cancelButtonLabel,
    iconBefore: jsx(CancelIcon, {
      label: cancelButtonLabel,
      size: "small"
    }),
    onClick: onCancelClick,
    shouldFitContainer: true,
    onMouseDown: onMouseDown
  })));
};

export default Buttons;