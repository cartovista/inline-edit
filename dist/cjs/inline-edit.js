"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _react = _interopRequireWildcard(require("react"));

var _core = require("@emotion/core");

var _analyticsNext = require("@atlaskit/analytics-next");

var _Field = _interopRequireDefault(require("@atlaskit/form/Field"));

var _Form = _interopRequireDefault(require("@atlaskit/form/Form"));

var _components = _interopRequireDefault(require("@atlaskit/theme/components"));

var _buttons = _interopRequireDefault(require("./internal/buttons"));

var _useButtonFocusHook2 = _interopRequireDefault(require("./internal/hooks/use-button-focus-hook"));

var _readView = _interopRequireDefault(require("./internal/read-view"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

var fieldStyles = (0, _core.css)({
  maxWidth: '100%',
  position: 'relative'
});
var buttonStyles = (0, _core.css)({
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
  var wasFocusReceivedSinceLastBlurRef = (0, _react.useRef)(false);
  var isControlled = typeof isEditing === 'undefined';

  var _useState = (0, _react.useState)(startWithEditViewOpen),
      _useState2 = (0, _slicedToArray2.default)(_useState, 2),
      isEditingState = _useState2[0],
      setEditingState = _useState2[1];

  var timerRef = (0, _react.useRef)();

  var _useButtonFocusHook = (0, _useButtonFocusHook2.default)(isEditing, isEditingState),
      editButtonRef = _useButtonFocusHook.editButtonRef,
      editViewRef = _useButtonFocusHook.editViewRef,
      shouldBeEditing = _useButtonFocusHook.shouldBeEditing,
      doNotFocusOnEditButton = _useButtonFocusHook.doNotFocusOnEditButton;

  var onCancel = (0, _react.useCallback)(function () {
    if (isControlled) {
      setEditingState(false);
    }

    providedOnCancel();
  }, [isControlled, providedOnCancel]);
  var onEditRequested = (0, _react.useCallback)(function () {
    if (isControlled) {
      setEditingState(true);
    }

    providedOnEdit();

    if (shouldBeEditing && editViewRef.current) {
      editViewRef.current.focus();
    }
  }, [isControlled, shouldBeEditing, editViewRef, providedOnEdit]);
  var onConfirm = (0, _analyticsNext.usePlatformLeafEventHandler)(_objectSpread({
    fn: function fn(value, analyticsEvent) {
      if (isControlled) {
        setEditingState(false);
      }

      providedOnConfirm(value, analyticsEvent);
    },
    action: 'confirmed',
    analyticsData: analyticsContext
  }, analyticsAttributes));
  var onCancelClick = (0, _react.useCallback)(function (event) {
    event.preventDefault();
    onCancel();
  }, [onCancel]);
  var tryAutoSubmitWhenBlur = (0, _react.useCallback)(function (isFieldInvalid, onSubmit, formRef) {
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

  var onEditViewWrapperBlur = (0, _react.useCallback)(function (isFieldInvalid, onSubmit, formRef) {
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

  var onEditViewWrapperFocus = (0, _react.useCallback)(function () {
    wasFocusReceivedSinceLastBlurRef.current = true;
  }, []);

  var renderReadView = function renderReadView() {
    return (0, _core.jsx)(_readView.default, {
      editButtonLabel: editButtonLabel,
      onEditRequested: onEditRequested,
      postReadViewClick: doNotFocusOnEditButton,
      editButtonRef: editButtonRef,
      readViewFitContainerWidth: readViewFitContainerWidth,
      readView: readView
    });
  };
  /* eslint-disable jsx-a11y/no-noninteractive-element-interactions */


  return (0, _core.jsx)(_Form.default, {
    onSubmit: function onSubmit(data) {
      return onConfirm(data.inlineEdit);
    }
  }, function (_ref) {
    var _ref$formProps = _ref.formProps,
        _onKeyDown = _ref$formProps.onKeyDown,
        onSubmit = _ref$formProps.onSubmit,
        formRef = _ref$formProps.ref;
    return (0, _core.jsx)("form", {
      onKeyDown: function onKeyDown(e) {
        _onKeyDown(e);

        if (e.key === 'Esc' || e.key === 'Escape') {
          onCancel();
        }
      },
      onSubmit: onSubmit,
      ref: formRef
    }, shouldBeEditing ? (0, _core.jsx)(_Field.default, {
      name: "inlineEdit",
      label: label,
      defaultValue: defaultValue,
      validate: validate,
      isRequired: isRequired,
      key: "edit-view" // used for reset to default value

    }, function (_ref2) {
      var fieldProps = _ref2.fieldProps,
          error = _ref2.error;
      return (0, _core.jsx)("div", {
        css: fieldStyles,
        onBlur: function onBlur() {
          onEditViewWrapperBlur(fieldProps.isInvalid, onSubmit, formRef);
        },
        onFocus: onEditViewWrapperFocus
      }, editView(_objectSpread(_objectSpread({}, fieldProps), {}, {
        errorMessage: error
      }), editViewRef), !hideActionButtons ? (0, _core.jsx)(_buttons.default, {
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
      (0, _core.jsx)("button", {
        css: buttonStyles,
        type: "submit"
      }));
    }) :
    /** Field is used here only for the label */
    (0, _core.jsx)(_Field.default, {
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
  return (0, _core.jsx)(_components.default.Consumer, null, function (tokens) {
    var mode = tokens.mode;
    return (0, _core.jsx)(InnerInlineEdit, (0, _extends2.default)({}, props, {
      mode: mode
    }));
  });
};

var _default = InlineEdit;
exports.default = _default;