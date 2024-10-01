"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _axios = _interopRequireDefault(require("axios"));
var _reactRouterDom = require("react-router-dom");
var _reactFontawesome = require("@fortawesome/react-fontawesome");
var _freeSolidSvgIcons = require("@fortawesome/free-solid-svg-icons");
var _freeRegularSvgIcons = require("@fortawesome/free-regular-svg-icons");
var _freeBrandsSvgIcons = require("@fortawesome/free-brands-svg-icons");
require("./newsDetail.css");
var _CommentsModal = _interopRequireDefault(require("./CommentsModal"));
var _reactToastify = require("react-toastify");
var _reactHelmet = require("react-helmet");
require("react-toastify/dist/ReactToastify.css");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
// Import social media icons from brands collection
// Import clipboard icon for copy functionality

const NewsDetail = () => {
  const topRef = (0, _react.useRef)(null);
  const [topViewedPosts, setTopViewedPosts] = (0, _react.useState)([]);
  const [isBookmarked, setIsBookmarked] = (0, _react.useState)(false); // State to track bookmark status
  const [commentCount, setCommentCount] = (0, _react.useState)(0); // Step 1: New state variable for comment count
  const [post, setPost] = (0, _react.useState)(null);
  const [relatedPosts, setRelatedPosts] = (0, _react.useState)([]);
  const [likeCount, setLikeCount] = (0, _react.useState)(0);
  const [isLikedByUser, setIsLikedByUser] = (0, _react.useState)(false);
  const [showComments, setShowComments] = (0, _react.useState)(false);
  const {
    postSlug
  } = (0, _reactRouterDom.useParams)();
  const [readingProgress, setReadingProgress] = (0, _react.useState)(0);
  const [showShareOptions, setShowShareOptions] = (0, _react.useState)(false); // State to toggle share options

  (0, _react.useEffect)(() => {
    const fetchData = async () => {
      try {
        const response = await _axios.default.get(`https://blog.tourismofkashmir.com/apis?post_slug=${postSlug}`);
        setPost(response.data);

        // This log is to confirm that data fetching was successful
        console.log("Post details fetched successfully:", response.data);
      } catch (error) {
        console.error("Error fetching post details:", error);
      }
    };
    fetchData();
  }, [postSlug]);
  (0, _react.useEffect)(() => {
    console.log('useEffect for scrolling triggered');
    if (topRef.current) {
      console.log('topRef.current exists');
      setTimeout(() => {
        const headerHeight = 150; // Adjust based on your header's height
        console.log('headerHeight:', headerHeight);
        const topPosition = topRef.current.getBoundingClientRect().top + window.pageYOffset;
        console.log('topPosition:', topPosition);
        const offsetPosition = topPosition - headerHeight;
        console.log('offsetPosition:', offsetPosition);
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
        console.log('Scrolling executed');
      }, 50); // Adjust delay as needed to ensure the DOM has updated
    } else {
      console.log('topRef.current does not exist');
    }
  }, [post]); // Depend on the `post` state so it runs after the post data is fetched and set

  (0, _react.useEffect)(() => {
    const fetchRelatedPosts = async () => {
      try {
        if (post && post.category_name) {
          console.log('Fetching related posts...');
          const response = await _axios.default.get(`https://blog.tourismofkashmir.com/related_api.php?related_posts=${post.category_name}&exclude_post_id=${post.id}`);
          console.log('Related posts response:', response.data); // Debug: log the response
          setRelatedPosts(response.data);
          console.log('Related posts set:', response.data); // Debug: log the updated state
        }
      } catch (error) {
        console.error("Error fetching related posts:", error);
      }
    };
    fetchRelatedPosts();
  }, [post]);
  (0, _react.useEffect)(() => {
    const fetchLikes = async () => {
      try {
        // Always fetch the like count for the post
        const response = await _axios.default.get(`https://blog.tourismofkashmir.com/api_likes?action=getLikeCount&post_id=${post.id}`);
        setLikeCount(response.data.like_count);

        // Check if there's a logged-in user
        const loggedInUser = localStorage.getItem('user');
        if (loggedInUser) {
          const foundUser = JSON.parse(loggedInUser);
          const userId = foundUser.id; // Assuming foundUser has an id field

          // Fetch whether the logged-in user has liked the post
          const likeStatusResponse = await _axios.default.get(`https://blog.tourismofkashmir.com/api_likes?action=checkUserLike&post_id=${post.id}&user_id=${userId}`);
          setIsLikedByUser(likeStatusResponse.data.user_liked);
        }
      } catch (error) {
        console.error("Error fetching like data:", error);
      }
    };
    if (post) {
      fetchLikes();
    }
  }, [post, postSlug]);
  const toggleLike = async () => {
    try {
      const loggedInUser = localStorage.getItem('user');
      if (!loggedInUser) {
        _reactToastify.toast.error("Please log in to like the post");
        return;
      }
      const foundUser = JSON.parse(loggedInUser);
      const userId = foundUser.id;
      await _axios.default.post(`https://blog.tourismofkashmir.com/api_likes?toggle-like`, {
        post_id: post.id,
        user_id: userId
      });

      // Add animation class
      setIsLikedByUser(!isLikedByUser);
      setLikeCount(prevCount => isLikedByUser ? prevCount - 1 : prevCount + 1);
      document.getElementById('like-btn').classList.add('heartBeatAnimation');

      // Remove animation class after 0.5s
      setTimeout(() => {
        document.getElementById('like-btn').classList.remove('heartBeatAnimation');
      }, 500);
    } catch (error) {
      console.error("Error toggling like:", error);
    }
  };

  // Fetch bookmark status when component mounts or post changes
  (0, _react.useEffect)(() => {
    const checkBookmarkStatus = async () => {
      if (post) {
        try {
          const loggedInUser = localStorage.getItem('user');
          if (!loggedInUser) {
            console.warn("User not logged in");
            setIsBookmarked(false); // Assume not bookmarked if user is not logged in
            return;
          }
          const foundUser = JSON.parse(loggedInUser);
          const userId = foundUser.id;
          console.log(`Checking bookmark status for user ${userId} and post ${post.id}`); // Debug log

          const response = await _axios.default.get(`https://blog.tourismofkashmir.com/api_bookmark.php?action=check&user_id=${userId}&post_id=${post.id}`);
          console.log('Bookmark check response:', response.data); // Debug log

          // Update isBookmarked based on the text response
          if (response.data && typeof response.data === 'string') {
            setIsBookmarked(response.data.includes("Post is bookmarked"));
          } else {
            setIsBookmarked(false); // Default to false if the response is not as expected
          }
        } catch (error) {
          console.error("Error checking bookmark status:", error);
          setIsBookmarked(false); // Assume not bookmarked in case of error
        }
      }
    };
    checkBookmarkStatus();
  }, [post]);
  const handleBookmarkClick = async () => {
    const loggedInUser = localStorage.getItem('user');
    if (!loggedInUser) {
      _reactToastify.toast.error("Please log in to manage bookmarks");
      return;
    }
    const foundUser = JSON.parse(loggedInUser);
    const userId = foundUser.id;
    const action = isBookmarked ? 'delete' : 'add'; // Determine action based on current bookmark status

    try {
      await _axios.default.get(`https://blog.tourismofkashmir.com/api_bookmark.php?action=${action}&user_id=${userId}&post_id=${post.id}`);
      setIsBookmarked(!isBookmarked); // Toggle bookmark status after successful action
      // Show toast notification based on action
      if (action === 'add') {
        _reactToastify.toast.success("Bookmark added successfully");
      } else {
        _reactToastify.toast.success("Bookmark removed successfully");
      }
    } catch (error) {
      console.error(`Error ${action}ing bookmark:`, error);
      _reactToastify.toast.error(`Error ${action}ing bookmark: ${error.message}`);
    }
  };
  (0, _react.useEffect)(() => {
    const updateViews = async () => {
      try {
        console.log('Attempting to update views for post', post.id); // Debug: log the post id being updated
        await _axios.default.get(`https://blog.tourismofkashmir.com/apis.php?update_views=true&post_id=${post.id}`);
        console.log('Successfully updated views for post', post.id); // Debug: confirm the post views were updated
      } catch (error) {
        console.error("Error updating post views:", error);
      }
    };
    if (post) {
      console.log('Post is available, updating views...'); // Debug: check if post is available before updating
      updateViews();
    } else {
      console.log('Post data is not available yet.'); // Debug: log if post data is not yet available
    }
  }, [post]); // This effect depends on the `post` state, so it runs when `post` changes, which should only be right after the post data is fetched
  (0, _react.useEffect)(() => {
    const fetchCommentCount = async () => {
      try {
        if (post) {
          const response = await _axios.default.get(`https://blog.tourismofkashmir.com/api_comment_count.php?post_id=${post.id}`);
          setCommentCount(response.data.comment_count); // Step 3: Update comment count state
        }
      } catch (error) {
        console.error("Error fetching comment count:", error);
      }
    };
    fetchCommentCount(); // Step 2: Fetch the comment count
  }, [post]); // Depend on the `post` state so it runs when `post` changes

  (0, _react.useEffect)(() => {
    const fetchTopViewedPosts = async () => {
      try {
        if (post) {
          const response = await _axios.default.get(`https://blog.tourismofkashmir.com/related_api.php?topviewpost=true&exclude_post_id=${post.id}`);
          setTopViewedPosts(response.data);
        }
      } catch (error) {
        console.error("Error fetching top viewed posts:", error);
      }
    };
    fetchTopViewedPosts();
  }, [post]);
  const shareOnSocialMedia = platform => {
    const url = window.location.href;
    let shareUrl = '';
    switch (platform) {
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
        break;
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?url=${url}`;
        break;
      case 'whatsapp':
        shareUrl = `https://api.whatsapp.com/send?text=${url}`;
        break;
      default:
        break;
    }
    if (shareUrl) {
      window.open(shareUrl, '_blank');
    }
  };
  const copyLinkToClipboard = () => {
    navigator.clipboard.writeText(window.location.href).then(() => _reactToastify.toast.success("Link copied to clipboard!")).catch(err => console.error("Could not copy link: ", err));
  };

  // Toggle function for share options
  const toggleShareOptions = () => {
    setShowShareOptions(!showShareOptions);
  };
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
      return views.toString();
    }
  };
  const calculateReadingProgress = () => {
    if (!topRef.current) return;
    const articleHeight = topRef.current.clientHeight - window.innerHeight; // Total scrollable height
    const scrollPosition = window.scrollY; // Current scroll position

    const progress = scrollPosition / articleHeight * 100;
    setReadingProgress(progress > 100 ? 100 : progress); // Ensure progress doesn't exceed 100%
  };
  (0, _react.useEffect)(() => {
    const handleScroll = () => {
      window.requestAnimationFrame(() => {
        calculateReadingProgress();
      });
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  const LoadingSkeletonPost = () => /*#__PURE__*/_react.default.createElement("div", {
    className: "news-detail-skeleton-wrapper"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "news-detail-skeleton-image"
  }), /*#__PURE__*/_react.default.createElement("div", {
    className: "news-detail-skeleton-title"
  }), /*#__PURE__*/_react.default.createElement("div", {
    className: "news-detail-skeleton-meta"
  }), /*#__PURE__*/_react.default.createElement("div", {
    className: "news-detail-skeleton-content"
  }));
  if (!post) {
    return /*#__PURE__*/_react.default.createElement(LoadingSkeletonPost, null);
  }
  const formattedDate = new Date(post.created_at).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  const toggleCommentsModal = () => {
    setShowComments(prevState => !prevState);
  }; // Helper function to truncate titles that are too long
  const truncateTitle = function (title) {
    let maxLength = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 50;
    if (title.length > maxLength) {
      return `${title.substring(0, maxLength)}...`; // Truncate and append ellipsis
    }
    return title; // Return the original title if it's short enough
  };
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_reactHelmet.Helmet, null, /*#__PURE__*/_react.default.createElement("title", null, post.title), /*#__PURE__*/_react.default.createElement("meta", {
    property: "og:title",
    content: post.title
  }), /*#__PURE__*/_react.default.createElement("meta", {
    property: "og:description",
    content: post.meta_description
  }), /*#__PURE__*/_react.default.createElement("meta", {
    property: "og:image",
    content: post.image
  }), /*#__PURE__*/_react.default.createElement("meta", {
    property: "og:type",
    content: "article"
  }), /*#__PURE__*/_react.default.createElement("meta", {
    property: "og:url",
    content: window.location.href
  })), /*#__PURE__*/_react.default.createElement("div", {
    ref: topRef
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "container_post"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "reading-progress-bar",
    style: {
      width: `${readingProgress}%`
    }
  }), /*#__PURE__*/_react.default.createElement("div", {
    className: "card_post"
  }, /*#__PURE__*/_react.default.createElement("img", {
    src: post.image,
    className: "card-img-top news-image",
    alt: post.title
  }), /*#__PURE__*/_react.default.createElement("div", {
    className: "card-body"
  }, /*#__PURE__*/_react.default.createElement("h5", {
    className: "card-title"
  }, post.title), /*#__PURE__*/_react.default.createElement("p", {
    className: "card-text post-meta"
  }, /*#__PURE__*/_react.default.createElement(_reactFontawesome.FontAwesomeIcon, {
    icon: _freeSolidSvgIcons.faEye
  }), " ", formatViews(post.views), " views \u2022", /*#__PURE__*/_react.default.createElement(_reactFontawesome.FontAwesomeIcon, {
    icon: _freeSolidSvgIcons.faCalendarAlt
  }), " ", formattedDate, " \u2022", /*#__PURE__*/_react.default.createElement(_reactFontawesome.FontAwesomeIcon, {
    icon: _freeSolidSvgIcons.faClock
  }), " ", post.read_time, " min read"), /*#__PURE__*/_react.default.createElement("div", {
    className: "content_post",
    dangerouslySetInnerHTML: {
      __html: post.content
    }
  }), relatedPosts.length > 0 && /*#__PURE__*/_react.default.createElement("div", {
    className: "related-posts"
  }, /*#__PURE__*/_react.default.createElement("h2", null, "Also Read"), /*#__PURE__*/_react.default.createElement("div", {
    className: "related-posts-container"
  }, relatedPosts.map((relatedPost, index) => /*#__PURE__*/_react.default.createElement("div", {
    className: "related-post-card",
    key: index
  }, /*#__PURE__*/_react.default.createElement(_reactRouterDom.Link, {
    to: `/${post.category_name}/${relatedPost.slug}`
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "image-container"
  }, " ", /*#__PURE__*/_react.default.createElement("img", {
    src: relatedPost.image,
    alt: relatedPost.title
  }), /*#__PURE__*/_react.default.createElement("div", {
    className: "related_read-time-overlay"
  }, relatedPost.read_time, " min read"), " "), /*#__PURE__*/_react.default.createElement("div", {
    className: "post-details"
  }, /*#__PURE__*/_react.default.createElement("h3", {
    className: "post-title"
  }, truncateTitle(relatedPost.title)), /*#__PURE__*/_react.default.createElement("p", {
    className: "post-excerpt"
  }, relatedPost.excerpt))))))), /*#__PURE__*/_react.default.createElement("div", {
    className: "post-category"
  }, /*#__PURE__*/_react.default.createElement("strong", null, "Category:"), " ", post.category_name), post.tag_slugs && /*#__PURE__*/_react.default.createElement("div", {
    className: "post-tags"
  }, /*#__PURE__*/_react.default.createElement("strong", null, "Tags:"), post.tag_slugs.split(',').map((tagSlug, index) => /*#__PURE__*/_react.default.createElement(_reactRouterDom.Link, {
    to: `/tags/${tagSlug}`,
    key: index,
    className: "tag-link"
  }, /*#__PURE__*/_react.default.createElement("span", {
    className: "tag"
  }, post.tag_names.split(',')[index].trim(), index < post.tag_slugs.split(',').length - 1 ? ', ' : '')))), /*#__PURE__*/_react.default.createElement("div", {
    className: "actions"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "action-item",
    onClick: toggleLike
  }, /*#__PURE__*/_react.default.createElement(_reactFontawesome.FontAwesomeIcon, {
    id: "like-btn",
    icon: isLikedByUser ? _freeSolidSvgIcons.faHeart : _freeRegularSvgIcons.faHeart,
    style: {
      color: isLikedByUser ? 'red' : 'inherit'
    }
  })), /*#__PURE__*/_react.default.createElement("span", {
    id: "like-count"
  }, likeCount), /*#__PURE__*/_react.default.createElement("div", {
    className: "action-item",
    onClick: toggleCommentsModal
  }, /*#__PURE__*/_react.default.createElement(_reactFontawesome.FontAwesomeIcon, {
    icon: _freeRegularSvgIcons.faCommentDots
  })), /*#__PURE__*/_react.default.createElement("span", {
    id: "comment-count"
  }, commentCount), /*#__PURE__*/_react.default.createElement("div", {
    className: "action-item",
    onClick: handleBookmarkClick
  }, /*#__PURE__*/_react.default.createElement(_reactFontawesome.FontAwesomeIcon, {
    icon: isBookmarked ? _freeSolidSvgIcons.faBookmark : _freeRegularSvgIcons.faBookmark
  })), /*#__PURE__*/_react.default.createElement("div", {
    className: "action-item",
    onClick: toggleShareOptions
  }, /*#__PURE__*/_react.default.createElement(_reactFontawesome.FontAwesomeIcon, {
    icon: _freeSolidSvgIcons.faShare
  }))), showShareOptions && /*#__PURE__*/_react.default.createElement("div", {
    className: "modal-backdrop",
    onClick: () => setShowShareOptions(false)
  }, " ", /*#__PURE__*/_react.default.createElement("div", {
    className: "share-options-modal",
    onClick: e => e.stopPropagation()
  }, " ", /*#__PURE__*/_react.default.createElement("h2", null, "Share this post"), " ", /*#__PURE__*/_react.default.createElement("div", {
    className: "share-option",
    onClick: () => shareOnSocialMedia('facebook')
  }, /*#__PURE__*/_react.default.createElement(_reactFontawesome.FontAwesomeIcon, {
    icon: _freeBrandsSvgIcons.faFacebookF,
    className: "share-option-icon"
  }), " Share on Facebook"), /*#__PURE__*/_react.default.createElement("div", {
    className: "share-option",
    onClick: () => shareOnSocialMedia('twitter')
  }, /*#__PURE__*/_react.default.createElement(_reactFontawesome.FontAwesomeIcon, {
    icon: _freeBrandsSvgIcons.faTwitter,
    className: "share-option-icon"
  }), " Share on Twitter"), /*#__PURE__*/_react.default.createElement("div", {
    className: "share-option",
    onClick: () => shareOnSocialMedia('whatsapp')
  }, /*#__PURE__*/_react.default.createElement(_reactFontawesome.FontAwesomeIcon, {
    icon: _freeBrandsSvgIcons.faWhatsapp,
    className: "share-option-icon"
  }), " Share on WhatsApp"), /*#__PURE__*/_react.default.createElement("div", {
    className: "share-option",
    onClick: copyLinkToClipboard
  }, /*#__PURE__*/_react.default.createElement(_reactFontawesome.FontAwesomeIcon, {
    icon: _freeSolidSvgIcons.faClipboard,
    className: "share-option-icon"
  }), " Copy Link"))))), /*#__PURE__*/_react.default.createElement(_CommentsModal.default, {
    isOpen: showComments,
    onClose: toggleCommentsModal,
    postId: post.id
  })), topViewedPosts.length > 0 && /*#__PURE__*/_react.default.createElement("div", {
    className: "you-might-like outside-container"
  }, /*#__PURE__*/_react.default.createElement("h2", null, "You Might Like"), /*#__PURE__*/_react.default.createElement("div", {
    className: "top-viewed-posts-container"
  }, topViewedPosts.map((topViewedPost, index) => /*#__PURE__*/_react.default.createElement("div", {
    className: "top-viewed-post-card",
    key: index
  }, /*#__PURE__*/_react.default.createElement(_reactRouterDom.Link, {
    to: `/${topViewedPost.category_slug}/${topViewedPost.slug}`,
    className: "card-link"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "image-container"
  }, " ", /*#__PURE__*/_react.default.createElement("img", {
    src: topViewedPost.image,
    alt: topViewedPost.title,
    className: "top-viewed-post-image"
  }), /*#__PURE__*/_react.default.createElement("div", {
    className: "read-time-overlay"
  }, topViewedPost.read_time, " min read")), /*#__PURE__*/_react.default.createElement("div", {
    className: "text-container"
  }, /*#__PURE__*/_react.default.createElement("h3", {
    className: "top-viewed-post-title"
  }, truncateTitle(topViewedPost.title)), " ", /*#__PURE__*/_react.default.createElement("p", {
    className: "top-viewed-post-category"
  }, topViewedPost.category_name)))))))));
};
var _default = exports.default = NewsDetail;