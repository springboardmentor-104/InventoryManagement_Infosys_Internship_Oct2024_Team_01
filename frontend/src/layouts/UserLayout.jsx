// src/layouts/UserLayout.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import UserSidebar from '../components/UserPanel/UserSidebar';
import './UserLayout.css';

const UserLayout = () => {
    return (
        <div className="user-layout">
            <UserSidebar />
            <div className="content">
                <Outlet />
            </div>
        </div>
    );
};

export default UserLayout;
