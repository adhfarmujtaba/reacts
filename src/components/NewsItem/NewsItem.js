import React from 'react';
import { Link } from 'react-router-dom';
import './newsItem.css';

const formatViews = (views) => {
    if (views >= 10000000) {
        return Math.floor(views / 10000000) + 'cr';
    } else if (views >= 1000000) {
        return Math.floor(views / 1000000) + 'M';
    } else if (views >= 100000) {
        return Math.floor(views / 1000) + 'k';
    } else {
        return views;
    }
};

const formatDate = (date) => {
    const currentDate = new Date();
    const postDate = new Date(date);

    const yearsDifference = currentDate.getFullYear() - postDate.getFullYear();
    const monthsDifference = currentDate.getMonth() - postDate.getMonth();
    const daysDifference = currentDate.getDate() - postDate.getDate();

    // Calculate total months considering year difference
    const totalMonths = yearsDifference * 12 + monthsDifference;

    // Adjust month calculation if current date's day is less than post date's day
    const adjustedMonths = daysDifference < 0 ? totalMonths - 1 : totalMonths;

    const timeDifference = currentDate - postDate;
    const seconds = Math.floor(timeDifference / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (seconds < 60) {
        return seconds + ' sec ago';
    } else if (minutes < 60) {
        return minutes + ' mins ago';
    } else if (hours < 24) {
        return hours + ' hours ago';
    } else if (days < 7) {
        return days + ' days ago';
    } else if (days < 30) {
        const weeks = Math.floor(days / 7);
        return weeks + ' weeks ago';
    } else if (adjustedMonths < 12) {
        return adjustedMonths + ' months ago';
    } else {
        return yearsDifference + ' years ago';
    }
};


const NewsItem = ({ post }) => {
    return (
       
            <div className='card' onContextMenu={(e) => e.preventDefault()}>
            <Link to={`/${post.category_slug}/${post.slug}/`} className="news-item-link">

                    <div className="image-container" style={{ position: "relative" }}>
                        <img
                            src={post.image}
                            alt={post.title}
                            className="news-item-image"
                            style={{ width: "100%", height: "180px", objectFit: "cover" }}
                        />
                        <div
                            style={{
                                position: "absolute",
                                bottom: "10px",
                                right: "10px",
                                backgroundColor: "rgba(0, 0, 0, 0.5)",
                                color: "white",
                                padding: "5px",
                                borderRadius: "5px",
                                fontSize: "0.8rem",
                            }}
                        >
                             {post.read_time} min read
                        </div>
                    </div>
                    <div className='card-content'>
                        <h2>{post.title}</h2>
                        <p><strong></strong>{post.meta_description}</p>
                    </div>
                </Link>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <img src={`https://blog.tourismofkashmir.com/${post.avatar}`} alt='Avatar' className='avatar' style={{ width: '30px', height: '30px', borderRadius: '50%', marginRight: '5px' }} />
                    <span className='username'>{post.username}</span>
                    <span className='views'>. {formatViews(post.views)} views</span>
                    <span className='date'>{formatDate(post.created_at)}</span>
                </div>
            </div>
 
    );
};

export default NewsItem;