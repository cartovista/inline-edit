/// <reference types="react" />
declare const useButtonFocusHook: (isEditing: boolean | undefined, isEditingState: boolean) => {
    editButtonRef: import("react").RefObject<HTMLButtonElement>;
    editViewRef: import("react").MutableRefObject<HTMLElement | undefined>;
    shouldBeEditing: boolean | undefined;
    doNotFocusOnEditButton: () => boolean;
};
export default useButtonFocusHook;
