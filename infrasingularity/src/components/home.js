import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import "./home.css";

const Home = () => {
  const [blockchains, setBlockchains] = useState([]);
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem('user')); // 👈 stored after login

  const formatName = (rawName) => {
    let name = rawName;
    name = name.replace(/^(is-|tt-)/, ""); // Remove prefix
    name = name.replace(/-/g, " ");        // Replace dashes with spaces
    name = name.split(" ").map(word =>
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(" ");
    return name;
  };

  useEffect(() => {
    if (!user || !user.username) {
      console.error("User not logged in");
      return;
    }

    fetch(`http://127.0.0.1:5001/api/account/avs_status?username=${user.username}`)
      .then(response => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then(data => {
        const formattedData = data.map(avs => ({
          raw_name: avs.avs_name,
          name: formatName(avs.avs_name),
          status: avs.status,
          logo: "/images/default.png"
        }));
        setBlockchains(formattedData);
      })
      .catch(error => {
        console.error("Error fetching AVS data:", error);
      });
  }, []);

  const handleMetricsClick = (protocolRawName) => {
    navigate('/metrics', { state: { protocolRawName } });
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
              onClick={() => handleMetricsClick(blockchain.raw_name)}
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
