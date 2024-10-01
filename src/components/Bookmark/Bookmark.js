import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BookmarkItem from './BookmarkItem'; // Import BookmarkItem component
import styles from './BookMark.module.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const BookMark = () => {
  const [bookmarks, setBookmarks] = useState([]);
  
  // Retrieve user data from localStorage and parse it
  const user = JSON.parse(localStorage.getItem('user'));
  // Extract the userId from the user data
  const userId = user?.id; // Adjust the key according to your stored user object

  useEffect(() => {
    if (!userId) {
      console.error('No user ID found');
      return;
    }

    const fetchBookmarks = async () => {
      try {
        const response = await axios.get('https://blog.tourismofkashmir.com/bookmark_view_api.php', { params: { user_id: userId } });
        setBookmarks(response.data);
      } catch (error) {
        console.error('Error fetching bookmarks:', error);
      }
    };

    fetchBookmarks();
  }, [userId]);

  const handleSwipeLeft = async (bookmarkId) => {
    try {
      const response = await axios.delete(`https://blog.tourismofkashmir.com/bookmark_view_api.php?user_id=${userId}&post_id=${bookmarkId}`);
  
      if (response.data.success) {
        console.log('Bookmark deleted successfully:', bookmarkId);
        toast.success(`Bookmark deleted successfully`);
        setBookmarks(currentBookmarks => currentBookmarks.filter(bookmark => bookmark.id !== bookmarkId));
      } else {
        console.error('Failed to delete bookmark:', bookmarkId, response.data.error);
      }
    } catch (error) {
      console.error('Error deleting bookmark:', bookmarkId, error);
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Bookmarked Posts</h2>
      <ul className={styles.bookmarkList}>
        {bookmarks.map(bookmark => (
          <BookmarkItem key={bookmark.id} bookmark={bookmark} handleSwipeLeft={handleSwipeLeft} styles={styles} />
        ))}
      </ul>
    </div>
  );
};

export default BookMark;
