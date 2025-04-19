import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './login.css';
import Header from './header';

const Login = () => {
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch('http://127.0.0.1:5001/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credentials)
    })
      .then((res) => res.json().then((data) => ({ status: res.status, data })))
      .then(({ status, data }) => {
        if (status === 200) {
          console.log('✅ Login successful:', data);

          // Store session
          localStorage.setItem('user', JSON.stringify(data));

          // Redirect to home
          navigate('/home');
        } else {
          alert(data.error || 'Login failed. Please check your credentials.');
        }
      })
      .catch((err) => {
        console.error('🔥 Login request failed:', err);
        alert('Unable to login. Please try again later.');
      });
  };

  return (
    <div className="login-container">
      <Header />
      <form onSubmit={handleSubmit} className="auth-form">
        <div className="input-group">
          <label>Username</label>
          <input
            type="text"
            value={credentials.username}
            onChange={(e) =>
              setCredentials({ ...credentials, username: e.target.value })
            }
            className="custom-input"
            required
          />
        </div>
        <div className="input-group">
          <label>Password</label>
          <input
            type="password"
            value={credentials.password}
            onChange={(e) =>
              setCredentials({ ...credentials, password: e.target.value })
            }
            className="custom-input"
            required
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
