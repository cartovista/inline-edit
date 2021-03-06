import { useEffect, useRef } from 'react';

var usePrevious = function usePrevious(value) {
  var ref = useRef();
  useEffect(function () {
    ref.current = value;
  }, [value]);
  return ref.current;
};

var useButtonFocusHook = function useButtonFocusHook(isEditing, isEditingState) {
  var editButtonRef = useRef(null);
  var editViewRef = useRef();
  var preventFocusOnEditButtonRef = useRef(false);
  var isControlled = typeof isEditing === 'undefined';
  var shouldBeEditing = isControlled ? isEditingState : isEditing;
  var prevIsEditing = usePrevious(shouldBeEditing);
  useEffect(function () {
    if (isEditingState && editViewRef.current) {
      editViewRef.current.focus();
    }
  }, [editViewRef, isEditingState]);
  useEffect(function () {
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

export default useButtonFocusHook;