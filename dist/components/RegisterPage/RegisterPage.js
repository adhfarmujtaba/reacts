"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactRouterDom = require("react-router-dom");
var _axios = _interopRequireDefault(require("axios"));
var _reactToastify = require("react-toastify");
var _fa = require("react-icons/fa");
var _framerMotion = require("framer-motion");
require("./RegisterPage.scss");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
// Import FaArrowLeft for back arrow

const RegisterPage = () => {
  const [formData, setFormData] = (0, _react.useState)({
    username: '',
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const navigate = (0, _reactRouterDom.useNavigate)();
  const handleChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  const handleSubmit = async e => {
    e.preventDefault();
    const {
      username,
      name,
      email,
      password,
      confirmPassword
    } = formData;
    if (password !== confirmPassword) {
      _reactToastify.toast.error("Passwords do not match");
      return;
    }
    try {
      // Construct URL with parameters
      const url = `https://blog.tourismofkashmir.com/api_register.php?username=${encodeURIComponent(username)}&name=${encodeURIComponent(name)}&email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`;

      // Make a PUT request to update the user details
      const response = await _axios.default.put(url);
      if (response.data && response.data.message === "Username or email already exists.") {
        _reactToastify.toast.error("Username or email already exists.");
      } else {
        _reactToastify.toast.success("Registration successful", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true
        });
        navigate('/login');
      }
    } catch (error) {
      console.error("Registration error", error);
      _reactToastify.toast.error("An error occurred during registration");
    }
  };
  return /*#__PURE__*/_react.default.createElement("div", {
    className: "register-page",
    style: {
      backgroundImage: "url(https://blog.tourismofkashmir.com/register.png)"
    }
  }, /*#__PURE__*/_react.default.createElement(_reactRouterDom.Link, {
    to: "/"
  }, /*#__PURE__*/_react.default.createElement(_fa.FaArrowLeft, {
    className: "back-arrow"
  })), /*#__PURE__*/_react.default.createElement(_framerMotion.motion.form, {
    className: "register-form",
    onSubmit: handleSubmit,
    initial: {
      opacity: 0,
      y: 50
    },
    animate: {
      opacity: 1,
      y: 0
    },
    transition: {
      duration: 0.5
    }
  }, /*#__PURE__*/_react.default.createElement("h2", null, "Create Account"), /*#__PURE__*/_react.default.createElement(_framerMotion.motion.div, {
    className: "input-wrapper",
    initial: {
      opacity: 0,
      x: -50
    },
    animate: {
      opacity: 1,
      x: 0
    },
    transition: {
      delay: 0.1,
      duration: 0.5
    }
  }, /*#__PURE__*/_react.default.createElement(_fa.FaUser, null), /*#__PURE__*/_react.default.createElement("input", {
    type: "text",
    placeholder: "Username",
    name: "username",
    value: formData.username,
    onChange: handleChange,
    required: true
  })), /*#__PURE__*/_react.default.createElement(_framerMotion.motion.div, {
    className: "input-wrapper",
    initial: {
      opacity: 0,
      x: -50
    },
    animate: {
      opacity: 1,
      x: 0
    },
    transition: {
      delay: 0.2,
      duration: 0.5
    }
  }, /*#__PURE__*/_react.default.createElement(_fa.FaUser, null), /*#__PURE__*/_react.default.createElement("input", {
    type: "text",
    placeholder: "Full Name",
    name: "name",
    value: formData.name,
    onChange: handleChange,
    required: true
  })), /*#__PURE__*/_react.default.createElement(_framerMotion.motion.div, {
    className: "input-wrapper",
    initial: {
      opacity: 0,
      x: -50
    },
    animate: {
      opacity: 1,
      x: 0
    },
    transition: {
      delay: 0.3,
      duration: 0.5
    }
  }, /*#__PURE__*/_react.default.createElement(_fa.FaEnvelope, null), /*#__PURE__*/_react.default.createElement("input", {
    type: "email",
    placeholder: "Email",
    name: "email",
    value: formData.email,
    onChange: handleChange,
    required: true
  })), /*#__PURE__*/_react.default.createElement(_framerMotion.motion.div, {
    className: "input-wrapper",
    initial: {
      opacity: 0,
      x: -50
    },
    animate: {
      opacity: 1,
      x: 0
    },
    transition: {
      delay: 0.4,
      duration: 0.5
    }
  }, /*#__PURE__*/_react.default.createElement(_fa.FaLock, null), /*#__PURE__*/_react.default.createElement("input", {
    type: "password",
    placeholder: "Password",
    name: "password",
    value: formData.password,
    onChange: handleChange,
    required: true
  })), /*#__PURE__*/_react.default.createElement(_framerMotion.motion.div, {
    className: "input-wrapper",
    initial: {
      opacity: 0,
      x: -50
    },
    animate: {
      opacity: 1,
      x: 0
    },
    transition: {
      delay: 0.5,
      duration: 0.5
    }
  }, /*#__PURE__*/_react.default.createElement(_fa.FaLock, null), /*#__PURE__*/_react.default.createElement("input", {
    type: "password",
    placeholder: "Confirm Password",
    name: "confirmPassword",
    value: formData.confirmPassword,
    onChange: handleChange,
    required: true
  })), /*#__PURE__*/_react.default.createElement(_framerMotion.motion.button, {
    type: "submit",
    id: "register_btn",
    whileHover: {
      scale: 1.05
    },
    whileTap: {
      scale: 0.95
    },
    initial: {
      opacity: 0
    },
    animate: {
      opacity: 1
    },
    transition: {
      delay: 0.6,
      duration: 0.5
    }
  }, "Sign Up"), /*#__PURE__*/_react.default.createElement("p", {
    style: {
      textAlign: "center",
      marginTop: "15px"
    }
  }, "Already have an account? ", /*#__PURE__*/_react.default.createElement(_reactRouterDom.Link, {
    to: "/login",
    className: "link"
  }, "Login"))));
};
var _default = exports.default = RegisterPage;