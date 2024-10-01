"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const Loader = () => {
  return /*#__PURE__*/_react.default.createElement("div", {
    className: "skeleton-container"
  }, Array.from({
    length: 10
  }).map((_, index) => /*#__PURE__*/_react.default.createElement("div", {
    key: index,
    className: "card skeleton-card"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "skeleton-image"
  }), /*#__PURE__*/_react.default.createElement("div", {
    className: "card-content"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "skeleton-title"
  }), /*#__PURE__*/_react.default.createElement("div", {
    className: "skeleton-content"
  }), /*#__PURE__*/_react.default.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center'
    }
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "skeleton-avatar"
  }), " ", /*#__PURE__*/_react.default.createElement("div", {
    className: "skeleton-username"
  }), /*#__PURE__*/_react.default.createElement("div", {
    className: "skeleton-date"
  }), " ")))));
};
var _default = exports.default = Loader;