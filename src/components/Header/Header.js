import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import './header.css';
import { useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faBell } from '@fortawesome/free-solid-svg-icons';
import UserDropdown from './UserDropdown';
import NotificationDropdown from './NotificationDropdown';
import SearchModal from './SearchModal';
import userAvatarIcon from './user-avatar.png'; 

const Header = () => {
    const [avatarUrl, setAvatarUrl] = useState('');
    const [isMenuOpen, setMenuOpen] = useState(false);
    const [isDropdownOpen, setDropdownOpen] = useState(false);
    const [isSearchModalOpen, setSearchModalOpen] = useState(false);
    const [isNotificationOpen, setNotificationOpen] = useState(false);
    const [notifications, setNotifications] = useState([]);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userId, setUserId] = useState(null);
    const [unreadNotificationCount, setUnreadNotificationCount] = useState(0);
    const [lastScrollY, setLastScrollY] = useState(window.scrollY);
    const [headerVisible, setHeaderVisible] = useState(true);
    const location = useLocation();

    const handleScroll = useCallback(() => {
        const currentScrollY = window.scrollY;
    
        // Only start applying logic when scrolling down more than 30 pixels
        if (currentScrollY > 70) {
            // Hide header when scrolling down, show when scrolling up
            setHeaderVisible(currentScrollY < lastScrollY);
        }
    
        setLastScrollY(currentScrollY); // Update the last scroll position
    }, [lastScrollY]);
    
    useEffect(() => {
        window.addEventListener('scroll', handleScroll, { passive: true });

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [handleScroll]);

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
            setIsLoggedIn(true);
            setUserId(user.id);
            console.debug('User logged in:', user);
        }
    }, []);
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
            setIsLoggedIn(true);
            setUserId(user.id);
            setAvatarUrl(user.avatar); // Assuming 'avatar' is the key for the avatar URL in the stored user data
            console.debug('User logged in:', user);
        }
    }, []);
    const fetchNotifications = useCallback(() => {
        if (userId) {
            console.debug('Fetching notifications for user ID:', userId);
            fetch(`http://blog.tourismofkashmir.com/apinotification.php?get_notifications&user_id=${userId}`)
                .then(response => response.json())
                .then(data => {
                    setNotifications(data);
                    console.debug('Fetched notifications:', data);
                })
                .catch(error => {
                    console.error('Error fetching notifications:', error);
                });
        }
    }, [userId]);

    const fetchUnreadNotificationCount = useCallback(() => {
        if (userId) {
            fetch(`http://blog.tourismofkashmir.com/apinotification.php?get_notifications&user_id=${userId}&is_read=false`)
                .then(response => response.json())
                .then(data => {
                    setUnreadNotificationCount(data.length);
                    console.debug('Fetched unread notification count:', data.length);
                })
                .catch(error => {
                    console.error('Error fetching unread notification count:', error);
                });
        }
    }, [userId]);

    useEffect(() => {
        fetchNotifications();
        fetchUnreadNotificationCount();

        const notificationsInterval = setInterval(fetchNotifications, 60000);
        const unreadCountInterval = setInterval(fetchUnreadNotificationCount, 60000);

        return () => {
            clearInterval(notificationsInterval);
            clearInterval(unreadCountInterval);
        };
    }, [fetchNotifications, fetchUnreadNotificationCount]);

    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (
                !event.target.closest('.notification-icon') &&
                !event.target.closest('.notification-dropdown') &&
                !event.target.closest('.user-icon') &&
                !event.target.closest('.user-dropdown')
            ) {
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
            })
            .then(response => response.json())
            .then(data => {
                console.debug('Updated all notifications:', data);
                fetchUnreadNotificationCount(); // Fetch the updated count of unread notifications after marking them read
            })
            .catch(error => {
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

    const deleteNotification = (notificationId) => {
        console.debug('Deleting notification with ID:', notificationId);
        if (isLoggedIn && userId) {
            fetch(`http://blog.tourismofkashmir.com/apinotification.php?delete_notification=true&user_id=${userId}&notification_id=${notificationId}`, {
                method: 'GET' // Ideally, this should be a DELETE request.
            })
            .then(response => response.json())
            .then(data => {
                console.debug('Notification deleted:', data);
                const updatedNotifications = notifications.filter(notification => notification.id !== notificationId);
                setNotifications(updatedNotifications); // Update the notifications state
                fetchUnreadNotificationCount(); // Update unread count after deletion
            })
            .catch(error => {
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
 useEffect(() => {
        // Reset header visibility to true on every route change
        setHeaderVisible(true);
    }, [location]); // Dependency array includes location to trigger effect on route change

    return (
        <header style={{ top: headerVisible ? '0' : '-100px', transition: 'top 0.3s' }}>
        <div className="custom-header">
            <div className="menu-and-logo">
                <div className={`menu-icon ${isMenuOpen ? 'change' : ''}`} onClick={toggleMenu}>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
                <div className="logo">
                    <Link to="/" className="logo-link">Leak News</Link>
                </div>
            </div>

            <div className="header-icons">
            {unreadNotificationCount > 0 && <span className="notification-badge">{unreadNotificationCount}</span>}
              
                    <FontAwesomeIcon icon={faBell} className="icon notification-icon" onClick={toggleNotification}/>
                    
             
                
                <FontAwesomeIcon icon={faSearch} className="icon search-icon" onClick={toggleSearchModal} />
                <img 
  src={isLoggedIn && avatarUrl ? avatarUrl : userAvatarIcon} 
  alt="User Avatar" 
  className="icon user-icon" 
  onClick={debouncedToggleDropdown} 
/>



            </div>

            {isDropdownOpen && <UserDropdown isLoggedIn={isLoggedIn} onClose={handleUserDropdownClick} />}
            {isNotificationOpen && <NotificationDropdown notifications={notifications} onDelete={deleteNotification} onClose={handleNotificationClick} />}

            <div className={`side-menu ${isMenuOpen ? 'open' : ''}`}>
                <ul>
                    <li><Link to="/" onClick={toggleMenu}>Home</Link></li>
                    <li><Link to="/about" onClick={toggleMenu}>About</Link></li>
                    <li><Link to="/contact" onClick={toggleMenu}>Contact</Link></li>
                    <li><Link to="/bookmark" onClick={toggleMenu}>Bookmark</Link></li>
                </ul>
            </div>

            {isSearchModalOpen && <SearchModal onClose={() => setSearchModalOpen(false)} />}
            </div>
        </header>
    );
};

export default Header;