"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _axios = _interopRequireDefault(require("axios"));
var _dateFns = require("date-fns");
var _reactToastify = require("react-toastify");
require("./commentsModal.css");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const CommentsModal = _ref => {
  let {
    isOpen,
    onClose,
    postId
  } = _ref;
  const [comments, setComments] = (0, _react.useState)([]);
  const [isLoading, setIsLoading] = (0, _react.useState)(true);
  const [newComment, setNewComment] = (0, _react.useState)('');
  const [user, setUser] = (0, _react.useState)(null);
  const [showFullComment, setShowFullComment] = (0, _react.useState)({});
  const [isLoadingMore, setIsLoadingMore] = (0, _react.useState)(false);
  (0, _react.useEffect)(() => {
    const loggedInUser = localStorage.getItem('user');
    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);
      setUser(foundUser);
    }
  }, []);
  const fetchComments = (0, _react.useCallback)(async () => {
    if (isOpen && postId) {
      setIsLoading(true);
      try {
        const response = await _axios.default.get(`http://blog.tourismofkashmir.com/api_comments.php?post_id=${postId}`);
        setComments(response.data);
      } catch (error) {
        console.error("There was an error fetching the comments:", error);
      } finally {
        setIsLoading(false);
      }
    }
  }, [isOpen, postId]);
  (0, _react.useEffect)(() => {
    fetchComments();
  }, [isOpen, postId, fetchComments]);
  const postComment = async () => {
    if (!user) {
      // Show toast message for not logged in
      _reactToastify.toast.error("Please log in to post the comment");
      return;
    }
    if (!newComment.trim()) return;
    const commentData = {
      post_id: postId,
      user_id: user?.id,
      content: newComment
    };
    try {
      const response = await _axios.default.post('http://blog.tourismofkashmir.com/api_comments.php', commentData);
      fetchComments();
      setNewComment('');
      console.log(response.data.message);
    } catch (error) {
      console.error("There was an error posting the comment:", error);
    }
  };
  const toggleFullComment = commentIndex => {
    setShowFullComment({
      ...showFullComment,
      [commentIndex]: !showFullComment[commentIndex]
    });
  };

  // Function to fetch more comments
  const loadMoreComments = (0, _react.useCallback)(async () => {
    setIsLoadingMore(true);
    // Simulate loading delay
    await new Promise(resolve => setTimeout(resolve, 50));
    // Fetch more comments using offset and limit
    // Adjust offset and limit according to your requirements
    const offset = comments.length;
    const limit = 10;
    try {
      const response = await _axios.default.get(`http://blog.tourismofkashmir.com/api_comments.php?post_id=${postId}&offset=${offset}&limit=${limit}`);
      setComments(prevComments => [...prevComments, ...response.data]);
    } catch (error) {
      console.error("There was an error fetching more comments:", error);
    } finally {
      setIsLoadingMore(false);
    }
  }, [comments.length, postId]);

  // IntersectionObserver callback function
  const handleObserver = (0, _react.useCallback)(entries => {
    const target = entries[0];
    if (target.isIntersecting) {
      // Fetch more comments when the target element is intersecting
      loadMoreComments();
    }
  }, [loadMoreComments]);
  (0, _react.useEffect)(() => {
    // Create IntersectionObserver and observe the target element
    const observer = new IntersectionObserver(handleObserver, {
      threshold: 1
    });
    const targetElement = document.getElementById('observer-target');
    if (targetElement) {
      observer.observe(targetElement);
    }
    // Cleanup function
    return () => {
      if (targetElement) {
        observer.unobserve(targetElement);
      }
    };
  }, [handleObserver]);
  return isOpen ? /*#__PURE__*/_react.default.createElement("div", {
    className: `modal show ${isOpen ? 'modal-visible' : ''}`
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "modal-content"
  }, /*#__PURE__*/_react.default.createElement("div", {
    id: "modelHeader",
    className: "modal-header"
  }, /*#__PURE__*/_react.default.createElement("h2", null, "Comments"), /*#__PURE__*/_react.default.createElement("span", {
    className: "close",
    onClick: onClose
  }, "\xD7")), /*#__PURE__*/_react.default.createElement("div", {
    className: "modal-body"
  }, isLoading ? /*#__PURE__*/_react.default.createElement("div", {
    className: "loading-comments-placeholder"
  }, [...Array(7)].map((_, index) => /*#__PURE__*/_react.default.createElement("div", {
    className: "loading-comment-item",
    key: index
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "loading-avatar"
  }), /*#__PURE__*/_react.default.createElement("div", {
    className: "loading-details"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "loading-line loading-name"
  }), /*#__PURE__*/_react.default.createElement("div", {
    className: "loading-line loading-message"
  }), /*#__PURE__*/_react.default.createElement("div", {
    className: "loading-line loading-message"
  }))))) : /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, comments.length === 0 ? /*#__PURE__*/_react.default.createElement("div", {
    className: "no-comments-message"
  }, "No comments yet.") : /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, comments.map((comment, index) => /*#__PURE__*/_react.default.createElement("div", {
    key: index,
    className: "comment"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "comment-avatar"
  }, /*#__PURE__*/_react.default.createElement("img", {
    src: comment.avatar,
    alt: "Avatar"
  })), /*#__PURE__*/_react.default.createElement("div", {
    className: "comment-content"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "comment-header"
  }, /*#__PURE__*/_react.default.createElement("a", {
    className: "comment-author",
    style: {
      color: '#777',
      textDecoration: 'none'
    },
    href: `#${comment.username}`
  }, comment.username), /*#__PURE__*/_react.default.createElement("span", {
    className: "comment-date"
  }, (0, _dateFns.formatDistanceToNow)(new Date(comment.created_at), {
    addSuffix: true
  }))), /*#__PURE__*/_react.default.createElement("div", {
    className: "comment-text"
  }, showFullComment[index] ? /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, comment.content, ' ', /*#__PURE__*/_react.default.createElement("a", {
    href: "#!",
    className: "read-more-link",
    onClick: () => toggleFullComment(index)
  }, "Read less")) : /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, comment.content.length > 100 ? `${comment.content.substring(0, 100)}...` : comment.content, comment.content.length > 100 && /*#__PURE__*/_react.default.createElement("a", {
    href: "#!",
    className: "read-more-link",
    onClick: () => toggleFullComment(index)
  }, "Read more")))))), /*#__PURE__*/_react.default.createElement("div", {
    id: "observer-target"
  })))), isLoadingMore && /*#__PURE__*/_react.default.createElement("div", {
    className: "loader"
  }, /*#__PURE__*/_react.default.createElement("img", {
    src: "https://blog.tourismofkashmir.com/kOnzy.gif",
    alt: "Loading..."
  })), /*#__PURE__*/_react.default.createElement("div", {
    className: "modal-footer"
  }, /*#__PURE__*/_react.default.createElement("input", {
    type: "text",
    className: "comment-input",
    placeholder: "Add a comment...",
    value: newComment,
    onChange: e => setNewComment(e.target.value)
  }), /*#__PURE__*/_react.default.createElement("button", {
    className: "submit-comment-btn",
    onClick: postComment
  }, "Post")))) : null;
};
var _default = exports.default = CommentsModal;