import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import "./home.css";

const Home = () => {
  const [blockchains, setBlockchains] = useState([]);
  const navigate = useNavigate();

  const formatName = (rawName) => {
    let name = rawName;
    name = name.replace(/^(is-|tt-)/, ""); // Remove prefix
    name = name.replace(/-/g, " ");        // Replace dashes with spaces
    name = name.split(" ").map(word =>
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(" ");                           // Capitalize
    return name;
  };

  useEffect(() => {
    fetch("http://localhost:5001/api/avs/overall_status")
      .then(response => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then(data => {
        const formattedData = Object.entries(data).map(([avs_name, status]) => ({
          raw_name: avs_name, // Keep raw name (for backend query)
          name: formatName(avs_name),
          status: status,
          logo: "/images/default.png"
        }));
        setBlockchains(formattedData);
      })
      .catch(error => {
        console.error("Error fetching AVS data:", error);
      });
  }, []);

  const handleMetricsClick = (protocolRawName) => {
    navigate('/metrics', { state: { protocolRawName } }); // Pass raw name to Metrics page
  };

  return (
    <div className="home-container">
      <nav className="navbar">
        <div className="logo-container">
          <img 
            src="https://infrasingularity.com/assets/logois-BL3eVJnA.png" 
            alt="InfraSingularity Logo" 
            className="logo" 
          />
        </div>
      </nav>

      <div className="grid-container">
        {blockchains.length > 0 ? blockchains.map((blockchain, index) => (
          <div className="card" key={index}>
            <h2 className="blockchain-name">{blockchain.name}</h2>
            <hr className="divider" />
            <p className="status">Status: {blockchain.status}</p>
            <button 
              type="button" 
              className="view-metrics" 
              onClick={() => handleMetricsClick(blockchain.raw_name)} // Pass raw_name
            >
              View Metrics
            </button>
          </div>
        )) : <p>Loading...</p>}
      </div>
    </div>
  );
};

export default Home;
