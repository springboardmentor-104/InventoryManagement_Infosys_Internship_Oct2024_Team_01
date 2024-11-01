import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import HomePage from './pages/HomePage.jsx';
import Login from './pages/Login.jsx';
import Signup from './pages/Signup.jsx';
import ForgotPassword from './pages/ForgotPassword.jsx';
import ResetPass from './pages/ResetPass.jsx';
import './style.css';

const App = () => {
  return (
    <React.StrictMode>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPass />} />
        </Routes>
      </Router>
    </React.StrictMode>
  );
}

export default App;
