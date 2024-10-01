import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faFolder } from '@fortawesome/free-solid-svg-icons';
import './ProfilePage.scss'; // Import CSS file for styling

const ProfilePage = () => {
  const { username } = useParams();
  const [userData, setUserData] = useState(null);
  const [userPosts, setUserPosts] = useState([]);
  const [followersCount, setFollowersCount] = useState(0);
  const [followingCount, setFollowingCount] = useState(0);
  const [isFollowing, setIsFollowing] = useState(null); // null indicates 'unknown' until data is loaded
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUserID, setCurrentUserID] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // Added isLoading state

  useEffect(() => {
    // Check if user is logged in and get their ID
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      setIsLoggedIn(true);
      setCurrentUserID(user.id);
      console.debug('User logged in:', user);
    }
  }, []);

  useEffect(() => {
    const fetchUserData = async () => {
      setIsLoading(true); // Set loading to true at the start of the fetch operation
      try {
        const response = await axios.get(`https://blog.tourismofkashmir.com/api_profile.php?username=${username}&requesting_user_id=${currentUserID}`);
        const { user, posts, is_following, followers_count, following_count } = response.data;
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
      await axios.get(`https://blog.tourismofkashmir.com/api_followandunfollow.php?follow=true&follower_id=${currentUserID}&followee_id=${userData.id}`);
      setIsFollowing(true);
      setFollowersCount(prevCount => prevCount + 1); // Update follower count locally
    } catch (error) {
      console.error('Error following user:', error);
    }
  };

  const handleUnfollow = async () => {
    // Perform unfollow action
    try {
      await axios.get(`https://blog.tourismofkashmir.com/api_followandunfollow.php?removefollower=true&follower_id=${currentUserID}&followee_id=${userData.id}`);
      setIsFollowing(false);
      setFollowersCount(prevCount => prevCount - 1); // Update follower count locally
    } catch (error) {
      console.error('Error unfollowing user:', error);
    }
  };
  const formatViews = (views) => {
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
    return (
      <div className="article-card custom-skeleton-wrapper">
        <div className="article-thumbnail custom-skeleton-thumbnail"></div>
        <div className="article-details custom-skeleton-content">
          <div className="article-title custom-skeleton-title"></div>
          <div className="custom-skeleton-text"></div>
        </div>
      </div>
    );
  };
  
  // Render loading message while waiting for data
  if (isLoading) {
    return (
      <div className="profile-page-container">
      <div className="profile-header">
        <div className="custom-skeleton-wrapper">
          <div className='profilesk-info'>
          <div className="custom-skeleton-avatar"></div>
          
            <div className="profile-username custom-skeleton-line"></div>
            <div className="custom-skeleton-line"></div>
     
          <div className="custom-skeleton-button"></div>
          </div>
        </div>
      </div>
      <div className="post-list">
        <CustomSkeletonPost />
        <CustomSkeletonPost />
        <CustomSkeletonPost />
      </div>
    </div>
    
    );
  }
  

  return (
    <div className="profile-page-container">
      {userData && (
        <div className="profile-header">
          <img src={userData.avatar} alt="User Avatar" className="profile-avatar" />
          <div className="profile-info">
            <h1 className="profile-username">{userData.username}</h1>
            <p className="profile-follow-count">Followers: {followersCount} | Following: {followingCount}</p>
            {isLoggedIn ? (
              <React.Fragment>
                {isFollowing !== null && ( // Only render buttons if isFollowing state is not null
                  <React.Fragment>
                    {isFollowing ? (
                      <button className="unfollow-button" onClick={handleUnfollow}>Unfollow</button>
                    ) : (
                      <button className="follow-button" onClick={handleFollow}>Follow</button>
                    )}
                  </React.Fragment>
                )}
              </React.Fragment>
            ) : (
                <Link to="/login" style={{ textDecoration: 'none' }}>
                <button className="login-to-follow-button">Login to Follow</button>
              </Link>
            )}
          </div>
        </div>
      )}
      <div className="post-list">
        <h2 className="post-list-header">{userData && `${userData.username}'s Posts`}</h2>
        <div className="article-cards">
          {userPosts.map(post => (
            <Link key={post.id} to={`/${post.category_slug}/${post.post_slug}`} className="post-link">
              <div className="article-card">
  <div className="image-container">
    <img src={post.image} alt="Article Thumbnail" className="article-thumbnail" />
    <div className="overlay">{post.read_time} min read</div>
  </div>
  <div className="article-details">
    <h3 className="article-title">{post.title}</h3>
    <div className="post-info">
  <p>
    <FontAwesomeIcon icon={faEye} /> {formatViews(post.views)} Views
  </p>
  <p>
    <FontAwesomeIcon icon={faFolder} /> {post.category_name}
  </p>
</div>

  </div>
</div>

            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
