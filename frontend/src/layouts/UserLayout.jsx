import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import UserSidebar from '../components/UserPanel/UserSidebar';
import CheckoutNavbar from '../components/UserPanel/CheckoutNavbar'; // Import the new Navbar
import './UserLayout.css';

const UserLayout = () => {
  const location = useLocation();

  // Define routes where Checkout Navbar is needed
  const checkoutNavbarRoutes = [
    '/user/billing-details',
    '/user/place-order',
    '/user/payment',
  ];

  // Define routes where the sidebar is hidden
  const noSidebarRoutes = [
    ...checkoutNavbarRoutes,
    '/user/order-confirmation', // Order Confirmation route excludes both Sidebar and Navbar
  ];

  // Check conditions
  const showSidebar = !noSidebarRoutes.includes(location.pathname);
  const showCheckoutNavbar =
    checkoutNavbarRoutes.includes(location.pathname);

  return (
    <div className="user-layout">
      {/* Conditionally render sidebar */}
      {showSidebar && <UserSidebar />}
      <div className={`content ${!showSidebar ? 'no-sidebar' : ''}`}>
        {/* Conditionally render checkout navbar */}
        {showCheckoutNavbar && <CheckoutNavbar />}
        <Outlet />
      </div>
    </div>
  );
};

export default UserLayout;
