/** @jsx jsx */
import React, { useRef } from 'react';
import { css, jsx } from '@emotion/core';
import { B100, N30 } from '@atlaskit/theme/colors';
import { borderRadius } from './constants';
const readViewContainerStyles = css({
  lineHeight: 1
});
const editButtonStyles = css({
  display: 'block',
  margin: '0',
  padding: '0',
  appearance: 'none',
  background: 'transparent',
  border: 0,
  lineHeight: 1,
  outline: '0',
  '&:focus + div': {
    border: `2px solid ${`var(--ds-border-focused, ${B100})`}`
  }
});
const readViewWrapperStyles = css({
  display: 'inline-block',
  boxSizing: 'border-box',
  width: 'auto',
  maxWidth: '100%',
  border: '2px solid transparent',
  borderRadius: borderRadius,
  transition: 'background 0.2s',
  '&:hover': {
    background: `var(--ds-background-neutral-subtle-hovered, ${N30})`
  }
});
const readViewFitContainerWidthStyles = css({
  width: '100%'
});
const DRAG_THRESHOLD = 5;

const ReadView = ({
  editButtonLabel,
  onEditRequested,
  postReadViewClick,
  editButtonRef,
  readViewFitContainerWidth,
  readView
}) => {
  const startX = useRef(0);
  const startY = useRef(0);

  const mouseHasMovedAfterMouseDown = event => {
    return Math.abs(startX.current - event.clientX) >= DRAG_THRESHOLD || Math.abs(startY.current - event.clientY) >= DRAG_THRESHOLD;
  };

  const onReadViewClick = event => {
    const element = event.target;
    /** If a link is clicked in the read view, default action should be taken */

    if (element.tagName.toLowerCase() !== 'a' && !mouseHasMovedAfterMouseDown(event)) {
      event.preventDefault();
      onEditRequested();
      postReadViewClick();
    }
  };
  /* eslint-disable jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions,jsx-a11y/no-noninteractive-element-interactions */


  return jsx("div", {
    css: readViewContainerStyles
  }, jsx("button", {
    css: editButtonStyles,
    "aria-label": editButtonLabel,
    type: "button",
    onClick: onEditRequested,
    ref: editButtonRef
  }), jsx("div", {
    css: [readViewWrapperStyles, readViewFitContainerWidth && readViewFitContainerWidthStyles],
    onClick: onReadViewClick,
    onMouseDown: e => {
      startX.current = e.clientX;
      startY.current = e.clientY;
    },
    "data-read-view-fit-container-width": readViewFitContainerWidth
  }, readView()));
  /* eslint-enable jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions,jsx-a11y/no-noninteractive-element-interactions */
};

export default ReadView;