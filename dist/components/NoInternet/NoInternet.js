"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
require("./NoInternet.css");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
// src/components/NoInternet/NoInternet.js

const NoInternet = () => {
  return /*#__PURE__*/_react.default.createElement("div", {
    className: "no-internet-container"
  }, /*#__PURE__*/_react.default.createElement("h1", {
    className: "no-internet-title"
  }, "No Internet Connection"), /*#__PURE__*/_react.default.createElement("p", {
    className: "no-internet-text"
  }, "Please check your internet connection and try again."));
};
var _default = exports.default = NoInternet;