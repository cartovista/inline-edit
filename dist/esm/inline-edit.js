import _extends from "@babel/runtime/helpers/extends";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
import _slicedToArray from "@babel/runtime/helpers/slicedToArray";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

/** @jsx jsx */
import React, { useCallback, useRef, useState } from 'react';
import { css, jsx } from '@emotion/core';
import { usePlatformLeafEventHandler } from '@atlaskit/analytics-next';
import Field from '@atlaskit/form/Field';
import Form from '@atlaskit/form/Form';
import GlobalTheme from '@atlaskit/theme/components';
import Buttons from './internal/buttons';
import useButtonFocusHook from './internal/hooks/use-button-focus-hook';
import ReadView from './internal/read-view';
var fieldStyles = css({
  maxWidth: '100%',
  position: 'relative'
});
var buttonStyles = css({
  display: 'none'
});
var analyticsAttributes = {
  componentName: 'inlineEdit',
  packageName: "@atlaskit/inline-edit",
  packageVersion: "12.1.10"
};

var noop = function noop() {};

var InnerInlineEdit = function InnerInlineEdit(props) {
  var _props$startWithEditV = props.startWithEditViewOpen,
      startWithEditViewOpen = _props$startWithEditV === void 0 ? false : _props$startWithEditV,
      _props$keepEditViewOp = props.keepEditViewOpenOnBlur,
      keepEditViewOpenOnBlur = _props$keepEditViewOp === void 0 ? false : _props$keepEditViewOp,
      _props$hideActionButt = props.hideActionButtons,
      hideActionButtons = _props$hideActionButt === void 0 ? false : _props$hideActionButt,
      _props$isRequired = props.isRequired,
      isRequired = _props$isRequired === void 0 ? false : _props$isRequired,
      _props$readViewFitCon = props.readViewFitContainerWidth,
      readViewFitContainerWidth = _props$readViewFitCon === void 0 ? false : _props$readViewFitCon,
      _props$editButtonLabe = props.editButtonLabel,
      editButtonLabel = _props$editButtonLabe === void 0 ? 'Edit' : _props$editButtonLabe,
      _props$confirmButtonL = props.confirmButtonLabel,
      confirmButtonLabel = _props$confirmButtonL === void 0 ? 'Confirm' : _props$confirmButtonL,
      _props$cancelButtonLa = props.cancelButtonLabel,
      cancelButtonLabel = _props$cancelButtonLa === void 0 ? 'Cancel' : _props$cancelButtonLa,
      defaultValue = props.defaultValue,
      isEditing = props.isEditing,
      label = props.label,
      validate = props.validate,
      readView = props.readView,
      editView = props.editView,
      analyticsContext = props.analyticsContext,
      providedOnConfirm = props.onConfirm,
      _props$onCancel = props.onCancel,
      providedOnCancel = _props$onCancel === void 0 ? noop : _props$onCancel,
      _props$onEdit = props.onEdit,
      providedOnEdit = _props$onEdit === void 0 ? noop : _props$onEdit,
      mode = props.mode;
  var wasFocusReceivedSinceLastBlurRef = useRef(false);
  var isControlled = typeof isEditing === 'undefined';

  var _useState = useState(startWithEditViewOpen),
      _useState2 = _slicedToArray(_useState, 2),
      isEditingState = _useState2[0],
      setEditingState = _useState2[1];

  var timerRef = useRef();

  var _useButtonFocusHook = useButtonFocusHook(isEditing, isEditingState),
      editButtonRef = _useButtonFocusHook.editButtonRef,
      editViewRef = _useButtonFocusHook.editViewRef,
      shouldBeEditing = _useButtonFocusHook.shouldBeEditing,
      doNotFocusOnEditButton = _useButtonFocusHook.doNotFocusOnEditButton;

  var onCancel = useCallback(function () {
    if (isControlled) {
      setEditingState(false);
    }

    providedOnCancel();
  }, [isControlled, providedOnCancel]);
  var onEditRequested = useCallback(function () {
    if (isControlled) {
      setEditingState(true);
    }

    providedOnEdit();

    if (shouldBeEditing && editViewRef.current) {
      editViewRef.current.focus();
    }
  }, [isControlled, shouldBeEditing, editViewRef, providedOnEdit]);
  var onConfirm = usePlatformLeafEventHandler(_objectSpread({
    fn: function fn(value, analyticsEvent) {
      if (isControlled) {
        setEditingState(false);
      }

      providedOnConfirm(value, analyticsEvent);
    },
    action: 'confirmed',
    analyticsData: analyticsContext
  }, analyticsAttributes));
  var onCancelClick = useCallback(function (event) {
    event.preventDefault();
    onCancel();
  }, [onCancel]);
  var tryAutoSubmitWhenBlur = useCallback(function (isFieldInvalid, onSubmit, formRef) {
    if (!isFieldInvalid && !wasFocusReceivedSinceLastBlurRef.current && formRef.current) {
      doNotFocusOnEditButton();

      if (formRef.current.checkValidity()) {
        onSubmit();
      }
    }
  }, [doNotFocusOnEditButton]);
  /** If keepEditViewOpenOnBlur prop is set to false, will call confirmIfUnfocused() which
   *  confirms the value, if the focus is not transferred to the action buttons
   *
   *  When you're in `editing` state, the focus will be on the input field. And if you use keyboard
   *  to navigate to `submit` button, this function will be invoked. Then function `onEditViewWrapperFocus`
   *  will be called, the timeout used here is making sure `onEditViewWrapperFocus` is always called before
   *  `autoSubmitWhenBlur`.
   *
   *  There are two paths here the function can be triggered:
   *
   *  - focus on input first, and then use keyboard to `submit`
   *  - focus on input first, and then click anywhere else on the page (outside of edit view wrapper) to `submit` (auto save)
   */

  var onEditViewWrapperBlur = useCallback(function (isFieldInvalid, onSubmit, formRef) {
    if (!keepEditViewOpenOnBlur) {
      wasFocusReceivedSinceLastBlurRef.current = false;
      timerRef.current = setTimeout(function () {
        return tryAutoSubmitWhenBlur(isFieldInvalid, onSubmit, formRef);
      }, 0);
    }
  }, [keepEditViewOpenOnBlur, tryAutoSubmitWhenBlur]);
  /** Gets called when focus is transferred to the editView, or action buttons
   *
   * There are three paths here the function can be called:
   *
   * - when a user click the `editView`
   * - when a user use keyboard to tab into `editView`
   * - when a user use keyboard to tab into `submit` when they were on input field
   */

  var onEditViewWrapperFocus = useCallback(function () {
    wasFocusReceivedSinceLastBlurRef.current = true;
  }, []);

  var renderReadView = function renderReadView() {
    return jsx(ReadView, {
      editButtonLabel: editButtonLabel,
      onEditRequested: onEditRequested,
      postReadViewClick: doNotFocusOnEditButton,
      editButtonRef: editButtonRef,
      readViewFitContainerWidth: readViewFitContainerWidth,
      readView: readView
    });
  };
  /* eslint-disable jsx-a11y/no-noninteractive-element-interactions */


  return jsx(Form, {
    onSubmit: function onSubmit(data) {
      return onConfirm(data.inlineEdit);
    }
  }, function (_ref) {
    var _ref$formProps = _ref.formProps,
        _onKeyDown = _ref$formProps.onKeyDown,
        onSubmit = _ref$formProps.onSubmit,
        formRef = _ref$formProps.ref;
    return jsx("form", {
      onKeyDown: function onKeyDown(e) {
        _onKeyDown(e);

        if (e.key === 'Esc' || e.key === 'Escape') {
          onCancel();
        }
      },
      onSubmit: onSubmit,
      ref: formRef
    }, shouldBeEditing ? jsx(Field, {
      name: "inlineEdit",
      label: label,
      defaultValue: defaultValue,
      validate: validate,
      isRequired: isRequired,
      key: "edit-view" // used for reset to default value

    }, function (_ref2) {
      var fieldProps = _ref2.fieldProps,
          error = _ref2.error;
      return jsx("div", {
        css: fieldStyles,
        onBlur: function onBlur() {
          onEditViewWrapperBlur(fieldProps.isInvalid, onSubmit, formRef);
        },
        onFocus: onEditViewWrapperFocus
      }, editView(_objectSpread(_objectSpread({}, fieldProps), {}, {
        errorMessage: error
      }), editViewRef), !hideActionButtons ? jsx(Buttons, {
        cancelButtonLabel: cancelButtonLabel,
        confirmButtonLabel: confirmButtonLabel,
        onMouseDown: function onMouseDown() {
          /** Prevents focus on edit button only if mouse is used to click button, but not when keyboard is used */
          doNotFocusOnEditButton();
        },
        mode: mode,
        onCancelClick: onCancelClick
      }) :
      /** This is to allow Ctrl + Enter to submit without action buttons */
      jsx("button", {
        css: buttonStyles,
        type: "submit"
      }));
    }) :
    /** Field is used here only for the label */
    jsx(Field, {
      name: "inlineEdit",
      label: label,
      defaultValue: "",
      isRequired: isRequired,
      key: "read-view" // used for reset to default value

    }, renderReadView));
  });
  /* eslint-enable jsx-a11y/no-noninteractive-element-interactions */
};

var InlineEdit = function InlineEdit(props) {
  return jsx(GlobalTheme.Consumer, null, function (tokens) {
    var mode = tokens.mode;
    return jsx(InnerInlineEdit, _extends({}, props, {
      mode: mode
    }));
  });
};

export default InlineEdit;