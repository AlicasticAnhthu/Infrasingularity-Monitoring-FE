import React from 'react';
import './header.css';

const Header = () => {
  return (
    <header className="main-header">
      {/* Use your actual logo image instead of text if needed */}
      <img 
        src="https://infrasingularity.com/assets/logois-BL3eVJnA.png" 
        alt="InfraSingularity Logo" 
        className="logo-image"
      />
    </header>
  );
};

export default Header;