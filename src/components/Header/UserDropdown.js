import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faCog, faSignOutAlt, faSignInAlt } from '@fortawesome/free-solid-svg-icons';
import './UserDropdown.css';

const UserDropdown = ({ onClose }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem('user'));
        if (storedUser) {
            setUser(storedUser);
        }
    }, []);

    return (
        <div className="user-dropdown">
            <ul>
                {user ? (
                    <>
                        {/* Use template literal to dynamically set the profile link */}
                        <li><Link to={`/profile/${user.username}`} onClick={onClose}><FontAwesomeIcon icon={faUser} /> Profile</Link></li>
                        <li><Link to="/settings" onClick={onClose}><FontAwesomeIcon icon={faCog} /> Settings</Link></li>
                        <li>
                            <Link to="/login" onClick={() => {
                                localStorage.removeItem('user');
                                setUser(null);
                                onClose();
                            }}><FontAwesomeIcon icon={faSignOutAlt} /> Logout</Link>
                        </li>
                    </>
                ) : (
                    <li><Link to="/login" onClick={onClose}><FontAwesomeIcon icon={faSignInAlt} /> Login</Link></li>
                )}
            </ul>
        </div>
    );
};

export default UserDropdown;
