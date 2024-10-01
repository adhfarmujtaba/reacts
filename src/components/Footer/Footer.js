import React from 'react';
import { Link } from 'react-router-dom'; // Import Link component
import './footer.css'; // Importing the CSS for styling

const Footer = () => {
    return (
        <footer className="site-footer">
            <div className="footer-content">
                <div className="footer-logo">
                    <Link to="/" className="logo-link">
                        <h1>NewsSite</h1>
                    </Link>
                </div>
                <div className="footer-description">
                    <p>A leading source for breaking news, analysis, and insights.</p>
                </div>
                <div className="footer-links">
                    <h2>Quick Links</h2>
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/about">About Us</Link></li>
                        <li><Link to="/contact">Contact</Link></li>
                        <li><Link to="/terms">Terms of Service</Link></li>
                        <li><Link to="/privacy">Privacy Policy</Link></li>
                    </ul>
                </div>
            </div>
            <div className="copyright">
                <p>&copy; {new Date().getFullYear()} NewsSite. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
