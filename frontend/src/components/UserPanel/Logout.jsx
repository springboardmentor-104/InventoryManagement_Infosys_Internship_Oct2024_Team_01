// src/pages/Logout.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        // Logic for logging out the user (e.g., clearing session or token)
        // Redirect to the login page after logout
        navigate('/login');
    };

    return (
        <div>
            <h2>You have been logged out.</h2>
            <button onClick={handleLogout}>Login Again</button>
        </div>
    );
};

export default Logout;
