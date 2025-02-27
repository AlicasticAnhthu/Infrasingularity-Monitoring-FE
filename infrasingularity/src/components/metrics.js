import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './metrics.css';
import Header from './header';

const Metrics = () => {
  const [credentials, setCredentials] = useState({
    userId: '',
    password: ''
  });
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/metrics');
  };

  return (
    <div className="page-container">
      <Header />
      <div className="link-container"> Test</div>
      <div className="metrics-container">
        <div className="half-screen">Total Staked</div>
        <div className="half-screen">Commision</div>
        <div className="half-screen">Network APY</div>
        <div className="half-screen">What to Come</div>
        <div className="full-width-box">
            <div className="uptime-box">Uptime</div>
            <div className="downtime-box">Downtime</div>
        </div>
        

      </div>
    </div>
  );
};

export default Metrics;