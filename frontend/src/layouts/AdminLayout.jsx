// src/layouts/AdminLayout.jsx
import React from 'react';
import { Outlet } from 'react-router';
import Sidebar from '../components/AdminPanel/Sidebar';
import "./AdminLayout.css";

const AdminLayout = () => {
    
    return (
        <div className="admin-layout">
            <Sidebar />
            <div className="content">
                <Outlet />
            </div>
        </div>
    );
};

export default AdminLayout;
