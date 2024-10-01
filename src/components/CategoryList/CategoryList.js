import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroll-component';
import Loader from './Loader'; // Initial Loader
import { formatViews, formatDate } from './utils';
import './CategoryList.css';

// New Loader for Infinite Scroll
const ScrollLoader = () => (
    <img src="https://blog.tourismofkashmir.com/kOnzy.gif" alt="Loading..." className="infinite-scroll-loader" />
);

const CategoryList = () => {
    const [categoryPosts, setCategoryPosts] = useState([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [isEmpty, setIsEmpty] = useState(false);
    const [isInitialLoad, setIsInitialLoad] = useState(true); // State to track the initial load
    const { categorySlug } = useParams();

    const fetchCategoryPosts = useCallback(async (pageNum) => {
        try {
            const response = await axios.get(`https://blog.tourismofkashmir.com/apis?category_slug=${categorySlug}&page=${pageNum}`);
            const newPosts = response.data;
            if (Array.isArray(newPosts) && newPosts.length > 0) {
                setCategoryPosts((prevPosts) => [...prevPosts, ...newPosts]);
                setIsEmpty(false);
            } else if (pageNum === 1 && newPosts.length === 0) {
                setIsEmpty(true);
                setHasMore(false);
            } else {
                setHasMore(false);
            }
        } catch (error) {
            console.error('Error fetching category posts:', error);
            setHasMore(false);
        } finally {
            setIsInitialLoad(false); // Set initial load to false after first fetch
        }
    }, [categorySlug]);

    useEffect(() => {
        setCategoryPosts([]);
        setPage(1);
        setHasMore(true);
        setIsEmpty(false);
        setIsInitialLoad(true); // Set initial load to true when category changes
        fetchCategoryPosts(1);
    }, [fetchCategoryPosts]);

    const fetchMoreData = () => {
        const nextPage = page + 1;
        setPage(nextPage);
        fetchCategoryPosts(nextPage);
    };

    return (
        <div className="category-list">
            {isEmpty ? (
                <div className="empty-category-message">
                    <p>There are no posts in this category.</p>
                </div>
            ) : (
                <InfiniteScroll
                    dataLength={categoryPosts.length}
                    next={fetchMoreData}
                    hasMore={hasMore}
                    loader={isInitialLoad ? <Loader /> : <ScrollLoader />} // Use Loader for initial load and ScrollLoader for subsequent loads
                    endMessage={
                        <p style={{ textAlign: 'center' }}>
                            <b>Yay! You have seen it all</b>
                        </p>
                    }
                >
                    {categoryPosts.map((post) => (
                        <div key={post.id} className="card" onContextMenu={(e) => e.preventDefault()}>
                            <Link to={`/${post.category_slug}/${post.slug}`} className="news-item-link">
                                <div className="image-container" style={{ position: "relative" }}>
                                    <img src={post.image} alt={post.title} className="news-item-image" style={{ width: "100%", height: "180px", objectFit: "cover" }} />
                                    <div style={{ position: "absolute", bottom: "10px", right: "10px", backgroundColor: "rgba(0, 0, 0, 0.5)", color: "white", padding: "5px", borderRadius: "5px", fontSize: "0.8rem" }}>
                                        {post.read_time} min read
                                    </div>
                                </div>
                                <div className='card-content'>
                                    <h2>{post.title}</h2>
                                    <p>{post.meta_description}</p>
                                </div>
                            </Link>
                            <div style={{ display: 'flex', alignItems: 'center', marginBottom:'5px'  }}>
                        <Link to={`/profile/${post.username}`} style={{ textDecoration: 'none', color: 'inherit',display: 'flex', alignItems: 'center', }}>
    <img src={`https://blog.tourismofkashmir.com/${post.avatar}`} alt='Avatar' className='avatar' style={{ width: '30px', height: '30px', borderRadius: '50%', marginRight: '5px' }} />
    <span className='username'>{post.username}</span> </Link>
                                <span className='views'>. {formatViews(post.views)} views</span>
                                <span className='date'>{formatDate(post.created_at)}</span>
                            </div>
                        </div>
                    ))}
                </InfiniteScroll>
            )}
        </div>
    );
};

export default CategoryList;
