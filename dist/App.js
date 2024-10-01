"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactRouterDom = require("react-router-dom");
var _NewsList = _interopRequireDefault(require("./components/NewsList/NewsList"));
var _NewsDetail = _interopRequireDefault(require("./components/NewsDetail/NewsDetail"));
var _CategoryList = _interopRequireDefault(require("./components/CategoryList/CategoryList"));
var _Header = _interopRequireDefault(require("./components/Header/Header"));
var _CategoryTags = _interopRequireDefault(require("./components/CategoryTags/CategoryTags"));
var _LoginPage = _interopRequireDefault(require("./components/LoginPage/LoginPage"));
var _RegisterPage = _interopRequireDefault(require("./components/RegisterPage/RegisterPage"));
var _TagDetails = _interopRequireDefault(require("./components/TagDetails/TagDetails"));
var _Bookmark = _interopRequireDefault(require("./components/Bookmark/Bookmark"));
var _ProfilePage = _interopRequireDefault(require("./components/ProfilePage/ProfilePage"));
var _ForgotPassword = _interopRequireDefault(require("./components/ForgotPassword/ForgotPassword"));
var _ResetPassword = _interopRequireDefault(require("./components/ResetPassword/ResetPassword"));
var _NoInternet = _interopRequireDefault(require("./components/NoInternet/NoInternet"));
var _reactToastify = require("react-toastify");
require("react-toastify/dist/ReactToastify.css");
require("./App.css");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
// Import NoInternet component

const Layout = () => /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement(_Header.default, null), /*#__PURE__*/_react.default.createElement(_CategoryTags.default, null), /*#__PURE__*/_react.default.createElement(_reactRouterDom.Outlet, null));
function App() {
  const [isOnline, setIsOnline] = (0, _react.useState)(navigator.onLine);
  (0, _react.useEffect)(() => {
    const setOnline = () => {
      setIsOnline(true);
      _reactToastify.toast.success("Internet Restored", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined
      });
    };
    const setOffline = () => {
      setIsOnline(false);
      _reactToastify.toast.error("You are offline", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined
      });
    };
    window.addEventListener('online', setOnline);
    window.addEventListener('offline', setOffline);

    // Show offline toast immediately if app is started without an internet connection
    if (!navigator.onLine) {
      setOffline();
    }
    return () => {
      window.removeEventListener('online', setOnline);
      window.removeEventListener('offline', setOffline);
    };
  }, []);
  return /*#__PURE__*/_react.default.createElement(_reactRouterDom.BrowserRouter, null, /*#__PURE__*/_react.default.createElement("div", {
    className: "App"
  }, /*#__PURE__*/_react.default.createElement(_reactToastify.ToastContainer, null), isOnline ? /*#__PURE__*/_react.default.createElement(_reactRouterDom.Routes, null, /*#__PURE__*/_react.default.createElement(_reactRouterDom.Route, {
    element: /*#__PURE__*/_react.default.createElement(Layout, null)
  }, /*#__PURE__*/_react.default.createElement(_reactRouterDom.Route, {
    path: "/",
    element: /*#__PURE__*/_react.default.createElement(_NewsList.default, null)
  }), /*#__PURE__*/_react.default.createElement(_reactRouterDom.Route, {
    path: "/:categorySlug/:postSlug",
    element: /*#__PURE__*/_react.default.createElement(_NewsDetail.default, null)
  }), /*#__PURE__*/_react.default.createElement(_reactRouterDom.Route, {
    path: "/:categorySlug",
    element: /*#__PURE__*/_react.default.createElement(_CategoryList.default, null)
  }), /*#__PURE__*/_react.default.createElement(_reactRouterDom.Route, {
    path: "/tags/:tagSlug",
    element: /*#__PURE__*/_react.default.createElement(_TagDetails.default, null)
  }), /*#__PURE__*/_react.default.createElement(_reactRouterDom.Route, {
    path: "/bookmark",
    element: /*#__PURE__*/_react.default.createElement(_Bookmark.default, null)
  }), /*#__PURE__*/_react.default.createElement(_reactRouterDom.Route, {
    path: "/profile/:username",
    element: /*#__PURE__*/_react.default.createElement(_ProfilePage.default, null)
  })), /*#__PURE__*/_react.default.createElement(_reactRouterDom.Route, {
    path: "/login",
    element: /*#__PURE__*/_react.default.createElement(_LoginPage.default, null)
  }), /*#__PURE__*/_react.default.createElement(_reactRouterDom.Route, {
    path: "/register",
    element: /*#__PURE__*/_react.default.createElement(_RegisterPage.default, null)
  }), /*#__PURE__*/_react.default.createElement(_reactRouterDom.Route, {
    path: "/forget_password",
    element: /*#__PURE__*/_react.default.createElement(_ForgotPassword.default, null)
  }), /*#__PURE__*/_react.default.createElement(_reactRouterDom.Route, {
    path: "/reset_password",
    element: /*#__PURE__*/_react.default.createElement(_ResetPassword.default, null)
  })) : /*#__PURE__*/_react.default.createElement(_NoInternet.default, null)));
}
var _default = exports.default = App;