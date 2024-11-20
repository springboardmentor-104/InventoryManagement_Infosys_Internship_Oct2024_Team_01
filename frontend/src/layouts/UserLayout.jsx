import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import UserSidebar from '../components/UserPanel/UserSidebar';
import CheckoutNavbar from '../components/UserPanel/CheckoutNavbar'; // Import the new Navbar
import './UserLayout.css';

const UserLayout = () => {
  const location = useLocation();

  // Define checkout-specific routes
  const checkoutRoutes = ['/user/billing-details', '/user/place-order', '/user/payment'];

  // Check if the current route matches a checkout route
  const isCheckoutPage = checkoutRoutes.includes(location.pathname);

  return (
    <div className="user-layout">
      {/* Conditionally render sidebar */}
      {!isCheckoutPage && <UserSidebar />}
      <div className={`content ${isCheckoutPage ? 'no-sidebar' : ''}`}>
        {/* Conditionally render checkout navbar */}
        {isCheckoutPage && <CheckoutNavbar />}
        <Outlet />
      </div>
    </div>
  );
};

export default UserLayout;
