import React, { useState } from 'react';
import { useSwipeable } from 'react-swipeable';
import { Link } from 'react-router-dom';

const BookmarkItem = ({ bookmark, handleSwipeLeft, styles }) => {
  const [swipeStyle, setSwipeStyle] = useState({});
  const [isSwiping, setIsSwiping] = useState(false);
  const [swipeDistance, setSwipeDistance] = useState(0); // Track swipe distance

  const swipeThreshold = 150; // Distance in pixels to trigger the swipe action

  const handlers = useSwipeable({
    onSwiping: (eventData) => {
      setIsSwiping(true);
      if (eventData.dir === 'Left') {
        setSwipeDistance(Math.abs(eventData.deltaX)); // Update swipe distance
        setSwipeStyle({
          transform: `translateX(${eventData.deltaX}px)`,
          opacity: 1 - Math.abs(eventData.deltaX / 300),
          boxShadow: `rgba(0, 0, 0, ${0.2 * (1 - Math.abs(eventData.deltaX / 1000))}) 0px 3px 5px 0px`,
        });
      }
    },
    onSwiped: () => {
      setIsSwiping(false);
      setSwipeStyle({});
      setSwipeDistance(0); // Reset swipe distance
    },
    onSwipedLeft: (eventData) => {
      if (Math.abs(eventData.deltaX) > swipeThreshold) {
        handleSwipeLeft(bookmark.id);
        setSwipeStyle({ transform: 'translateX(-100vw)', opacity: 0 });
      } else {
        // Rebound effect
        setSwipeStyle({});
        setSwipeDistance(0); // Reset swipe distance
      }
    },
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  });

  return (
    <li {...handlers} className={`${styles.bookmarkItem} ${isSwiping ? styles.swiping : ''}`} style={{ ...swipeStyle, transition: isSwiping ? 'none' : 'transform 0.3s ease-out, opacity 0.3s ease-out, box-shadow 0.3s ease-out' }}>
      <div className={styles.deleteIndicator} style={{ opacity: swipeDistance > 50 ? 1 : 0 }}>Swipe to delete</div>
      <Link to={`/${bookmark.category_slug}/${bookmark.slug}`} style={{ textDecoration: 'none', color: 'inherit', display: 'flex', alignItems: 'center', width: '100%' }}>
        <img src={bookmark.full_image_url} alt={bookmark.title} className={styles.bookmarkImage} />
        <h3 className={styles.bookmarkTitle}>{bookmark.title}</h3>
      </Link>
    </li>
  );
};

export default BookmarkItem;
