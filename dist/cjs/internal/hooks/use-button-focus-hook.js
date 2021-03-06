"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = require("react");

var usePrevious = function usePrevious(value) {
  var ref = (0, _react.useRef)();
  (0, _react.useEffect)(function () {
    ref.current = value;
  }, [value]);
  return ref.current;
};

var useButtonFocusHook = function useButtonFocusHook(isEditing, isEditingState) {
  var editButtonRef = (0, _react.useRef)(null);
  var editViewRef = (0, _react.useRef)();
  var preventFocusOnEditButtonRef = (0, _react.useRef)(false);
  var isControlled = typeof isEditing === 'undefined';
  var shouldBeEditing = isControlled ? isEditingState : isEditing;
  var prevIsEditing = usePrevious(shouldBeEditing);
  (0, _react.useEffect)(function () {
    if (isEditingState && editViewRef.current) {
      editViewRef.current.focus();
    }
  }, [editViewRef, isEditingState]);
  (0, _react.useEffect)(function () {
    /**
     * This logic puts the focus on the edit button after confirming using
     * the confirm button or using the keyboard to confirm, but not when
     * it is confirmed by wrapper blur
     */
    if (prevIsEditing && !shouldBeEditing) {
      if (preventFocusOnEditButtonRef && preventFocusOnEditButtonRef.current) {
        preventFocusOnEditButtonRef.current = false;
      } else if (editButtonRef && editButtonRef.current) {
        // @ts-ignore
        editButtonRef.current.focus();
      }
    }
  }, [prevIsEditing, shouldBeEditing]);

  var doNotFocusOnEditButton = function doNotFocusOnEditButton() {
    return preventFocusOnEditButtonRef.current = true;
  };

  return {
    editButtonRef: editButtonRef,
    editViewRef: editViewRef,
    shouldBeEditing: shouldBeEditing,
    doNotFocusOnEditButton: doNotFocusOnEditButton
  };
};

var _default = useButtonFocusHook;
exports.default = _default;