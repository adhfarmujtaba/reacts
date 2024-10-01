"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _axios = _interopRequireDefault(require("axios"));
var _reactRouterDom = require("react-router-dom");
var _reactInfiniteScrollComponent = _interopRequireDefault(require("react-infinite-scroll-component"));
require("./TagDetails.css");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
// Ensure the CSS file is correctly imported

// Skeleton loading component
const SkeletonLoading = () => {
  // Define the number of skeleton rows
  const numberOfSkeletonRows = 5;

  // Create an array to store the skeleton rows
  const skeletonRows = [];

  // Loop to generate skeleton rows
  for (let i = 0; i < numberOfSkeletonRows; i++) {
    skeletonRows.push(/*#__PURE__*/_react.default.createElement("div", {
      className: "tag-details-skeleton-row",
      key: i
    }, /*#__PURE__*/_react.default.createElement("div", {
      className: "tag-details-skeleton-image"
    }), /*#__PURE__*/_react.default.createElement("div", {
      className: "tag-details-skeleton-title"
    })));
  }
  return /*#__PURE__*/_react.default.createElement("div", {
    className: "tag-details-loading"
  }, skeletonRows);
};

// New Loader for Infinite Scroll
const InScrollLoader = () => /*#__PURE__*/_react.default.createElement("img", {
  src: "https://blog.tourismofkashmir.com/kOnzy.gif",
  alt: "Loading...",
  className: "infinite-scroller-loader"
});
const trimTitle = function (title) {
  let maxLength = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 50;
  if (title.length <= maxLength) return title;
  return `${title.substring(0, maxLength)}...`;
};
const TagDetails = () => {
  const [posts, setPosts] = (0, _react.useState)([]);
  const [tagName, setTagName] = (0, _react.useState)('');
  const [page, setPage] = (0, _react.useState)(1);
  const [hasMore, setHasMore] = (0, _react.useState)(true);
  const [isLoading, setIsLoading] = (0, _react.useState)(true);
  const [isFetching, setIsFetching] = (0, _react.useState)(false); // New state to track fetching status
  const {
    tagSlug
  } = (0, _reactRouterDom.useParams)();
  (0, _react.useEffect)(() => {
    const fetchTagDetails = async () => {
      try {
        setIsFetching(true); // Start fetching
        const response = await _axios.default.get(`https://blog.tourismofkashmir.com/apis.php?tag_slug=${tagSlug}&page=${page}`);
        const {
          data
        } = response;
        if (data.length > 0) {
          setPosts(prevPosts => [...prevPosts, ...data]);
          setTagName(data[0].tag_name);
        } else {
          setHasMore(false);
        }
      } catch (error) {
        console.error('Error fetching tag details:', error);
        setHasMore(false);
      } finally {
        setIsFetching(false); // End fetching
        setIsLoading(false); // Update loading state after initial fetch
      }
    };
    fetchTagDetails();
  }, [tagSlug, page]);
  const fetchMoreData = () => {
    setPage(prevPage => prevPage + 1);
  };
  if (isLoading) {
    return /*#__PURE__*/_react.default.createElement(SkeletonLoading, null);
  }
  return /*#__PURE__*/_react.default.createElement("div", {
    className: "tag-details-container"
  }, /*#__PURE__*/_react.default.createElement("h2", null, "Posts tagged with ", tagName), /*#__PURE__*/_react.default.createElement(_reactInfiniteScrollComponent.default, {
    dataLength: posts.length,
    next: fetchMoreData,
    hasMore: hasMore,
    loader: isFetching ? /*#__PURE__*/_react.default.createElement(InScrollLoader, null) : null // Conditionally render loader
    ,
    endMessage: /*#__PURE__*/_react.default.createElement("p", {
      style: {
        textAlign: 'center'
      }
    }, /*#__PURE__*/_react.default.createElement("b", null, "Yay! You have seen it all"))
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "tag-details-posts-container"
  }, posts.map((post, index) => /*#__PURE__*/_react.default.createElement(_reactRouterDom.Link, {
    to: `/${post.category_slug}/${post.slug}`,
    key: index,
    className: "tag-details-post-link"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "tag-details-post-row"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "tag-details-image-container"
  }, /*#__PURE__*/_react.default.createElement("img", {
    src: post.image,
    alt: post.title,
    className: "tag-details-post-image"
  }), /*#__PURE__*/_react.default.createElement("div", {
    className: "tag-details-read-time-overlay"
  }, post.read_time, " min read")), /*#__PURE__*/_react.default.createElement("h3", {
    className: "tag-details-post-title"
  }, trimTitle(post.title))))))));
};
var _default = exports.default = TagDetails;