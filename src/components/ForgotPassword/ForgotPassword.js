import React, { useState } from 'react';
import axios from 'axios';
import './ForgotPassword.scss'; // Ensure this path is correct and SCSS is well-structured

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    setIsLoading(true);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address.');
      setIsLoading(false);
      return;
    }

    try {
      const response = await axios.get(`https://blog.tourismofkashmir.com/forget_password_reset_api.php`, {
        params: { email },
      });
      setMessage(response.data.message);
    } catch (error) {
      setError('Error sending email. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="forgot-password-container">
      <h2>Forgot Password</h2>
      <form onSubmit={handleSubmit} className="forgot-password-form" noValidate>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isLoading}
            aria-describedby="emailHelp"
            className="form-control"
          />
          <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
        </div>
        {isLoading ? (
          <div className="forgetpage_loader"></div>
        ) : (
          <button type="submit" className="btn btn-primary">Reset Password</button>
        )}
      </form>
      {error && <div className="alert alert-danger" role="alert">{error}</div>}
      {message && <div className="alert alert-success" role="alert">{message}</div>}
    </div>
  );
}

export default ForgotPassword;
