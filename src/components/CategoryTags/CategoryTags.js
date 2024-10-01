import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { NavLink, useLocation } from 'react-router-dom'; // Make sure to import useLocation
import './CategoryTags.css';

const CategoryTags = () => {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(window.scrollY);
  const [tagsVisible, setTagsVisible] = useState(true);
  const location = useLocation(); // Use the useLocation hook here

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('https://blog.tourismofkashmir.com/apis?categories&order_index=asc&header_menu_is_included=TRUE');
        setCategories(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  const handleScroll = useCallback(() => {
    const currentScrollY = window.scrollY;
    if (currentScrollY > lastScrollY && currentScrollY > 80) {
      setTagsVisible(false);
    } else {
      setTagsVisible(true);
    }
    setLastScrollY(currentScrollY);
  }, [lastScrollY]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  return (
    <div className="category-head" style={{
      position: window.scrollY > 80 ? 'fixed' : 'relative',
      top: tagsVisible ? '0' : '-100%', // Adjust as per your category tags' height
      transition: 'top 0.5s'
    }}>
      {isLoading ? (
        <div className="category-tags-loading">
          {/* Skeleton loading states */}
          <div className="loading-tag" style={{ width: '50px', height: '35px' }}></div>
          <div className="loading-tag" style={{ width: '120px', height: '35px' }}></div>
          <div className="loading-tag" style={{ width: '90px', height: '35px' }}></div>
          <div className="loading-tag" style={{ width: '110px', height: '35px' }}></div>
        </div>
      ) : (
        <div className="category-tags">
        <NavLink to="/" className={({ isActive }) => `category-tag ${isActive ? 'active' : ''}`} end>All</NavLink>
        {categories.map((category) => (
          <NavLink
            key={category.id}
            to={`/${category.slug}`}
            className={({ isActive }) => {
              const currentPath = location.pathname.endsWith('/') ? location.pathname.slice(0, -1) : location.pathname;
              const categoryPath = `/${category.slug}`;
              const isExactMatch = currentPath === categoryPath;
              return `category-tag ${isExactMatch ? 'active' : ''}`;
            }}
            end
          >
            {category.name}
          </NavLink>
        ))}

        </div>
      )}
    </div>
  );
};

export default CategoryTags;
