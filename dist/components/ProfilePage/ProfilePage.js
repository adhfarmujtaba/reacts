"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactRouterDom = require("react-router-dom");
var _axios = _interopRequireDefault(require("axios"));
var _reactFontawesome = require("@fortawesome/react-fontawesome");
var _freeSolidSvgIcons = require("@fortawesome/free-solid-svg-icons");
require("./ProfilePage.scss");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
// Import CSS file for styling

const ProfilePage = () => {
  const {
    username
  } = (0, _reactRouterDom.useParams)();
  const [userData, setUserData] = (0, _react.useState)(null);
  const [userPosts, setUserPosts] = (0, _react.useState)([]);
  const [followersCount, setFollowersCount] = (0, _react.useState)(0);
  const [followingCount, setFollowingCount] = (0, _react.useState)(0);
  const [isFollowing, setIsFollowing] = (0, _react.useState)(null); // null indicates 'unknown' until data is loaded
  const [isLoggedIn, setIsLoggedIn] = (0, _react.useState)(false);
  const [currentUserID, setCurrentUserID] = (0, _react.useState)(null);
  const [isLoading, setIsLoading] = (0, _react.useState)(true); // Added isLoading state

  (0, _react.useEffect)(() => {
    // Check if user is logged in and get their ID
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      setIsLoggedIn(true);
      setCurrentUserID(user.id);
      console.debug('User logged in:', user);
    }
  }, []);
  (0, _react.useEffect)(() => {
    const fetchUserData = async () => {
      setIsLoading(true); // Set loading to true at the start of the fetch operation
      try {
        const response = await _axios.default.get(`https://blog.tourismofkashmir.com/api_profile.php?username=${username}&requesting_user_id=${currentUserID}`);
        const {
          user,
          posts,
          is_following,
          followers_count,
          following_count
        } = response.data;
        setUserData(user);
        setUserPosts(posts);
        setFollowersCount(followers_count);
        setFollowingCount(following_count);
        setIsFollowing(is_following); // Ensure this is set based on the response
        setIsLoading(false); // Set loading to false after successful fetch
      } catch (error) {
        console.error('Error fetching user data:', error);
        setIsLoading(false); // Ensure loading is set to false even if there's an error
      }
    };
    fetchUserData();
  }, [username, currentUserID]); // Depend on username and currentUserID

  const handleFollow = async () => {
    // Perform follow action
    try {
      await _axios.default.get(`https://blog.tourismofkashmir.com/api_followandunfollow.php?follow=true&follower_id=${currentUserID}&followee_id=${userData.id}`);
      setIsFollowing(true);
      setFollowersCount(prevCount => prevCount + 1); // Update follower count locally
    } catch (error) {
      console.error('Error following user:', error);
    }
  };
  const handleUnfollow = async () => {
    // Perform unfollow action
    try {
      await _axios.default.get(`https://blog.tourismofkashmir.com/api_followandunfollow.php?removefollower=true&follower_id=${currentUserID}&followee_id=${userData.id}`);
      setIsFollowing(false);
      setFollowersCount(prevCount => prevCount - 1); // Update follower count locally
    } catch (error) {
      console.error('Error unfollowing user:', error);
    }
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
      return views;
    }
  };
  const CustomSkeletonPost = () => {
    return /*#__PURE__*/_react.default.createElement("div", {
      className: "article-card custom-skeleton-wrapper"
    }, /*#__PURE__*/_react.default.createElement("div", {
      className: "article-thumbnail custom-skeleton-thumbnail"
    }), /*#__PURE__*/_react.default.createElement("div", {
      className: "article-details custom-skeleton-content"
    }, /*#__PURE__*/_react.default.createElement("div", {
      className: "article-title custom-skeleton-title"
    }), /*#__PURE__*/_react.default.createElement("div", {
      className: "custom-skeleton-text"
    })));
  };

  // Render loading message while waiting for data
  if (isLoading) {
    return /*#__PURE__*/_react.default.createElement("div", {
      className: "profile-page-container"
    }, /*#__PURE__*/_react.default.createElement("div", {
      className: "profile-header"
    }, /*#__PURE__*/_react.default.createElement("div", {
      className: "custom-skeleton-wrapper"
    }, /*#__PURE__*/_react.default.createElement("div", {
      className: "profilesk-info"
    }, /*#__PURE__*/_react.default.createElement("div", {
      className: "custom-skeleton-avatar"
    }), /*#__PURE__*/_react.default.createElement("div", {
      className: "profile-username custom-skeleton-line"
    }), /*#__PURE__*/_react.default.createElement("div", {
      className: "custom-skeleton-line"
    }), /*#__PURE__*/_react.default.createElement("div", {
      className: "custom-skeleton-button"
    })))), /*#__PURE__*/_react.default.createElement("div", {
      className: "post-list"
    }, /*#__PURE__*/_react.default.createElement(CustomSkeletonPost, null), /*#__PURE__*/_react.default.createElement(CustomSkeletonPost, null), /*#__PURE__*/_react.default.createElement(CustomSkeletonPost, null)));
  }
  return /*#__PURE__*/_react.default.createElement("div", {
    className: "profile-page-container"
  }, userData && /*#__PURE__*/_react.default.createElement("div", {
    className: "profile-header"
  }, /*#__PURE__*/_react.default.createElement("img", {
    src: userData.avatar,
    alt: "User Avatar",
    className: "profile-avatar"
  }), /*#__PURE__*/_react.default.createElement("div", {
    className: "profile-info"
  }, /*#__PURE__*/_react.default.createElement("h1", {
    className: "profile-username"
  }, userData.username), /*#__PURE__*/_react.default.createElement("p", {
    className: "profile-follow-count"
  }, "Followers: ", followersCount, " | Following: ", followingCount), isLoggedIn ? /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, isFollowing !== null &&
  /*#__PURE__*/
  // Only render buttons if isFollowing state is not null
  _react.default.createElement(_react.default.Fragment, null, isFollowing ? /*#__PURE__*/_react.default.createElement("button", {
    className: "unfollow-button",
    onClick: handleUnfollow
  }, "Unfollow") : /*#__PURE__*/_react.default.createElement("button", {
    className: "follow-button",
    onClick: handleFollow
  }, "Follow"))) : /*#__PURE__*/_react.default.createElement(_reactRouterDom.Link, {
    to: "/login",
    style: {
      textDecoration: 'none'
    }
  }, /*#__PURE__*/_react.default.createElement("button", {
    className: "login-to-follow-button"
  }, "Login to Follow")))), /*#__PURE__*/_react.default.createElement("div", {
    className: "post-list"
  }, /*#__PURE__*/_react.default.createElement("h2", {
    className: "post-list-header"
  }, userData && `${userData.username}'s Posts`), /*#__PURE__*/_react.default.createElement("div", {
    className: "article-cards"
  }, userPosts.map(post => /*#__PURE__*/_react.default.createElement(_reactRouterDom.Link, {
    key: post.id,
    to: `/${post.category_slug}/${post.post_slug}`,
    className: "post-link"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "article-card"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "image-container"
  }, /*#__PURE__*/_react.default.createElement("img", {
    src: post.image,
    alt: "Article Thumbnail",
    className: "article-thumbnail"
  }), /*#__PURE__*/_react.default.createElement("div", {
    className: "overlay"
  }, post.read_time, " min read")), /*#__PURE__*/_react.default.createElement("div", {
    className: "article-details"
  }, /*#__PURE__*/_react.default.createElement("h3", {
    className: "article-title"
  }, post.title), /*#__PURE__*/_react.default.createElement("div", {
    className: "post-info"
  }, /*#__PURE__*/_react.default.createElement("p", null, /*#__PURE__*/_react.default.createElement(_reactFontawesome.FontAwesomeIcon, {
    icon: _freeSolidSvgIcons.faEye
  }), " ", formatViews(post.views), " Views"), /*#__PURE__*/_react.default.createElement("p", null, /*#__PURE__*/_react.default.createElement(_reactFontawesome.FontAwesomeIcon, {
    icon: _freeSolidSvgIcons.faFolder
  }), " ", post.category_name)))))))));
};
var _default = exports.default = ProfilePage;