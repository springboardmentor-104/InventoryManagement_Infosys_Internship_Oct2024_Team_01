// Sidebar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import'./Sidebar.css'

const Sidebar = () => {
    return (
        <div className="sidebar">
            <h3>Admin Pannel</h3>
            <ul>
                <li><Link to="/admin/dashboard">Dashboard</Link></li>
                <li><Link to="/admin/inventory">Inventory</Link></li>
                <li><Link to="/admin/products">Products</Link></li>
                <li><Link to="/admin/users">Users</Link></li>
                <li><Link to="/logout">Logout</Link></li>
            </ul>
        </div>
    );
};

export default Sidebar;
