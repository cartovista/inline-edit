import { useEffect, useRef } from 'react';

const usePrevious = value => {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  }, [value]);
  return ref.current;
};

const useButtonFocusHook = (isEditing, isEditingState) => {
  const editButtonRef = useRef(null);
  const editViewRef = useRef();
  const preventFocusOnEditButtonRef = useRef(false);
  const isControlled = typeof isEditing === 'undefined';
  const shouldBeEditing = isControlled ? isEditingState : isEditing;
  const prevIsEditing = usePrevious(shouldBeEditing);
  useEffect(() => {
    if (isEditingState && editViewRef.current) {
      editViewRef.current.focus();
    }
  }, [editViewRef, isEditingState]);
  useEffect(() => {
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

  const doNotFocusOnEditButton = () => preventFocusOnEditButtonRef.current = true;

  return {
    editButtonRef,
    editViewRef,
    shouldBeEditing,
    doNotFocusOnEditButton
  };
};

export default useButtonFocusHook;