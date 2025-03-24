import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './metrics.css';
import Header from './header';

const formatName = (rawName) => {
  let name = rawName;
  name = name.replace(/^(is-|tt-)/, ""); // Remove prefix
  name = name.replace(/-/g, " ");        // Replace dashes with spaces
  name = name.split(" ").map(word =>
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(" ");                           // Capitalize
  return name;
};

const Metrics = () => {
  const [metrics, setMetrics] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Retrieve protocolRawName passed from Home page
  const protocolRawName = location.state?.protocolRawName || "default-protocol"; // Fallback if missing

  useEffect(() => {
    fetch(`http://localhost:5001/api/avs/by_name/${protocolRawName}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Failed to fetch: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setMetrics(data);
      })
      .catch((err) => {
        console.error('Error fetching metrics:', err);
        setError(err.message);
      });
  }, [protocolRawName]);

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/metrics');
  };

  return (
    <div className="page-container">
      <Header />
      <div className="link-container">
        {metrics ? formatName(metrics.protocol_name) : 'Loading...'}
      </div>

      <div className="metrics-container">
        {error && <div className="error-message">{error}</div>}
        {metrics ? (
          <>
            <div className="half-screen">Total Staked: {metrics.total_staked}</div>
            <div className="half-screen">Network APY: {metrics.network_apy}</div>
            <div className="half-screen">Node Count: {metrics.node_count}</div>
            <div className="full-width-box">
              <div className="uptime-box">Uptime: {metrics.uptime}%</div>
              <div className="downtime-box">Status: {metrics.status}</div>
            </div>
            <div className="full-width-box">
              <div>Errors: {metrics.errors.length > 0 ? metrics.errors.join(', ') : 'None'}</div>
            </div>
          </>
        ) : (
          !error && <div>Loading metrics...</div>
        )}
      </div>
    </div>
  );
};

export default Metrics;
