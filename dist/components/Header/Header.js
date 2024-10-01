"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactRouterDom = require("react-router-dom");
require("./header.css");
var _reactFontawesome = require("@fortawesome/react-fontawesome");
var _freeSolidSvgIcons = require("@fortawesome/free-solid-svg-icons");
var _UserDropdown = _interopRequireDefault(require("./UserDropdown"));
var _NotificationDropdown = _interopRequireDefault(require("./NotificationDropdown"));
var _SearchModal = _interopRequireDefault(require("./SearchModal"));
var _userAvatar = _interopRequireDefault(require("./user-avatar.png"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const Header = () => {
  const [avatarUrl, setAvatarUrl] = (0, _react.useState)('');
  const [isMenuOpen, setMenuOpen] = (0, _react.useState)(false);
  const [isDropdownOpen, setDropdownOpen] = (0, _react.useState)(false);
  const [isSearchModalOpen, setSearchModalOpen] = (0, _react.useState)(false);
  const [isNotificationOpen, setNotificationOpen] = (0, _react.useState)(false);
  const [notifications, setNotifications] = (0, _react.useState)([]);
  const [isLoggedIn, setIsLoggedIn] = (0, _react.useState)(false);
  const [userId, setUserId] = (0, _react.useState)(null);
  const [unreadNotificationCount, setUnreadNotificationCount] = (0, _react.useState)(0);
  const [lastScrollY, setLastScrollY] = (0, _react.useState)(window.scrollY);
  const [headerVisible, setHeaderVisible] = (0, _react.useState)(true);
  const location = (0, _reactRouterDom.useLocation)();
  const handleScroll = (0, _react.useCallback)(() => {
    const currentScrollY = window.scrollY;

    // Only start applying logic when scrolling down more than 30 pixels
    if (currentScrollY > 70) {
      // Hide header when scrolling down, show when scrolling up
      setHeaderVisible(currentScrollY < lastScrollY);
    }
    setLastScrollY(currentScrollY); // Update the last scroll position
  }, [lastScrollY]);
  (0, _react.useEffect)(() => {
    window.addEventListener('scroll', handleScroll, {
      passive: true
    });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);
  (0, _react.useEffect)(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      setIsLoggedIn(true);
      setUserId(user.id);
      console.debug('User logged in:', user);
    }
  }, []);
  (0, _react.useEffect)(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      setIsLoggedIn(true);
      setUserId(user.id);
      setAvatarUrl(user.avatar); // Assuming 'avatar' is the key for the avatar URL in the stored user data
      console.debug('User logged in:', user);
    }
  }, []);
  const fetchNotifications = (0, _react.useCallback)(() => {
    if (userId) {
      console.debug('Fetching notifications for user ID:', userId);
      fetch(`http://blog.tourismofkashmir.com/apinotification.php?get_notifications&user_id=${userId}`).then(response => response.json()).then(data => {
        setNotifications(data);
        console.debug('Fetched notifications:', data);
      }).catch(error => {
        console.error('Error fetching notifications:', error);
      });
    }
  }, [userId]);
  const fetchUnreadNotificationCount = (0, _react.useCallback)(() => {
    if (userId) {
      fetch(`http://blog.tourismofkashmir.com/apinotification.php?get_notifications&user_id=${userId}&is_read=false`).then(response => response.json()).then(data => {
        setUnreadNotificationCount(data.length);
        console.debug('Fetched unread notification count:', data.length);
      }).catch(error => {
        console.error('Error fetching unread notification count:', error);
      });
    }
  }, [userId]);
  (0, _react.useEffect)(() => {
    fetchNotifications();
    fetchUnreadNotificationCount();
    const notificationsInterval = setInterval(fetchNotifications, 60000);
    const unreadCountInterval = setInterval(fetchUnreadNotificationCount, 60000);
    return () => {
      clearInterval(notificationsInterval);
      clearInterval(unreadCountInterval);
    };
  }, [fetchNotifications, fetchUnreadNotificationCount]);
  (0, _react.useEffect)(() => {
    const handleOutsideClick = event => {
      if (!event.target.closest('.notification-icon') && !event.target.closest('.notification-dropdown') && !event.target.closest('.user-icon') && !event.target.closest('.user-dropdown')) {
        setNotificationOpen(false);
        setDropdownOpen(false);
      }
    };
    document.body.addEventListener('click', handleOutsideClick);
    document.body.addEventListener('touchstart', handleOutsideClick);
    return () => {
      document.body.removeEventListener('click', handleOutsideClick);
      document.body.removeEventListener('touchstart', handleOutsideClick);
    };
  }, []);
  const toggleMenu = () => {
    console.debug('Toggling menu...');
    setMenuOpen(!isMenuOpen);
  };
  const toggleDropdown = () => {
    console.debug('Toggling dropdown...');
    setDropdownOpen(!isDropdownOpen);
  };
  const toggleSearchModal = () => {
    console.debug('Toggling search modal...');
    setSearchModalOpen(!isSearchModalOpen);
  };
  const toggleNotification = () => {
    console.debug('Toggling notification...');
    setNotificationOpen(!isNotificationOpen);
    if (!isNotificationOpen && isLoggedIn && userId) {
      fetch(`http://blog.tourismofkashmir.com/apinotification.php?update_all_notifications=1&user_id=${userId}`, {
        method: 'GET'
      }).then(response => response.json()).then(data => {
        console.debug('Updated all notifications:', data);
        fetchUnreadNotificationCount(); // Fetch the updated count of unread notifications after marking them read
      }).catch(error => {
        console.error('Error updating all notifications:', error);
      });
    }
  };
  const debounce = (fn, delay) => {
    let timeoutID = null;
    return function () {
      clearTimeout(timeoutID);
      let args = arguments;
      let that = this;
      timeoutID = setTimeout(() => {
        fn.apply(that, args);
      }, delay);
    };
  };
  const debouncedToggleDropdown = debounce(toggleDropdown, 100);
  const deleteNotification = notificationId => {
    console.debug('Deleting notification with ID:', notificationId);
    if (isLoggedIn && userId) {
      fetch(`http://blog.tourismofkashmir.com/apinotification.php?delete_notification=true&user_id=${userId}&notification_id=${notificationId}`, {
        method: 'GET' // Ideally, this should be a DELETE request.
      }).then(response => response.json()).then(data => {
        console.debug('Notification deleted:', data);
        const updatedNotifications = notifications.filter(notification => notification.id !== notificationId);
        setNotifications(updatedNotifications); // Update the notifications state
        fetchUnreadNotificationCount(); // Update unread count after deletion
      }).catch(error => {
        console.error('Error deleting notification:', error);
      });
    }
  };
  const handleNotificationClick = () => {
    setNotificationOpen(false);
  };
  const handleUserDropdownClick = () => {
    setDropdownOpen(false);
  };
  (0, _react.useEffect)(() => {
    // Reset header visibility to true on every route change
    setHeaderVisible(true);
  }, [location]); // Dependency array includes location to trigger effect on route change

  return /*#__PURE__*/_react.default.createElement("header", {
    style: {
      top: headerVisible ? '0' : '-100px',
      transition: 'top 0.3s'
    }
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "custom-header"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "menu-and-logo"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: `menu-icon ${isMenuOpen ? 'change' : ''}`,
    onClick: toggleMenu
  }, /*#__PURE__*/_react.default.createElement("span", null), /*#__PURE__*/_react.default.createElement("span", null), /*#__PURE__*/_react.default.createElement("span", null)), /*#__PURE__*/_react.default.createElement("div", {
    className: "logo"
  }, /*#__PURE__*/_react.default.createElement(_reactRouterDom.Link, {
    to: "/",
    className: "logo-link"
  }, "Leak News"))), /*#__PURE__*/_react.default.createElement("div", {
    className: "header-icons"
  }, unreadNotificationCount > 0 && /*#__PURE__*/_react.default.createElement("span", {
    className: "notification-badge"
  }, unreadNotificationCount), /*#__PURE__*/_react.default.createElement(_reactFontawesome.FontAwesomeIcon, {
    icon: _freeSolidSvgIcons.faBell,
    className: "icon notification-icon",
    onClick: toggleNotification
  }), /*#__PURE__*/_react.default.createElement(_reactFontawesome.FontAwesomeIcon, {
    icon: _freeSolidSvgIcons.faSearch,
    className: "icon search-icon",
    onClick: toggleSearchModal
  }), /*#__PURE__*/_react.default.createElement("img", {
    src: isLoggedIn && avatarUrl ? avatarUrl : _userAvatar.default,
    alt: "User Avatar",
    className: "icon user-icon",
    onClick: debouncedToggleDropdown
  })), isDropdownOpen && /*#__PURE__*/_react.default.createElement(_UserDropdown.default, {
    isLoggedIn: isLoggedIn,
    onClose: handleUserDropdownClick
  }), isNotificationOpen && /*#__PURE__*/_react.default.createElement(_NotificationDropdown.default, {
    notifications: notifications,
    onDelete: deleteNotification,
    onClose: handleNotificationClick
  }), /*#__PURE__*/_react.default.createElement("div", {
    className: `side-menu ${isMenuOpen ? 'open' : ''}`
  }, /*#__PURE__*/_react.default.createElement("ul", null, /*#__PURE__*/_react.default.createElement("li", null, /*#__PURE__*/_react.default.createElement(_reactRouterDom.Link, {
    to: "/",
    onClick: toggleMenu
  }, "Home")), /*#__PURE__*/_react.default.createElement("li", null, /*#__PURE__*/_react.default.createElement(_reactRouterDom.Link, {
    to: "/about",
    onClick: toggleMenu
  }, "About")), /*#__PURE__*/_react.default.createElement("li", null, /*#__PURE__*/_react.default.createElement(_reactRouterDom.Link, {
    to: "/contact",
    onClick: toggleMenu
  }, "Contact")), /*#__PURE__*/_react.default.createElement("li", null, /*#__PURE__*/_react.default.createElement(_reactRouterDom.Link, {
    to: "/bookmark",
    onClick: toggleMenu
  }, "Bookmark")))), isSearchModalOpen && /*#__PURE__*/_react.default.createElement(_SearchModal.default, {
    onClose: () => setSearchModalOpen(false)
  })));
};
var _default = exports.default = Header;