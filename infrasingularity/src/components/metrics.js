import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './metrics.css';
import Header from './header';

const formatName = (rawName) => {
  let name = rawName;
  name = name.replace(/^(is-|tt-)/, "");
  name = name.replace(/-/g, " ");
  return name
    .split(" ")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

const formatStaked = (value) => {
  if (value === null || value === undefined) return "-";
  if (value >= 1_000_000_000) return `${(value / 1_000_000_000).toFixed(2)}B`;
  if (value >= 1_000_000) return `${(value / 1_000_000).toFixed(2)}M`;
  return value.toLocaleString();
};

const formatUptimeDays = (seconds) => {
  if (seconds === null || seconds === undefined) return "-";
  const days = seconds / 86400;
  return `${days.toFixed(1)} days`;
};

const Metrics = () => {
  const [metrics, setMetrics] = useState(null);
  const [error, setError] = useState(null);
  const location = useLocation();
  const protocolRawName = location.state?.protocolRawName || "default-protocol";

  useEffect(() => {
    fetch(`http://localhost:5001/api/avs/by_name/${protocolRawName}`)
      .then((response) => {
        if (!response.ok) throw new Error(`Failed to fetch: ${response.status}`);
        return response.json();
      })
      .then((data) => setMetrics(data))
      .catch((err) => {
        console.error('Error fetching metrics:', err);
        setError(err.message);
      });
  }, [protocolRawName]);

  return (
    <div className="page-container">
      <Header />
      <div className="link-container"><strong>
        {metrics ? formatName(metrics.protocol_name) : 'Loading...'} </strong>
      </div>

      <div className="metrics-container">
        {error && <div className="error-message">{error}</div>}
        {metrics ? (
          <>
        <div className="half-screen"><strong>Total Staked:</strong>&nbsp;{formatStaked(metrics.total_staked)}</div>
        <div className="half-screen"><strong>Network APY:</strong>&nbsp;{metrics.network_apy ?? "-"}</div>

        <div className="half-screen"><strong>Total ETH TVL:</strong>&nbsp;{metrics.total_eth_tvl ?? "-"}</div>
        <div className="half-screen"><strong>Total Eigen TVL:</strong>&nbsp;{metrics.total_eigen_tvl ?? "-"}</div>

        <div className="half-screen"><strong>ETH TVL (USD):</strong>&nbsp;{metrics.eth_tvl_usd ?? "-"}</div>
        <div className="half-screen"><strong>Eigen TVL (USD):</strong>&nbsp;{metrics.eigen_tvl_usd ?? "-"}</div>

        <div className="half-screen"><strong>Validation Score:</strong>&nbsp;{metrics.validation_success_score ?? "-"}</div>
        <div className="half-screen"><strong>Node Count:</strong>&nbsp;{metrics.node_count}</div>

        <div className="half-screen"><strong>Uptime:</strong>&nbsp;{formatUptimeDays(metrics.uptime)}</div>
        <div className="half-screen"><strong>Status:</strong>&nbsp;{metrics.status}</div>

          </>
        ) : (
          !error && <div>Loading metrics...</div>
        )}
      </div>
    </div>
  );
};

export default Metrics;
