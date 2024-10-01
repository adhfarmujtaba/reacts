import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faClock, faCalendarAlt, faShare, faHeart, faBookmark } from '@fortawesome/free-solid-svg-icons';
import { faHeart as farHeart, faBookmark as farBookmark, faCommentDots as farCommentDots } from '@fortawesome/free-regular-svg-icons';
import { faFacebookF, faTwitter, faWhatsapp } from '@fortawesome/free-brands-svg-icons'; // Import social media icons from brands collection
import { faClipboard } from '@fortawesome/free-solid-svg-icons'; // Import clipboard icon for copy functionality
import './newsDetail.css';
import CommentsModal from './CommentsModal';
import { toast } from 'react-toastify';
import { Helmet } from 'react-helmet';
import 'react-toastify/dist/ReactToastify.css';




const NewsDetail = () => {
    const topRef = useRef(null);
    const [topViewedPosts, setTopViewedPosts] = useState([]);
    const [isBookmarked, setIsBookmarked] = useState(false); // State to track bookmark status
    const [commentCount, setCommentCount] = useState(0); // Step 1: New state variable for comment count
    const [post, setPost] = useState(null);
    const [relatedPosts, setRelatedPosts] = useState([]);
    const [likeCount, setLikeCount] = useState(0);
    const [isLikedByUser, setIsLikedByUser] = useState(false);
    const [showComments, setShowComments] = useState(false);
    const { postSlug } = useParams();
    const [readingProgress, setReadingProgress] = useState(0);
    const [showShareOptions, setShowShareOptions] = useState(false); // State to toggle share options



    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`https://blog.tourismofkashmir.com/apis?post_slug=${postSlug}`);
                setPost(response.data);
    
                // This log is to confirm that data fetching was successful
                console.log("Post details fetched successfully:", response.data);
            } catch (error) {
                console.error("Error fetching post details:", error);
            }
        };
    
        fetchData();
    }, [postSlug]);
    
    useEffect(() => {
        console.log('useEffect for scrolling triggered');
        if (topRef.current) {
            console.log('topRef.current exists');
    
            setTimeout(() => {
                const headerHeight = 150; // Adjust based on your header's height
                console.log('headerHeight:', headerHeight);
    
                const topPosition = topRef.current.getBoundingClientRect().top + window.pageYOffset;
                console.log('topPosition:', topPosition);
    
                const offsetPosition = topPosition - headerHeight;
                console.log('offsetPosition:', offsetPosition);
    
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth',
                });
    
                console.log('Scrolling executed');
            }, 50); // Adjust delay as needed to ensure the DOM has updated
        } else {
            console.log('topRef.current does not exist');
        }
    }, [post]); // Depend on the `post` state so it runs after the post data is fetched and set
    
    useEffect(() => {
        const fetchRelatedPosts = async () => {
            try {
                if (post && post.category_name) {
                    console.log('Fetching related posts...');
                    const response = await axios.get(`https://blog.tourismofkashmir.com/related_api.php?related_posts=${post.category_name}&exclude_post_id=${post.id}`);
                    console.log('Related posts response:', response.data); // Debug: log the response
                    setRelatedPosts(response.data);
                    console.log('Related posts set:', response.data); // Debug: log the updated state
                }
            } catch (error) {
                console.error("Error fetching related posts:", error);
            }
        };
    
        fetchRelatedPosts();
    }, [post]);
    

    useEffect(() => {
        const fetchLikes = async () => {
            try {
                // Always fetch the like count for the post
                const response = await axios.get(`https://blog.tourismofkashmir.com/api_likes?action=getLikeCount&post_id=${post.id}`);
                setLikeCount(response.data.like_count);
        
                // Check if there's a logged-in user
                const loggedInUser = localStorage.getItem('user');
                if (loggedInUser) {
                    const foundUser = JSON.parse(loggedInUser);
                    const userId = foundUser.id; // Assuming foundUser has an id field
        
                    // Fetch whether the logged-in user has liked the post
                    const likeStatusResponse = await axios.get(`https://blog.tourismofkashmir.com/api_likes?action=checkUserLike&post_id=${post.id}&user_id=${userId}`);
                    setIsLikedByUser(likeStatusResponse.data.user_liked);
                }
            } catch (error) {
                console.error("Error fetching like data:", error);
            }
        };
        
        if (post) {
            fetchLikes();
        }
    }, [post, postSlug]);
    
  
    
        

    const toggleLike = async () => {
        try {
            const loggedInUser = localStorage.getItem('user');
            if (!loggedInUser) {
                toast.error("Please log in to like the post");
                return;
            }
    
            const foundUser = JSON.parse(loggedInUser);
            const userId = foundUser.id;
    
            await axios.post(`https://blog.tourismofkashmir.com/api_likes?toggle-like`, { post_id: post.id, user_id: userId });
    
            // Add animation class
            setIsLikedByUser(!isLikedByUser);
            setLikeCount(prevCount => isLikedByUser ? prevCount - 1 : prevCount + 1);
            document.getElementById('like-btn').classList.add('heartBeatAnimation');
    
            // Remove animation class after 0.5s
            setTimeout(() => {
                document.getElementById('like-btn').classList.remove('heartBeatAnimation');
            }, 500);
        } catch (error) {
            console.error("Error toggling like:", error);
        }
    };
    
    // Fetch bookmark status when component mounts or post changes
    useEffect(() => {
        const checkBookmarkStatus = async () => {
            if (post) {
                try {
                    const loggedInUser = localStorage.getItem('user');
                    if (!loggedInUser) {
                        console.warn("User not logged in");
                        setIsBookmarked(false); // Assume not bookmarked if user is not logged in
                        return;
                    }
    
                    const foundUser = JSON.parse(loggedInUser);
                    const userId = foundUser.id;
    
                    console.log(`Checking bookmark status for user ${userId} and post ${post.id}`); // Debug log
    
                    const response = await axios.get(`https://blog.tourismofkashmir.com/api_bookmark.php?action=check&user_id=${userId}&post_id=${post.id}`);
                    console.log('Bookmark check response:', response.data); // Debug log
    
                    // Update isBookmarked based on the text response
                    if (response.data && typeof response.data === 'string') {
                        setIsBookmarked(response.data.includes("Post is bookmarked"));
                    } else {
                        setIsBookmarked(false); // Default to false if the response is not as expected
                    }
                } catch (error) {
                    console.error("Error checking bookmark status:", error);
                    setIsBookmarked(false); // Assume not bookmarked in case of error
                }
            }
        };
    
        checkBookmarkStatus();
    }, [post]);
    
    

    const handleBookmarkClick = async () => {
        const loggedInUser = localStorage.getItem('user');
        if (!loggedInUser) {
            toast.error("Please log in to manage bookmarks");
            return;
        }

        const foundUser = JSON.parse(loggedInUser);
        const userId = foundUser.id;

        const action = isBookmarked ? 'delete' : 'add'; // Determine action based on current bookmark status

        try {
            await axios.get(`https://blog.tourismofkashmir.com/api_bookmark.php?action=${action}&user_id=${userId}&post_id=${post.id}`);
            setIsBookmarked(!isBookmarked); // Toggle bookmark status after successful action
            // Show toast notification based on action
            if (action === 'add') {
                toast.success("Bookmark added successfully");
            } else {
                toast.success("Bookmark removed successfully");
            }
        } catch (error) {
            console.error(`Error ${action}ing bookmark:`, error);
            toast.error(`Error ${action}ing bookmark: ${error.message}`);
        }
    };
    useEffect(() => {
        const updateViews = async () => {
            try {
                console.log('Attempting to update views for post', post.id); // Debug: log the post id being updated
                await axios.get(`https://blog.tourismofkashmir.com/apis.php?update_views=true&post_id=${post.id}`);
                console.log('Successfully updated views for post', post.id); // Debug: confirm the post views were updated
            } catch (error) {
                console.error("Error updating post views:", error);
            }
        };
    
        if (post) {
            console.log('Post is available, updating views...'); // Debug: check if post is available before updating
            updateViews();
        } else {
            console.log('Post data is not available yet.'); // Debug: log if post data is not yet available
        }
    }, [post]); // This effect depends on the `post` state, so it runs when `post` changes, which should only be right after the post data is fetched
    useEffect(() => {
        const fetchCommentCount = async () => {
            try {
                if (post) {
                    const response = await axios.get(`https://blog.tourismofkashmir.com/api_comment_count.php?post_id=${post.id}`);
                    setCommentCount(response.data.comment_count); // Step 3: Update comment count state
                }
            } catch (error) {
                console.error("Error fetching comment count:", error);
            }
        };

        fetchCommentCount(); // Step 2: Fetch the comment count
    }, [post]); // Depend on the `post` state so it runs when `post` changes


    useEffect(() => {
        const fetchTopViewedPosts = async () => {
            try {
                if (post) {
                    const response = await axios.get(`https://blog.tourismofkashmir.com/related_api.php?topviewpost=true&exclude_post_id=${post.id}`);
                    setTopViewedPosts(response.data);
                }
            } catch (error) {
                console.error("Error fetching top viewed posts:", error);
            }
        };

        fetchTopViewedPosts();
    }, [post]);
    const shareOnSocialMedia = (platform) => {
        const url = window.location.href;
        let shareUrl = '';

        switch (platform) {
            case 'facebook':
                shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
                break;
            case 'twitter':
                shareUrl = `https://twitter.com/intent/tweet?url=${url}`;
                break;
            case 'whatsapp':
                shareUrl = `https://api.whatsapp.com/send?text=${url}`;
                break;
            default:
                break;
        }

        if (shareUrl) {
            window.open(shareUrl, '_blank');
        }
    };

    const copyLinkToClipboard = () => {
        navigator.clipboard.writeText(window.location.href)
            .then(() => toast.success("Link copied to clipboard!"))
            .catch((err) => console.error("Could not copy link: ", err));
    };

    // Toggle function for share options
    const toggleShareOptions = () => {
        setShowShareOptions(!showShareOptions);
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
            return views.toString();
        }
    };
    const calculateReadingProgress = () => {
        if (!topRef.current) return;
    
        const articleHeight = topRef.current.clientHeight - window.innerHeight; // Total scrollable height
        const scrollPosition = window.scrollY; // Current scroll position
    
        const progress = (scrollPosition / articleHeight) * 100;
    
        setReadingProgress(progress > 100 ? 100 : progress); // Ensure progress doesn't exceed 100%
    };
    useEffect(() => {
        const handleScroll = () => {
            window.requestAnimationFrame(() => {
                calculateReadingProgress();
            });
        };
    
        window.addEventListener('scroll', handleScroll);
    
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);
        
    const LoadingSkeletonPost = () => (
        <div className="news-detail-skeleton-wrapper">
            <div className="news-detail-skeleton-image"></div>
            <div className="news-detail-skeleton-title"></div>
            <div className="news-detail-skeleton-meta"></div>
            <div className="news-detail-skeleton-content"></div>
        </div>
    );

    if (!post) {
        return <LoadingSkeletonPost />;
    }

    const formattedDate = new Date(post.created_at).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    const toggleCommentsModal = () => {
        setShowComments(prevState => !prevState);
    };// Helper function to truncate titles that are too long
    const truncateTitle = (title, maxLength = 50) => {
        if (title.length > maxLength) {
            return `${title.substring(0, maxLength)}...`; // Truncate and append ellipsis
        }
        return title; // Return the original title if it's short enough
    };
    
 

    return (
        
        <>
         <Helmet>
                    <title>{post.title}</title>
                    <meta property="og:title" content={post.title} />
                    <meta property="og:description" content={post.meta_description} />
                    <meta property="og:image" content={post.image} />
                    <meta property="og:type" content="article" />
                    <meta property="og:url" content={window.location.href} />
                    {/* You can add more OG tags as needed */}
                </Helmet>
        <div ref={topRef}> 
            <div className="container_post">
            <div className="reading-progress-bar" style={{ width: `${readingProgress}%` }}></div>
                <div className="card_post">
                    {/* Post content */}
                    <img src={post.image} className="card-img-top news-image" alt={post.title} />
                    <div className="card-body">
                        <h5 className="card-title">{post.title}</h5>
                        <p className="card-text post-meta">
                            <FontAwesomeIcon icon={faEye} /> {formatViews(post.views)} views •
                            <FontAwesomeIcon icon={faCalendarAlt} /> {formattedDate} •
                            <FontAwesomeIcon icon={faClock} /> {post.read_time} min read
                        </p>
                        <div className="content_post" dangerouslySetInnerHTML={{ __html: post.content }} />
                       {/* Related posts */}
{relatedPosts.length > 0 && (
    <div className="related-posts">
        <h2>Also Read</h2>
        <div className="related-posts-container">
            {relatedPosts.map((relatedPost, index) => (
                <div className="related-post-card" key={index}>
                    <Link to={`/${post.category_name}/${relatedPost.slug}`}>
                        <div className="image-container"> {/* Positioning context for overlay */}
                            <img src={relatedPost.image} alt={relatedPost.title} />
                            <div className="related_read-time-overlay">{relatedPost.read_time} min read</div> {/* Overlay with read time */}
                        </div>
                        <div className="post-details">
                            <h3 className="post-title">{truncateTitle(relatedPost.title)}</h3>
                            <p className="post-excerpt">{relatedPost.excerpt}</p>
                        </div>
                    </Link>
                </div>
            ))}
        </div>
    </div>
)}

                        {/* Post category and tags */}
                        <div className="post-category">
                            <strong>Category:</strong> {post.category_name}
                        </div>
                        {post.tag_slugs && (
                            <div className="post-tags">
                                <strong>Tags:</strong>
                                {post.tag_slugs.split(',').map((tagSlug, index) => (
                                    <Link to={`/tags/${tagSlug}`} key={index} className="tag-link">
                                        <span className="tag">
                                            {post.tag_names.split(',')[index].trim()}{index < post.tag_slugs.split(',').length - 1 ? ', ' : ''}
                                        </span>
                                    </Link>
                                ))}
                            </div>
                        )}
                        {/* Post actions */}
                        <div className="actions">
                            <div className="action-item" onClick={toggleLike}>
                                <FontAwesomeIcon id="like-btn" icon={isLikedByUser ? faHeart : farHeart} style={{ color: isLikedByUser ? 'red' : 'inherit' }} />
                            </div>
                            <span id="like-count">{likeCount}</span>
                            <div className="action-item" onClick={toggleCommentsModal}>
                                <FontAwesomeIcon icon={farCommentDots} />
                            </div>
                            <span id="comment-count">{commentCount}</span>
                            <div className="action-item" onClick={handleBookmarkClick}>
                                <FontAwesomeIcon icon={isBookmarked ? faBookmark : farBookmark} />
                            </div>
                            <div className="action-item" onClick={toggleShareOptions}>
                <FontAwesomeIcon icon={faShare} />
            </div>
       

                        </div>
                        {showShareOptions && (
  <div className="modal-backdrop" onClick={() => setShowShareOptions(false)}> {/* Close modal when backdrop is clicked */}
    <div className="share-options-modal" onClick={(e) => e.stopPropagation()}> {/* Prevent modal close when modal content is clicked */}
      <h2>Share this post</h2> {/* Modal title */}
      <div className="share-option" onClick={() => shareOnSocialMedia('facebook')}>
        <FontAwesomeIcon icon={faFacebookF} className="share-option-icon" /> Share on Facebook
      </div>
      <div className="share-option" onClick={() => shareOnSocialMedia('twitter')}>
        <FontAwesomeIcon icon={faTwitter} className="share-option-icon" /> Share on Twitter
      </div>
      <div className="share-option" onClick={() => shareOnSocialMedia('whatsapp')}>
        <FontAwesomeIcon icon={faWhatsapp} className="share-option-icon" /> Share on WhatsApp
      </div>
      <div className="share-option" onClick={copyLinkToClipboard}>
        <FontAwesomeIcon icon={faClipboard} className="share-option-icon" /> Copy Link
      </div>
    </div>
  </div>
)}

                    </div>
                </div>
                <CommentsModal isOpen={showComments} onClose={toggleCommentsModal} postId={post.id} />
            </div>
    
            {topViewedPosts.length > 0 && (
    <div className="you-might-like outside-container">
        <h2>You Might Like</h2>
        <div className="top-viewed-posts-container">
            {topViewedPosts.map((topViewedPost, index) => (
                <div className="top-viewed-post-card" key={index}>
                    <Link to={`/${topViewedPost.category_slug}/${topViewedPost.slug}`} className="card-link">
                        <div className="image-container"> {/* Wrap the image and read time overlay in a container */}
                            <img src={topViewedPost.image} alt={topViewedPost.title} className="top-viewed-post-image" />
                            <div className="read-time-overlay">{topViewedPost.read_time} min read</div>
                        </div>
                        <div className="text-container">
                        <h3 className="top-viewed-post-title">{truncateTitle(topViewedPost.title)}</h3> {/* Use the truncateTitle function here */}
                            <p className="top-viewed-post-category">{topViewedPost.category_name}</p>
                        </div>
                    </Link>
                </div>
            ))}
        </div>
    </div>
)}

</div>
        </>
    );
    
};

export default NewsDetail;
