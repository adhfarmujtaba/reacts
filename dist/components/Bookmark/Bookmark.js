"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _axios = _interopRequireDefault(require("axios"));
var _BookmarkItem = _interopRequireDefault(require("./BookmarkItem"));
var _BookMarkModule = _interopRequireDefault(require("./BookMark.module.css"));
var _reactToastify = require("react-toastify");
require("react-toastify/dist/ReactToastify.css");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
// Import BookmarkItem component

const BookMark = () => {
  const [bookmarks, setBookmarks] = (0, _react.useState)([]);

  // Retrieve user data from localStorage and parse it
  const user = JSON.parse(localStorage.getItem('user'));
  // Extract the userId from the user data
  const userId = user?.id; // Adjust the key according to your stored user object

  (0, _react.useEffect)(() => {
    if (!userId) {
      console.error('No user ID found');
      return;
    }
    const fetchBookmarks = async () => {
      try {
        const response = await _axios.default.get('https://blog.tourismofkashmir.com/bookmark_view_api.php', {
          params: {
            user_id: userId
          }
        });
        setBookmarks(response.data);
      } catch (error) {
        console.error('Error fetching bookmarks:', error);
      }
    };
    fetchBookmarks();
  }, [userId]);
  const handleSwipeLeft = async bookmarkId => {
    try {
      const response = await _axios.default.delete(`https://blog.tourismofkashmir.com/bookmark_view_api.php?user_id=${userId}&post_id=${bookmarkId}`);
      if (response.data.success) {
        console.log('Bookmark deleted successfully:', bookmarkId);
        _reactToastify.toast.success(`Bookmark deleted successfully`);
        setBookmarks(currentBookmarks => currentBookmarks.filter(bookmark => bookmark.id !== bookmarkId));
      } else {
        console.error('Failed to delete bookmark:', bookmarkId, response.data.error);
      }
    } catch (error) {
      console.error('Error deleting bookmark:', bookmarkId, error);
    }
  };
  return /*#__PURE__*/_react.default.createElement("div", {
    className: _BookMarkModule.default.container
  }, /*#__PURE__*/_react.default.createElement("h2", {
    className: _BookMarkModule.default.title
  }, "Bookmarked Posts"), /*#__PURE__*/_react.default.createElement("ul", {
    className: _BookMarkModule.default.bookmarkList
  }, bookmarks.map(bookmark => /*#__PURE__*/_react.default.createElement(_BookmarkItem.default, {
    key: bookmark.id,
    bookmark: bookmark,
    handleSwipeLeft: handleSwipeLeft,
    styles: _BookMarkModule.default
  }))));
};
var _default = exports.default = BookMark;