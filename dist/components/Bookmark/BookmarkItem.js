"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactSwipeable = require("react-swipeable");
var _reactRouterDom = require("react-router-dom");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const BookmarkItem = _ref => {
  let {
    bookmark,
    handleSwipeLeft,
    styles
  } = _ref;
  const [swipeStyle, setSwipeStyle] = (0, _react.useState)({});
  const [isSwiping, setIsSwiping] = (0, _react.useState)(false);
  const [swipeDistance, setSwipeDistance] = (0, _react.useState)(0); // Track swipe distance

  const swipeThreshold = 150; // Distance in pixels to trigger the swipe action

  const handlers = (0, _reactSwipeable.useSwipeable)({
    onSwiping: eventData => {
      setIsSwiping(true);
      if (eventData.dir === 'Left') {
        setSwipeDistance(Math.abs(eventData.deltaX)); // Update swipe distance
        setSwipeStyle({
          transform: `translateX(${eventData.deltaX}px)`,
          opacity: 1 - Math.abs(eventData.deltaX / 300),
          boxShadow: `rgba(0, 0, 0, ${0.2 * (1 - Math.abs(eventData.deltaX / 1000))}) 0px 3px 5px 0px`
        });
      }
    },
    onSwiped: () => {
      setIsSwiping(false);
      setSwipeStyle({});
      setSwipeDistance(0); // Reset swipe distance
    },
    onSwipedLeft: eventData => {
      if (Math.abs(eventData.deltaX) > swipeThreshold) {
        handleSwipeLeft(bookmark.id);
        setSwipeStyle({
          transform: 'translateX(-100vw)',
          opacity: 0
        });
      } else {
        // Rebound effect
        setSwipeStyle({});
        setSwipeDistance(0); // Reset swipe distance
      }
    },
    preventDefaultTouchmoveEvent: true,
    trackMouse: true
  });
  return /*#__PURE__*/_react.default.createElement("li", _extends({}, handlers, {
    className: `${styles.bookmarkItem} ${isSwiping ? styles.swiping : ''}`,
    style: {
      ...swipeStyle,
      transition: isSwiping ? 'none' : 'transform 0.3s ease-out, opacity 0.3s ease-out, box-shadow 0.3s ease-out'
    }
  }), /*#__PURE__*/_react.default.createElement("div", {
    className: styles.deleteIndicator,
    style: {
      opacity: swipeDistance > 50 ? 1 : 0
    }
  }, "Swipe to delete"), /*#__PURE__*/_react.default.createElement(_reactRouterDom.Link, {
    to: `/${bookmark.category_slug}/${bookmark.slug}`,
    style: {
      textDecoration: 'none',
      color: 'inherit',
      display: 'flex',
      alignItems: 'center',
      width: '100%'
    }
  }, /*#__PURE__*/_react.default.createElement("img", {
    src: bookmark.full_image_url,
    alt: bookmark.title,
    className: styles.bookmarkImage
  }), /*#__PURE__*/_react.default.createElement("h3", {
    className: styles.bookmarkTitle
  }, bookmark.title)));
};
var _default = exports.default = BookmarkItem;