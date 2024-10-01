// src/components/NoInternet/NoInternet.js

import React from 'react';
import './NoInternet.css';


const NoInternet = () => {
  return (
    <div className="no-internet-container">
      <h1 className="no-internet-title">No Internet Connection</h1>
      <p className="no-internet-text">Please check your internet connection and try again.</p>
     
    </div>
  );
};

export default NoInternet;
