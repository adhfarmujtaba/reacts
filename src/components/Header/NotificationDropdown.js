import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { formatDistanceToNow } from 'date-fns'; // For date formatting
import { Link } from 'react-router-dom';
import './NotificationDropdown.css';

const NotificationDropdown = ({ notifications, onDelete, onClose }) => {
    const handleNotificationClick = () => {
        onClose();
    };

    return (
        <div id="notificationDropdown" className="notification-dropdown open">
            <ul className="notification-list">
                {notifications.length > 0 ? (
                    notifications.map(notification => (
                        <li key={notification.id} className={`notification-item ${notification.is_read ? '' : 'unread'}`}>
                            <Link
                                to={notification.url}
                                className="notification-link"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleNotificationClick();
                                }}
                            >
                                <div className="notification-info">
                                    {/* Render username and avatar if available */}
                                    {notification.fromUsername && (
                                        <div className="notification-user">
                                            <img src={notification.fromAvatar} alt="User Avatar" className="notification-avatar" />
                                            <span className="notification-username">{notification.fromUsername}</span>
                                        </div>
                                    )}
                                    <span className="notification-message">{notification.message}</span>
                                    <span className="notification-date">
                                        {formatDistanceToNow(new Date(notification.created_at), { addSuffix: true })}
                                    </span>
                                </div>
                            </Link>
                            <FontAwesomeIcon
                                icon={faXmark}
                                className="notification-close"
                                onClick={(e) => {
                                    e.stopPropagation(); // Prevent navigation
                                    onDelete(notification.id); // Assuming you pass an onDelete function to handle this
                                }}
                            />
                        </li>
                    ))
                ) : (
                    <li>No notifications</li>
                )}
            </ul>
        </div>
    );
};

export default NotificationDropdown;
