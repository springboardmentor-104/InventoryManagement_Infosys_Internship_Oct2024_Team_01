import React from "react";
import { Link } from "react-router-dom";
import Button from "./Button"; // Assuming you're using the reusable button component
import "./Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="logo">StockSmart</div>
      <ul className="nav-links">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/inventory">Inventory</Link>
        </li>
        <li>
          <Link to="/dashboard">Dashboard</Link>
        </li>
        <li>
          <Link to="/orders">Orders</Link>
        </li>
      </ul>
      <div className="nav-buttons">
        <Link to={"/login"}>
          <Button label="Sign In" />
        </Link>
        <Link to={"/signup"}>
          <Button
            label="Sign Up"
            onClick={() => console.log("Sign Up clicked")}
          />
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
