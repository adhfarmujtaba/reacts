"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactRouterDom = require("react-router-dom");
require("./newsItem.css");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const formatViews = views => {
  if (views >= 10000000) {
    return Math.floor(views / 10000000) + 'cr';
  } else if (views >= 1000000) {
    return Math.floor(views / 1000000) + 'M';
  } else if (views >= 100000) {
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
const NewsItem = _ref => {
  let {
    post
  } = _ref;
  return /*#__PURE__*/_react.default.createElement("div", {
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
  }, /*#__PURE__*/_react.default.createElement("h2", null, post.title), /*#__PURE__*/_react.default.createElement("p", null, /*#__PURE__*/_react.default.createElement("strong", null), post.meta_description))), /*#__PURE__*/_react.default.createElement("div", {
    style: {
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
  }, post.username), /*#__PURE__*/_react.default.createElement("span", {
    className: "views"
  }, ". ", formatViews(post.views), " views"), /*#__PURE__*/_react.default.createElement("span", {
    className: "date"
  }, formatDate(post.created_at))));
};
var _default = exports.default = NewsItem;