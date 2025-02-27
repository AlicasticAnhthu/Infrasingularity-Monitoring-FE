import React from "react";
import { Link } from "react-router-dom";
import "./home.css";

const blockchains = [
  { name: "Ethereum", apr: "7%", logo: "/images/ethereum.png" },
  { name: "Sui", apr: "7%", logo: "/images/sui.png" },
  { name: "Aptos", apr: "7%", logo: "/images/aptos.png" },
  { name: "Babylon", apr: "7%", logo: "/images/babylon.png" },
  { name: "Celestia", apr: "7%", logo: "/images/celestia.png" },
  { name: "Casper", apr: "7%", logo: "/images/casper.png" },
];

const Home = () => {
  return (
    <div className="home-container">
      {/* Navigation Bar with Online Logo */}
      <nav className="navbar">
        <div className="logo-container">
          <img 
            src="https://infrasingularity.com/assets/logois-BL3eVJnA.png" 
            alt="InfraSingularity Logo" 
            className="logo" 
          />
        </div>
        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/profile">Profile</Link>
        </div>
      </nav>

      {/* Blockchain Cards Grid */}
      <div className="grid-container">
        {blockchains.map((blockchain, index) => (
          <div className="card" key={index}>
            <h2 className="blockchain-name">{blockchain.name}</h2>
            <hr className="divider" />
            <p className="apr">ARP: {blockchain.apr}</p>
            <button className="view-metrics">View Metrics</button>
            <img src={blockchain.logo} alt={blockchain.name} className="blockchain-logo" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
