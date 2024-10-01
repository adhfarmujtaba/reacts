"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactFontawesome = require("@fortawesome/react-fontawesome");
var _freeSolidSvgIcons = require("@fortawesome/free-solid-svg-icons");
var _dateFns = require("date-fns");
var _reactRouterDom = require("react-router-dom");
require("./NotificationDropdown.css");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
// For date formatting

const NotificationDropdown = _ref => {
  let {
    notifications,
    onDelete,
    onClose
  } = _ref;
  const handleNotificationClick = () => {
    onClose();
  };
  return /*#__PURE__*/_react.default.createElement("div", {
    id: "notificationDropdown",
    className: "notification-dropdown open"
  }, /*#__PURE__*/_react.default.createElement("ul", {
    className: "notification-list"
  }, notifications.length > 0 ? notifications.map(notification => /*#__PURE__*/_react.default.createElement("li", {
    key: notification.id,
    className: `notification-item ${notification.is_read ? '' : 'unread'}`
  }, /*#__PURE__*/_react.default.createElement(_reactRouterDom.Link, {
    to: notification.url,
    className: "notification-link",
    onClick: e => {
      e.stopPropagation();
      handleNotificationClick();
    }
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "notification-info"
  }, notification.fromUsername && /*#__PURE__*/_react.default.createElement("div", {
    className: "notification-user"
  }, /*#__PURE__*/_react.default.createElement("img", {
    src: notification.fromAvatar,
    alt: "User Avatar",
    className: "notification-avatar"
  }), /*#__PURE__*/_react.default.createElement("span", {
    className: "notification-username"
  }, notification.fromUsername)), /*#__PURE__*/_react.default.createElement("span", {
    className: "notification-message"
  }, notification.message), /*#__PURE__*/_react.default.createElement("span", {
    className: "notification-date"
  }, (0, _dateFns.formatDistanceToNow)(new Date(notification.created_at), {
    addSuffix: true
  })))), /*#__PURE__*/_react.default.createElement(_reactFontawesome.FontAwesomeIcon, {
    icon: _freeSolidSvgIcons.faXmark,
    className: "notification-close",
    onClick: e => {
      e.stopPropagation(); // Prevent navigation
      onDelete(notification.id); // Assuming you pass an onDelete function to handle this
    }
  }))) : /*#__PURE__*/_react.default.createElement("li", null, "No notifications")));
};
var _default = exports.default = NotificationDropdown;