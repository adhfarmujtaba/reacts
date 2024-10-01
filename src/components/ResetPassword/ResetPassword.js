import React, { useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import './ResetPassword.scss'; // Import the CSS file

function ResetPassword() {
  const [token, setToken] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [passwordsMatch, setPasswordsMatch] = useState(true);

  useEffect(() => {
    // Extract token from URL parameter
    const urlParams = new URLSearchParams(window.location.search);
    const tokenFromUrl = urlParams.get('token');
    if (tokenFromUrl) {
      setToken(tokenFromUrl);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMessage("Passwords don't match.");
      setPasswordsMatch(false);
      return;
    }

    try {
      const response = await axios.get(`https://blog.tourismofkashmir.com/reset_password_api.php?token=${token}&password=${password}`);
      setMessage(response.data.message);
    } catch (error) {
      setMessage('Error resetting password. Please try again later.');
    }
  };

  return (
    <div className="reset-password-container">
     <div className="go-home">
      <Link to="/" id='link-gohome'>
        <FontAwesomeIcon icon={faArrowLeft} />
        <span>Go Home</span>
      </Link>
    </div>
      <h2>Reset Password</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Token:</label>
          <input type="text" value={token} onChange={(e) => setToken(e.target.value)} readOnly />
        </div>
        <div>
          <label>New Password:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <div>
          <label>Confirm Password:</label>
          <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
        </div>
        {!passwordsMatch && <p className="error-message">Passwords don't match.</p>}
        <button type="submit">Reset Password</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default ResetPassword;
