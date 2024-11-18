import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

// Admin Panel Components
import AdminDashboard from './components/AdminPanel/AdminDashboard.jsx';
import Inventory from './components/AdminPanel/Inventory.jsx';
import ProductsPage from './components/AdminPanel/ProductsPage.jsx';
import Users from './components/AdminPanel/Users.jsx';
import AdminLayout from './layouts/AdminLayout.jsx';

// User Panel Components
import UserDashboard from './components/UserPanel/UserDashboard.jsx';
import ProductsPageUser from './components/UserPanel/ProductsPage.jsx';
import MyOrdersPage from './components/UserPanel/MyOrdersPage.jsx';
import CartPage from './components/UserPanel/CartPage.jsx';
import ProductDetails from './components/UserPanel/ProductDetails.jsx';
import PlaceOrder from './components/UserPanel/PlaceOrder.jsx';
import Payment from'./components/UserPanel/Payment.jsx'
import UserLayout from './layouts/UserLayout.jsx';

// Other Pages
import ForgotPassword from './pages/ForgotPassword.jsx';
import HomePage from './pages/HomePage.jsx';
import Login from './pages/Login.jsx';
import Logout from './components/Logout.jsx';
import ResetPass from './pages/ResetPass.jsx';
import Signup from './pages/Signup.jsx';

import './style.css';
import ProductList from './pages/ProductList.jsx';

const App = () => {
  return (
    <React.StrictMode>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPass />} />

          {/* Admin Routes */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="inventory" element={<Inventory />} />
            <Route path="products" element={<ProductList />} />
            <Route path="users" element={<Users />} />
          </Route>

          {/* User Routes */}
          <Route path="/user" element={<UserLayout />}>
            <Route path="dashboard" element={<UserDashboard />} />
            <Route path="products" element={<ProductsPageUser />} />
            <Route path="my-orders" element={<MyOrdersPage />} />
            <Route path="products/:productId" element={<ProductDetails />} />
            <Route path="cart" element={<CartPage />} />
            <Route path="place-order" element={<PlaceOrder />} />
            <Route path="payment" element={<Payment/>} />

          </Route>
        </Routes>
      </Router>
    </React.StrictMode>
  );
};

export default App;
