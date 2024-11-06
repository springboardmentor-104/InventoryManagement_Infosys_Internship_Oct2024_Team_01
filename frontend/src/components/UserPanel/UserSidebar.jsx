// src/components/UserPanel/UserSidebar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './UserSidebar.css';

const UserSidebar = () => {
    return (
        <div className="sidebar">
            <h3>User Panel</h3>
            <ul>
                <li><Link to="/user/dashboard">Dashboard</Link></li>
                <li><Link to="/user/products">Products</Link></li>
                <li><Link to="/user/my-orders">My Orders</Link></li>
                <li><Link to="/user/cart">Cart</Link></li>
                <li><Link to="/logout">Logout</Link></li>
            </ul>
        </div>
    );
};

export default UserSidebar;
