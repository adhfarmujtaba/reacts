"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _axios = _interopRequireDefault(require("axios"));
var _reactFontawesome = require("@fortawesome/react-fontawesome");
var _freeSolidSvgIcons = require("@fortawesome/free-solid-svg-icons");
var _reactRouterDom = require("react-router-dom");
require("./SearchModal.css");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const SearchModal = _ref => {
  let {
    onClose
  } = _ref;
  const [query, setQuery] = (0, _react.useState)('');
  const [results, setResults] = (0, _react.useState)([]);
  const [isSearching, setIsSearching] = (0, _react.useState)(false);
  (0, _react.useEffect)(() => {
    const fetchResults = async () => {
      if (query.length > 0) {
        setIsSearching(true);
        try {
          const response = await _axios.default.get(`https://blog.tourismofkashmir.com/apisearch?search=${query}`);
          setResults(Array.isArray(response.data) ? response.data : []);
        } catch (error) {
          console.error('Error fetching search results:', error);
          setResults([]);
        } finally {
          setIsSearching(false);
        }
      } else {
        setResults([]);
      }
    };
    const delayDebounce = setTimeout(() => {
      fetchResults();
    }, 500);
    return () => {
      clearTimeout(delayDebounce);
    };
  }, [query]);
  const handleCloseModal = () => {
    onClose();
  };
  const searchingStyle = {
    fontSize: '18px',
    color: '#888',
    textAlign: 'center',
    padding: '20px'
  };
  const noResultsStyle = {
    fontSize: '16px',
    color: '#666',
    textAlign: 'center',
    padding: '20px'
  };
  return /*#__PURE__*/_react.default.createElement("div", {
    className: "search-modal"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "search-modal-header"
  }, /*#__PURE__*/_react.default.createElement(_reactFontawesome.FontAwesomeIcon, {
    icon: _freeSolidSvgIcons.faTimes,
    className: "close-icon",
    onClick: handleCloseModal
  })), /*#__PURE__*/_react.default.createElement("div", {
    className: "search-modal-content"
  }, /*#__PURE__*/_react.default.createElement("input", {
    type: "text",
    placeholder: "Search...",
    className: "search-input",
    value: query,
    onChange: e => setQuery(e.target.value),
    autoFocus: true
  }), isSearching ? /*#__PURE__*/_react.default.createElement("div", {
    style: searchingStyle
  }, "Searching...") : query.length > 0 ? results.length > 0 ? /*#__PURE__*/_react.default.createElement("ul", {
    className: "search-results"
  }, results.map((result, index) => /*#__PURE__*/_react.default.createElement("li", {
    key: index
  }, /*#__PURE__*/_react.default.createElement(_reactRouterDom.Link, {
    to: `/${result.categorySlug}/${result.postSlug}`,
    onClick: handleCloseModal
  }, result.image && /*#__PURE__*/_react.default.createElement("img", {
    src: result.image,
    alt: "",
    className: "post-image"
  }), /*#__PURE__*/_react.default.createElement("span", {
    className: "post-title"
  }, result.title))))) : /*#__PURE__*/_react.default.createElement("div", {
    style: noResultsStyle
  }, "No results found") : null));
};
var _default = exports.default = SearchModal;