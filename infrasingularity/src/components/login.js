import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './login.css';
import Header from './header';

const Login = () => {
  const [credentials, setCredentials] = useState({
    userId: '',
    password: ''
  });
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login credentials:', credentials);
    navigate('/metrics');
  };

  return (
    <div className="login-container">
      <Header />
      <form onSubmit={handleSubmit} className="auth-form">
        <div className="input-group">
          <label>User ID</label>
          <input
            type="text"
            value={credentials.userId}
            onChange={(e) => setCredentials({ ...credentials, userId: e.target.value })}
            className="custom-input"
          />
        </div>
        <div className="input-group">
          <label>Password</label>
          <input
            type="password"
            value={credentials.password}
            onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
            className="custom-input"
          />
        </div>
        <div className="button-container">
          <button type="submit" className="submit-btn">SUBMIT</button>
        </div>
      </form>
    </div>
  );
};

export default Login;