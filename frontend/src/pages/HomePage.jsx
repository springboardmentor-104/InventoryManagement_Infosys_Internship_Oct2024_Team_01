import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import '../components/AdminPanel/AdminDashboard';
import Button from '../components/Button';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import './HomePage.css';

const HomePage = () => {
  const fullText = "Simplicity, efficiency, and affordability in one solution!";
  const [typedText, setTypedText] = useState(""); // State to store the dynamically typed text
  const typingSpeed = 50; // Adjust typing speed (in ms)

  useEffect(() => {
    let currentIndex = 0;

    // Function to type each character
    const type = () => {
      if (currentIndex < fullText.length-1) {
        setTypedText((prev) => prev + fullText[currentIndex]);
        currentIndex ++;
      }
    };

    const typingInterval = setInterval(type, typingSpeed);

    // Cleanup the interval when the component is unmounted
    return () => clearInterval(typingInterval);
  }, [fullText]);
  return (
    <div className="home-container">
      <Navbar />
      <header className="home-header">
        <div className="header-content">
          <h1>"Efficient, real-time inventory management for your growing business."</h1>
          <p>
            {typedText} {/* Dynamically display the typed text here */}
          </p>
          <Link to={"/signup"}>
          <Button label="Sign Up Now" onClick={() => console.log('Sign Up Now clicked')} />
          </Link>
          
        </div>
      </header>
      {/* New Section: Features */}
      <section className="features-section">
        <div className="features-content">
          <h2>Our Key Features</h2>
          <div className="feature-cards">
            <div className="feature-card">
              <h3>Real-Time Tracking</h3>
              <p>Monitor your stock levels with real-time updates, ensuring you never run out of critical inventory.</p>
            </div>
            <div className="feature-card">
              <h3>Automated Reports</h3>
              <p>Generate insightful reports to analyze stock movement, trends, and optimize procurement.</p>
            </div>
            <div className="feature-card">
              <h3>User-Friendly Interface</h3>
              <p>Our intuitive interface ensures everyone can manage inventory with ease, from employees to administrators.</p>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default HomePage;
