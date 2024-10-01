"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactRouterDom = require("react-router-dom");
require("./footer.css");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
// Import Link component
// Importing the CSS for styling

const Footer = () => {
  return /*#__PURE__*/_react.default.createElement("footer", {
    className: "site-footer"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "footer-content"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "footer-logo"
  }, /*#__PURE__*/_react.default.createElement(_reactRouterDom.Link, {
    to: "/",
    className: "logo-link"
  }, /*#__PURE__*/_react.default.createElement("h1", null, "NewsSite"))), /*#__PURE__*/_react.default.createElement("div", {
    className: "footer-description"
  }, /*#__PURE__*/_react.default.createElement("p", null, "A leading source for breaking news, analysis, and insights.")), /*#__PURE__*/_react.default.createElement("div", {
    className: "footer-links"
  }, /*#__PURE__*/_react.default.createElement("h2", null, "Quick Links"), /*#__PURE__*/_react.default.createElement("ul", null, /*#__PURE__*/_react.default.createElement("li", null, /*#__PURE__*/_react.default.createElement(_reactRouterDom.Link, {
    to: "/"
  }, "Home")), /*#__PURE__*/_react.default.createElement("li", null, /*#__PURE__*/_react.default.createElement(_reactRouterDom.Link, {
    to: "/about"
  }, "About Us")), /*#__PURE__*/_react.default.createElement("li", null, /*#__PURE__*/_react.default.createElement(_reactRouterDom.Link, {
    to: "/contact"
  }, "Contact")), /*#__PURE__*/_react.default.createElement("li", null, /*#__PURE__*/_react.default.createElement(_reactRouterDom.Link, {
    to: "/terms"
  }, "Terms of Service")), /*#__PURE__*/_react.default.createElement("li", null, /*#__PURE__*/_react.default.createElement(_reactRouterDom.Link, {
    to: "/privacy"
  }, "Privacy Policy"))))), /*#__PURE__*/_react.default.createElement("div", {
    className: "copyright"
  }, /*#__PURE__*/_react.default.createElement("p", null, "\xA9 ", new Date().getFullYear(), " NewsSite. All rights reserved.")));
};
var _default = exports.default = Footer;