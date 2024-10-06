import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './newsList.css';
import InfiniteScroll from 'react-infinite-scroll-component';

// Skeleton Loader Component
const SkeletonLoader = () => (
    <div className='skeleton-container'>
        {Array.from({ length: 10 }).map((_, index) => (
            <div key={index} className='card skeleton-card'>
                <div className='skeleton-image'></div>
                <div className='card-content'>
                    <div className='skeleton-title'></div>
                    <div className='skeleton-content'></div>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <div className='skeleton-avatar'></div>
                        <div className='skeleton-username'></div>
                        <div className='skeleton-date'></div>
                    </div>
                </div>
            </div>
        ))}
    </div>
);

// New Loader for Infinite Scroll
const ScrollLoader = () => (

    
    <img src="https://blog.tourismofkashmir.com/kOnzy.gif" alt="Loading..." className="infinite-scroll-loader" />
);
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

// NewsList Component
const NewsList = () => {
    const [posts, setPosts] = useState([]);
    const [hasMore, setHasMore] = useState(true);
    const [page, setPage] = useState(1);
    const initialLoading = useRef(true);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.get(`https://blog.tourismofkashmir.com/apis?posts&page=${page}`);
                const newData = response.data;
                if (!Array.isArray(newData) || newData.length === 0) {
                    setHasMore(false);
                } else {
                    setPosts(prevPosts => [...prevPosts, ...newData]);
                }
                if (initialLoading.current) initialLoading.current = false;
            } catch (error) {
                console.error("Error fetching posts:", error);
            }
        };
    
        fetchPosts();
    }, [page]); // Only 'page' is a dependency now

    const fetchMoreData = () => {
        setPage(prevPage => prevPage + 1);
    };
    const truncateText = (text, maxWords) => {
        const wordsArray = text.split(' ');
        if (wordsArray.length > maxWords) {
            return wordsArray.slice(0, maxWords).join(' ') + '...';
        }
        return text;
    };
    return (
        <InfiniteScroll
            dataLength={posts.length}
            next={fetchMoreData}
            hasMore={hasMore}
            loader={initialLoading.current ? <SkeletonLoader /> : <ScrollLoader />}
            endMessage={<div style={{ textAlign: "center", marginTop: "20px", color: "#999" }}>No more posts found.</div>}
        >
            <div className="news-list">
                {posts.map(post => (
                    <div key={post.id} className='card' onContextMenu={(e) => e.preventDefault()}>
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
                            <h2>{truncateText(post.title, 10)}</h2> {/* For example, limiting to 10 words */}
                            <p>{truncateText(post.meta_description, 20)}</p> {/* Limiting to 20 words */}
                           
                            </div>
                        </Link>
                        <div style={{ display: 'flex', alignItems: 'center', marginBottom:'5px'  }}>
                        <Link to={`/profile/${post.username}`} style={{ textDecoration: 'none', color: 'inherit',display: 'flex', alignItems: 'center', }}>
    <img src={`https://blog.tourismofkashmir.com/${post.avatar}`} alt='Avatar' className='avatar' style={{ width: '30px', height: '30px', borderRadius: '50%', marginRight: '5px' }} />
    <span className='username'>{post.username}</span>
</Link>
                            <span className='views'>. {formatViews(post.views)} views</span>
                            <span className='date'>{formatDate(post.created_at)}</span>
                        </div>
                    </div>
                ))}
            </div>
        </InfiniteScroll>
    );
};

export default NewsList;