"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactRouterDom = require("react-router-dom");
var _axios = _interopRequireDefault(require("axios"));
var _reactFontawesome = require("@fortawesome/react-fontawesome");
var _freeSolidSvgIcons = require("@fortawesome/free-solid-svg-icons");
require("./ResetPassword.scss");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
// Import the CSS file

function ResetPassword() {
  const [token, setToken] = (0, _react.useState)('');
  const [password, setPassword] = (0, _react.useState)('');
  const [confirmPassword, setConfirmPassword] = (0, _react.useState)('');
  const [message, setMessage] = (0, _react.useState)('');
  const [passwordsMatch, setPasswordsMatch] = (0, _react.useState)(true);
  (0, _react.useEffect)(() => {
    // Extract token from URL parameter
    const urlParams = new URLSearchParams(window.location.search);
    const tokenFromUrl = urlParams.get('token');
    if (tokenFromUrl) {
      setToken(tokenFromUrl);
    }
  }, []);
  const handleSubmit = async e => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Passwords don't match.");
      setPasswordsMatch(false);
      return;
    }
    try {
      const response = await _axios.default.get(`https://blog.tourismofkashmir.com/reset_password_api.php?token=${token}&password=${password}`);
      setMessage(response.data.message);
    } catch (error) {
      setMessage('Error resetting password. Please try again later.');
    }
  };
  return /*#__PURE__*/_react.default.createElement("div", {
    className: "reset-password-container"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "go-home"
  }, /*#__PURE__*/_react.default.createElement(_reactRouterDom.Link, {
    to: "/",
    id: "link-gohome"
  }, /*#__PURE__*/_react.default.createElement(_reactFontawesome.FontAwesomeIcon, {
    icon: _freeSolidSvgIcons.faArrowLeft
  }), /*#__PURE__*/_react.default.createElement("span", null, "Go Home"))), /*#__PURE__*/_react.default.createElement("h2", null, "Reset Password"), /*#__PURE__*/_react.default.createElement("form", {
    onSubmit: handleSubmit
  }, /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("label", null, "Token:"), /*#__PURE__*/_react.default.createElement("input", {
    type: "text",
    value: token,
    onChange: e => setToken(e.target.value),
    readOnly: true
  })), /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("label", null, "New Password:"), /*#__PURE__*/_react.default.createElement("input", {
    type: "password",
    value: password,
    onChange: e => setPassword(e.target.value)
  })), /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("label", null, "Confirm Password:"), /*#__PURE__*/_react.default.createElement("input", {
    type: "password",
    value: confirmPassword,
    onChange: e => setConfirmPassword(e.target.value)
  })), !passwordsMatch && /*#__PURE__*/_react.default.createElement("p", {
    className: "error-message"
  }, "Passwords don't match."), /*#__PURE__*/_react.default.createElement("button", {
    type: "submit"
  }, "Reset Password")), message && /*#__PURE__*/_react.default.createElement("p", null, message));
}
var _default = exports.default = ResetPassword;