"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactRouterDom = require("react-router-dom");
var _axios = _interopRequireDefault(require("axios"));
require("./newsList.css");
var _reactInfiniteScrollComponent = _interopRequireDefault(require("react-infinite-scroll-component"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
// Skeleton Loader Component
const SkeletonLoader = () => /*#__PURE__*/_react.default.createElement("div", {
  className: "skeleton-container"
}, Array.from({
  length: 10
}).map((_, index) => /*#__PURE__*/_react.default.createElement("div", {
  key: index,
  className: "card skeleton-card"
}, /*#__PURE__*/_react.default.createElement("div", {
  className: "skeleton-image"
}), /*#__PURE__*/_react.default.createElement("div", {
  className: "card-content"
}, /*#__PURE__*/_react.default.createElement("div", {
  className: "skeleton-title"
}), /*#__PURE__*/_react.default.createElement("div", {
  className: "skeleton-content"
}), /*#__PURE__*/_react.default.createElement("div", {
  style: {
    display: 'flex',
    alignItems: 'center'
  }
}, /*#__PURE__*/_react.default.createElement("div", {
  className: "skeleton-avatar"
}), /*#__PURE__*/_react.default.createElement("div", {
  className: "skeleton-username"
}), /*#__PURE__*/_react.default.createElement("div", {
  className: "skeleton-date"
}))))));

// New Loader for Infinite Scroll
const ScrollLoader = () => /*#__PURE__*/_react.default.createElement("img", {
  src: "https://blog.tourismofkashmir.com/kOnzy.gif",
  alt: "Loading...",
  className: "infinite-scroll-loader"
});
const formatViews = views => {
  if (views >= 10000000) {
    return Math.floor(views / 10000000) + 'cr';
  } else if (views >= 1000000) {
    return Math.floor(views / 1000000) + 'M';
  } else if (views >= 100000) {
    return Math.floor(views / 100000) + 'L';
  } else if (views >= 1000) {
    return Math.floor(views / 1000) + 'k';
  } else {
    return views;
  }
};
const formatDate = date => {
  const currentDate = new Date();
  const postDate = new Date(date);
  const yearsDifference = currentDate.getFullYear() - postDate.getFullYear();
  const monthsDifference = currentDate.getMonth() - postDate.getMonth();
  const daysDifference = currentDate.getDate() - postDate.getDate();

  // Calculate total months considering year difference
  const totalMonths = yearsDifference * 12 + monthsDifference;

  // Adjust month calculation if current date's day is less than post date's day
  const adjustedMonths = daysDifference < 0 ? totalMonths - 1 : totalMonths;
  const timeDifference = currentDate - postDate;
  const seconds = Math.floor(timeDifference / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  if (seconds < 60) {
    return seconds + ' sec ago';
  } else if (minutes < 60) {
    return minutes + ' mins ago';
  } else if (hours < 24) {
    return hours + ' hours ago';
  } else if (days < 7) {
    return days + ' days ago';
  } else if (days < 30) {
    const weeks = Math.floor(days / 7);
    return weeks + ' weeks ago';
  } else if (adjustedMonths < 12) {
    return adjustedMonths + ' months ago';
  } else {
    return yearsDifference + ' years ago';
  }
};

// NewsList Component
const NewsList = () => {
  const [posts, setPosts] = (0, _react.useState)([]);
  const [hasMore, setHasMore] = (0, _react.useState)(true);
  const [page, setPage] = (0, _react.useState)(1);
  const initialLoading = (0, _react.useRef)(true);
  (0, _react.useEffect)(() => {
    const fetchPosts = async () => {
      try {
        const response = await _axios.default.get(`https://blog.tourismofkashmir.com/apis?posts&page=${page}`);
        const newData = response.data;
        if (!Array.isArray(newData) || newData.length === 0) {
          setHasMore(false);
        } else {
          setPosts(prevPosts => [...prevPosts, ...newData]);
        }
        if (initialLoading.current) initialLoading.current = false;
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };
    fetchPosts();
  }, [page]); // Only 'page' is a dependency now

  const fetchMoreData = () => {
    setPage(prevPage => prevPage + 1);
  };
  const truncateText = (text, maxWords) => {
    const wordsArray = text.split(' ');
    if (wordsArray.length > maxWords) {
      return wordsArray.slice(0, maxWords).join(' ') + '...';
    }
    return text;
  };
  return /*#__PURE__*/_react.default.createElement(_reactInfiniteScrollComponent.default, {
    dataLength: posts.length,
    next: fetchMoreData,
    hasMore: hasMore,
    loader: initialLoading.current ? /*#__PURE__*/_react.default.createElement(SkeletonLoader, null) : /*#__PURE__*/_react.default.createElement(ScrollLoader, null),
    endMessage: /*#__PURE__*/_react.default.createElement("div", {
      style: {
        textAlign: "center",
        marginTop: "20px",
        color: "#999"
      }
    }, "No more posts found.")
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "news-list"
  }, posts.map(post => /*#__PURE__*/_react.default.createElement("div", {
    key: post.id,
    className: "card",
    onContextMenu: e => e.preventDefault()
  }, /*#__PURE__*/_react.default.createElement(_reactRouterDom.Link, {
    to: `/${post.category_slug}/${post.slug}/`,
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
  }, /*#__PURE__*/_react.default.createElement("h2", null, truncateText(post.title, 10)), " ", /*#__PURE__*/_react.default.createElement("p", null, truncateText(post.meta_description, 20)), " ")), /*#__PURE__*/_react.default.createElement("div", {
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
  }, post.username)), /*#__PURE__*/_react.default.createElement("span", {
    className: "views"
  }, ". ", formatViews(post.views), " views"), /*#__PURE__*/_react.default.createElement("span", {
    className: "date"
  }, formatDate(post.created_at)))))));
};
var _default = exports.default = NewsList;