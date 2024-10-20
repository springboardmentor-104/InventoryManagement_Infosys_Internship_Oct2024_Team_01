import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-left">
        <p>StockSmart © 2024 - All rights reserved.</p>
        <p>One inventory management software to run all your inventory operations.</p>
      </div>
      <div className="footer-right">
        <ul>
          <li><a href="#">Help</a></li>
          <li><a href="#">FAQs</a></li>
          <li><a href="#">About us</a></li>
          <li><a href="#">Contact information</a></li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
