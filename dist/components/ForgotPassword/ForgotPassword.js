"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _axios = _interopRequireDefault(require("axios"));
require("./ForgotPassword.scss");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
// Ensure this path is correct and SCSS is well-structured

function ForgotPassword() {
  const [email, setEmail] = (0, _react.useState)('');
  const [message, setMessage] = (0, _react.useState)('');
  const [error, setError] = (0, _react.useState)('');
  const [isLoading, setIsLoading] = (0, _react.useState)(false);
  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    setMessage('');
    setIsLoading(true);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address.');
      setIsLoading(false);
      return;
    }
    try {
      const response = await _axios.default.get(`https://blog.tourismofkashmir.com/forget_password_reset_api.php`, {
        params: {
          email
        }
      });
      setMessage(response.data.message);
    } catch (error) {
      setError('Error sending email. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };
  return /*#__PURE__*/_react.default.createElement("div", {
    className: "forgot-password-container"
  }, /*#__PURE__*/_react.default.createElement("h2", null, "Forgot Password"), /*#__PURE__*/_react.default.createElement("form", {
    onSubmit: handleSubmit,
    className: "forgot-password-form",
    noValidate: true
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/_react.default.createElement("label", {
    htmlFor: "email"
  }, "Email:"), /*#__PURE__*/_react.default.createElement("input", {
    id: "email",
    type: "email",
    value: email,
    onChange: e => setEmail(e.target.value),
    disabled: isLoading,
    "aria-describedby": "emailHelp",
    className: "form-control"
  }), /*#__PURE__*/_react.default.createElement("small", {
    id: "emailHelp",
    className: "form-text text-muted"
  }, "We'll never share your email with anyone else.")), isLoading ? /*#__PURE__*/_react.default.createElement("div", {
    className: "forgetpage_loader"
  }) : /*#__PURE__*/_react.default.createElement("button", {
    type: "submit",
    className: "btn btn-primary"
  }, "Reset Password")), error && /*#__PURE__*/_react.default.createElement("div", {
    className: "alert alert-danger",
    role: "alert"
  }, error), message && /*#__PURE__*/_react.default.createElement("div", {
    className: "alert alert-success",
    role: "alert"
  }, message));
}
var _default = exports.default = ForgotPassword;