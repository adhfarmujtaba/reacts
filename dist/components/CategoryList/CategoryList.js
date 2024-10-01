"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _axios = _interopRequireDefault(require("axios"));
var _reactRouterDom = require("react-router-dom");
var _reactInfiniteScrollComponent = _interopRequireDefault(require("react-infinite-scroll-component"));
var _Loader = _interopRequireDefault(require("./Loader"));
var _utils = require("./utils");
require("./CategoryList.css");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
// Initial Loader

// New Loader for Infinite Scroll
const ScrollLoader = () => /*#__PURE__*/_react.default.createElement("img", {
  src: "https://blog.tourismofkashmir.com/kOnzy.gif",
  alt: "Loading...",
  className: "infinite-scroll-loader"
});
const CategoryList = () => {
  const [categoryPosts, setCategoryPosts] = (0, _react.useState)([]);
  const [page, setPage] = (0, _react.useState)(1);
  const [hasMore, setHasMore] = (0, _react.useState)(true);
  const [isEmpty, setIsEmpty] = (0, _react.useState)(false);
  const [isInitialLoad, setIsInitialLoad] = (0, _react.useState)(true); // State to track the initial load
  const {
    categorySlug
  } = (0, _reactRouterDom.useParams)();
  const fetchCategoryPosts = (0, _react.useCallback)(async pageNum => {
    try {
      const response = await _axios.default.get(`https://blog.tourismofkashmir.com/apis?category_slug=${categorySlug}&page=${pageNum}`);
      const newPosts = response.data;
      if (Array.isArray(newPosts) && newPosts.length > 0) {
        setCategoryPosts(prevPosts => [...prevPosts, ...newPosts]);
        setIsEmpty(false);
      } else if (pageNum === 1 && newPosts.length === 0) {
        setIsEmpty(true);
        setHasMore(false);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error('Error fetching category posts:', error);
      setHasMore(false);
    } finally {
      setIsInitialLoad(false); // Set initial load to false after first fetch
    }
  }, [categorySlug]);
  (0, _react.useEffect)(() => {
    setCategoryPosts([]);
    setPage(1);
    setHasMore(true);
    setIsEmpty(false);
    setIsInitialLoad(true); // Set initial load to true when category changes
    fetchCategoryPosts(1);
  }, [fetchCategoryPosts]);
  const fetchMoreData = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchCategoryPosts(nextPage);
  };
  return /*#__PURE__*/_react.default.createElement("div", {
    className: "category-list"
  }, isEmpty ? /*#__PURE__*/_react.default.createElement("div", {
    className: "empty-category-message"
  }, /*#__PURE__*/_react.default.createElement("p", null, "There are no posts in this category.")) : /*#__PURE__*/_react.default.createElement(_reactInfiniteScrollComponent.default, {
    dataLength: categoryPosts.length,
    next: fetchMoreData,
    hasMore: hasMore,
    loader: isInitialLoad ? /*#__PURE__*/_react.default.createElement(_Loader.default, null) : /*#__PURE__*/_react.default.createElement(ScrollLoader, null) // Use Loader for initial load and ScrollLoader for subsequent loads
    ,
    endMessage: /*#__PURE__*/_react.default.createElement("p", {
      style: {
        textAlign: 'center'
      }
    }, /*#__PURE__*/_react.default.createElement("b", null, "Yay! You have seen it all"))
  }, categoryPosts.map(post => /*#__PURE__*/_react.default.createElement("div", {
    key: post.id,
    className: "card",
    onContextMenu: e => e.preventDefault()
  }, /*#__PURE__*/_react.default.createElement(_reactRouterDom.Link, {
    to: `/${post.category_slug}/${post.slug}`,
    className: "news-item-link"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "image-container",
    style: {
      position: "relative"
    }
  }, /*#__PURE__*/_react.default.createElement("img", {
    src: post.image,
    alt: post.title,
    className: "news-item-image",
    style: {
      width: "100%",
      height: "180px",
      objectFit: "cover"
    }
  }), /*#__PURE__*/_react.default.createElement("div", {
    style: {
      position: "absolute",
      bottom: "10px",
      right: "10px",
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      color: "white",
      padding: "5px",
      borderRadius: "5px",
      fontSize: "0.8rem"
    }
  }, post.read_time, " min read")), /*#__PURE__*/_react.default.createElement("div", {
    className: "card-content"
  }, /*#__PURE__*/_react.default.createElement("h2", null, post.title), /*#__PURE__*/_react.default.createElement("p", null, post.meta_description))), /*#__PURE__*/_react.default.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      marginBottom: '5px'
    }
  }, /*#__PURE__*/_react.default.createElement(_reactRouterDom.Link, {
    to: `/profile/${post.username}`,
    style: {
      textDecoration: 'none',
      color: 'inherit',
      display: 'flex',
      alignItems: 'center'
    }
  }, /*#__PURE__*/_react.default.createElement("img", {
    src: `https://blog.tourismofkashmir.com/${post.avatar}`,
    alt: "Avatar",
    className: "avatar",
    style: {
      width: '30px',
      height: '30px',
      borderRadius: '50%',
      marginRight: '5px'
    }
  }), /*#__PURE__*/_react.default.createElement("span", {
    className: "username"
  }, post.username), " "), /*#__PURE__*/_react.default.createElement("span", {
    className: "views"
  }, ". ", (0, _utils.formatViews)(post.views), " views"), /*#__PURE__*/_react.default.createElement("span", {
    className: "date"
  }, (0, _utils.formatDate)(post.created_at)))))));
};
var _default = exports.default = CategoryList;