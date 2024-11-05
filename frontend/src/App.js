import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import AdminDashboard from './components/AdminPanel/AdminDashboard.jsx';
import Inventory from './components/AdminPanel/Inventory.jsx';
import ProductsPage from './components/AdminPanel/ProductsPage.jsx';
import Users from './components/AdminPanel/Users.jsx';
import AdminLayout from './layouts/AdminLayout.jsx';
import ForgotPassword from './pages/ForgotPassword.jsx';
import HomePage from './pages/HomePage.jsx';
import Login from './pages/Login.jsx';
import ResetPass from './pages/ResetPass.jsx';
import Signup from './pages/Signup.jsx';
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
          <Route path="/admin" element={<AdminLayout />}>
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="inventory" element={<Inventory />} />
            <Route path="products" element={<ProductsPage />} />
            <Route path="users" element={<Users />} />
          </Route>
        </Routes>
      </Router>
    </React.StrictMode>
  );
};

export default App;
