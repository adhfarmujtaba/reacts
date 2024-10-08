import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import './SearchModal.css';

const SearchModal = ({ onClose }) => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [isSearching, setIsSearching] = useState(false);

    useEffect(() => {
        const fetchResults = async () => {
            if (query.length > 0) {
                setIsSearching(true);
                try {
                    const response = await axios.get(`https://blog.tourismofkashmir.com/apisearch?search=${query}`);
                    setResults(Array.isArray(response.data) ? response.data : []);
                } catch (error) {
                    console.error('Error fetching search results:', error);
                    setResults([]);
                } finally {
                    setIsSearching(false);
                }
            } else {
                setResults([]);
            }
        };

        const delayDebounce = setTimeout(() => {
            fetchResults();
        }, 500);

        return () => {
            clearTimeout(delayDebounce);
        };
    }, [query]);

    const handleCloseModal = () => {
        onClose();
    };

    const searchingStyle = {
        fontSize: '18px',
        color: '#888',
        textAlign: 'center',
        padding: '20px'
    };
    
    const noResultsStyle = {
        fontSize: '16px',
        color: '#666',
        textAlign: 'center',
        padding: '20px'
    };
    
    return (
        <div className="search-modal">
            <div className="search-modal-header">
                <FontAwesomeIcon icon={faTimes} className="close-icon" onClick={handleCloseModal} />
            </div>
            <div className="search-modal-content">
                <input
                    type="text"
                    placeholder="Search..."
                    className="search-input"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    autoFocus
                />
                {isSearching ? (
                    <div style={searchingStyle}>Searching...</div>
                ) : query.length > 0 ? (
                    results.length > 0 ? (
                        <ul className="search-results">
                            {results.map((result, index) => (
                                <li key={index}>
                                    <Link to={`/${result.categorySlug}/${result.postSlug}`} onClick={handleCloseModal}>
                                        {result.image && <img src={result.image} alt="" className="post-image" />}
                                        <span className="post-title">{result.title}</span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <div style={noResultsStyle}>No results found</div>
                    )
                ) : null}
            </div>
        </div>
    );
};

export default SearchModal;
