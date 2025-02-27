import { Routes, Route } from 'react-router-dom';
import Login from './components/login';
import Metrics from './components/metrics';

import './App.css';

function App() {
  return (
    <div className="app-container">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/metrics" element={<Metrics />} />
        {/* Add other pages later */}
      </Routes>
    </div>
  );
}

export default App;