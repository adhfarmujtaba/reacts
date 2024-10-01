"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactRouterDom = require("react-router-dom");
var _axios = _interopRequireDefault(require("axios"));
var _reactToastify = require("react-toastify");
require("react-toastify/dist/ReactToastify.css");
require("./LoginPage.scss");
var _framerMotion = require("framer-motion");
var _fa = require("react-icons/fa");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
// Import Link here

const LoginPage = () => {
  const [username, setUsername] = (0, _react.useState)('');
  const [password, setPassword] = (0, _react.useState)('');
  const [isLoading, setIsLoading] = (0, _react.useState)(false);
  const navigate = (0, _reactRouterDom.useNavigate)();
  const formVariants = {
    hidden: {
      opacity: 0,
      y: 50
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.3,
        duration: 0.6
      }
    },
    exit: {
      opacity: 0,
      y: -50,
      transition: {
        duration: 0.3
      }
    }
  };
  const handleLogin = async e => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await _axios.default.post('http://blog.tourismofkashmir.com/apilogin.php', {
        username,
        password
      });
      if (response.data && response.data.user) {
        localStorage.setItem('user', JSON.stringify(response.data.user));
        _reactToastify.toast.success(`Login successful! Welcome ${response.data.user.name}!`, {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true
        });
        setTimeout(() => navigate('/'), 2000);
      } else {
        _reactToastify.toast.error('Login failed. Please check your credentials.');
      }
    } catch (error) {
      console.error('Error during login:', error);
      _reactToastify.toast.error('An error occurred during login. Please try again later.');
    }
    setIsLoading(false);
  };
  return /*#__PURE__*/_react.default.createElement("div", {
    className: "login-page",
    style: {
      backgroundImage: "url(https://blog.tourismofkashmir.com/login_png/login.png)"
    }
  }, /*#__PURE__*/_react.default.createElement("div", {
    onClick: () => navigate(-1)
  }, /*#__PURE__*/_react.default.createElement(_fa.FaArrowLeft, {
    className: "back-arrow"
  })), /*#__PURE__*/_react.default.createElement(_framerMotion.motion.form, {
    className: "login-form",
    onSubmit: handleLogin,
    variants: formVariants,
    initial: "hidden",
    animate: "visible",
    exit: "exit"
  }, /*#__PURE__*/_react.default.createElement("h2", null, "Welcome Back"), /*#__PURE__*/_react.default.createElement("div", {
    className: "input-wrapper"
  }, /*#__PURE__*/_react.default.createElement(_fa.FaUser, null), /*#__PURE__*/_react.default.createElement("input", {
    type: "text",
    placeholder: "Username",
    value: username,
    onChange: e => setUsername(e.target.value),
    required: true,
    autoFocus: true
  })), /*#__PURE__*/_react.default.createElement("div", {
    className: "input-wrapper"
  }, /*#__PURE__*/_react.default.createElement(_fa.FaLock, null), /*#__PURE__*/_react.default.createElement("input", {
    type: "password",
    placeholder: "Password",
    value: password,
    onChange: e => setPassword(e.target.value),
    required: true
  })), /*#__PURE__*/_react.default.createElement(_framerMotion.motion.button, {
    whileHover: {
      scale: 1.05
    },
    whileTap: {
      scale: 0.95
    },
    type: "submit",
    disabled: isLoading,
    className: "login-button"
  }, isLoading ? /*#__PURE__*/_react.default.createElement(_fa.FaSignInAlt, {
    className: "loading-icon"
  }) : 'Login'), /*#__PURE__*/_react.default.createElement("div", {
    className: "login-help"
  }, /*#__PURE__*/_react.default.createElement("p", null, "Don't have an account? ", /*#__PURE__*/_react.default.createElement(_reactRouterDom.Link, {
    to: "/register"
  }, "Register")), /*#__PURE__*/_react.default.createElement("p", null, "Need help? ", /*#__PURE__*/_react.default.createElement(_reactRouterDom.Link, {
    to: "/forget_password"
  }, "Get help")))));
};
var _default = exports.default = LoginPage;