import { Routes, Route } from 'react-router-dom';
import Login from './components/login';
import Metrics from './components/metrics';
import Home from './components/home';

import './App.css';

function App() {
  return (
    <div className="app-container">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/metrics" element={<Metrics />} />
        <Route path="/home" element={<Home />} />
        {/* Add other pages later */}
      </Routes>
    </div>
  );
}

export default App;