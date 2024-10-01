import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroll-component'; 
import './TagDetails.css'; // Ensure the CSS file is correctly imported

// Skeleton loading component
const SkeletonLoading = () => {
    // Define the number of skeleton rows
    const numberOfSkeletonRows = 5;

    // Create an array to store the skeleton rows
    const skeletonRows = [];

    // Loop to generate skeleton rows
    for (let i = 0; i < numberOfSkeletonRows; i++) {
        skeletonRows.push(
            <div className="tag-details-skeleton-row" key={i}>
                <div className="tag-details-skeleton-image"></div>
                <div className="tag-details-skeleton-title"></div>
            </div>
        );
    }

    return (
        <div className="tag-details-loading">
            {skeletonRows}
        </div>
    );
};

// New Loader for Infinite Scroll
const InScrollLoader = () => (
    <img src="https://blog.tourismofkashmir.com/kOnzy.gif" alt="Loading..." className="infinite-scroller-loader" />
);

const trimTitle = (title, maxLength = 50) => {
    if (title.length <= maxLength) return title;
    return `${title.substring(0, maxLength)}...`;
};

const TagDetails = () => {
    const [posts, setPosts] = useState([]);
    const [tagName, setTagName] = useState('');
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [isLoading, setIsLoading] = useState(true);
    const [isFetching, setIsFetching] = useState(false); // New state to track fetching status
    const { tagSlug } = useParams();

    useEffect(() => {
        const fetchTagDetails = async () => {
            try {
                setIsFetching(true); // Start fetching
                const response = await axios.get(`https://blog.tourismofkashmir.com/apis.php?tag_slug=${tagSlug}&page=${page}`);
                const { data } = response;
                if (data.length > 0) {
                    setPosts(prevPosts => [...prevPosts, ...data]);
                    setTagName(data[0].tag_name);
                } else {
                    setHasMore(false);
                }
            } catch (error) {
                console.error('Error fetching tag details:', error);
                setHasMore(false);
            } finally {
                setIsFetching(false); // End fetching
                setIsLoading(false); // Update loading state after initial fetch
            }
        };

        fetchTagDetails();
    }, [tagSlug, page]);

    const fetchMoreData = () => {
        setPage(prevPage => prevPage + 1);
    };

    if (isLoading) {
        return <SkeletonLoading />;
    }

    return (
        <div className="tag-details-container">
            <h2>Posts tagged with {tagName}</h2>
            <InfiniteScroll
                dataLength={posts.length}
                next={fetchMoreData}
                hasMore={hasMore}
                loader={isFetching ? <InScrollLoader /> : null} // Conditionally render loader
                endMessage={
                    <p style={{ textAlign: 'center' }}>
                        <b>Yay! You have seen it all</b>
                    </p>
                }
            >
                <div className="tag-details-posts-container">
                    {posts.map((post, index) => (
                        <Link to={`/${post.category_slug}/${post.slug}`} key={index} className="tag-details-post-link">
                            <div className="tag-details-post-row">
                                <div className="tag-details-image-container">
                                    <img src={post.image} alt={post.title} className="tag-details-post-image"/>
                                    <div className="tag-details-read-time-overlay">{post.read_time} min read</div>
                                </div>
                                <h3 className="tag-details-post-title">{trimTitle(post.title)}</h3>
                            </div>
                        </Link>
                    ))}
                </div>
            </InfiniteScroll>
        </div>
    );
};

export default TagDetails;
