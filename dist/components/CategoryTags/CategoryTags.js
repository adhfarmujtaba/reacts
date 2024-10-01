"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _axios = _interopRequireDefault(require("axios"));
var _reactRouterDom = require("react-router-dom");
require("./CategoryTags.css");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
// Make sure to import useLocation

const CategoryTags = () => {
  const [categories, setCategories] = (0, _react.useState)([]);
  const [isLoading, setIsLoading] = (0, _react.useState)(true);
  const [lastScrollY, setLastScrollY] = (0, _react.useState)(window.scrollY);
  const [tagsVisible, setTagsVisible] = (0, _react.useState)(true);
  const location = (0, _reactRouterDom.useLocation)(); // Use the useLocation hook here

  (0, _react.useEffect)(() => {
    const fetchCategories = async () => {
      try {
        const response = await _axios.default.get('https://blog.tourismofkashmir.com/apis?categories&order_index=asc&header_menu_is_included=TRUE');
        setCategories(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
    fetchCategories();
  }, []);
  const handleScroll = (0, _react.useCallback)(() => {
    const currentScrollY = window.scrollY;
    if (currentScrollY > lastScrollY && currentScrollY > 80) {
      setTagsVisible(false);
    } else {
      setTagsVisible(true);
    }
    setLastScrollY(currentScrollY);
  }, [lastScrollY]);
  (0, _react.useEffect)(() => {
    window.addEventListener('scroll', handleScroll, {
      passive: true
    });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);
  return /*#__PURE__*/_react.default.createElement("div", {
    className: "category-head",
    style: {
      position: window.scrollY > 80 ? 'fixed' : 'relative',
      top: tagsVisible ? '0' : '-100%',
      // Adjust as per your category tags' height
      transition: 'top 0.5s'
    }
  }, isLoading ? /*#__PURE__*/_react.default.createElement("div", {
    className: "category-tags-loading"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "loading-tag",
    style: {
      width: '50px',
      height: '35px'
    }
  }), /*#__PURE__*/_react.default.createElement("div", {
    className: "loading-tag",
    style: {
      width: '120px',
      height: '35px'
    }
  }), /*#__PURE__*/_react.default.createElement("div", {
    className: "loading-tag",
    style: {
      width: '90px',
      height: '35px'
    }
  }), /*#__PURE__*/_react.default.createElement("div", {
    className: "loading-tag",
    style: {
      width: '110px',
      height: '35px'
    }
  })) : /*#__PURE__*/_react.default.createElement("div", {
    className: "category-tags"
  }, /*#__PURE__*/_react.default.createElement(_reactRouterDom.NavLink, {
    to: "/",
    className: _ref => {
      let {
        isActive
      } = _ref;
      return `category-tag ${isActive ? 'active' : ''}`;
    },
    end: true
  }, "All"), categories.map(category => /*#__PURE__*/_react.default.createElement(_reactRouterDom.NavLink, {
    key: category.id,
    to: `/${category.slug}`,
    className: _ref2 => {
      let {
        isActive
      } = _ref2;
      const currentPath = location.pathname.endsWith('/') ? location.pathname.slice(0, -1) : location.pathname;
      const categoryPath = `/${category.slug}`;
      const isExactMatch = currentPath === categoryPath;
      return `category-tag ${isExactMatch ? 'active' : ''}`;
    },
    end: true
  }, category.name))));
};
var _default = exports.default = CategoryTags;