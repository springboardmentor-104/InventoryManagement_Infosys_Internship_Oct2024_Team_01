import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Signup.css'; 

const SignUp = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [termsAgreed, setTermsAgreed] = useState(false);
  const [error, setError] = useState('');
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const name = `${firstName} ${lastName}`;

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/users/register`,
        { name, email, password, termsAgreed },
        { headers: { 'Content-Type': 'application/json' } }
      );
      console.log('Registration successful:', response.data);
    } catch (err) {
      console.error(err.response);
      setError('Failed to register. Please try again.');
    }
  };

  return (
    <div className="container">
      <div className="left-panel">
        <div className="overlay">
          <h1>Hello friend!</h1>
          <p>Please provide the information to <br></br>
            register your account</p>
          <p>Already have an account ?</p>
          <Link to={"/login"}>
          <button className="sign-in-btn">Sign In</button>
          </Link>
        </div>
      </div>
      
      <div className="right-panel">
        
        <div className="right-panel-form">
          <h3>Register a new account</h3>
          <p>Manage all your inventory efficiently</p>
          <p>Let’s get you all set up so you can verify your personal account and begin setting up your work profile.</p>
          
          <form className="signup-form" onSubmit={handleSubmit}>
            <div className="input-row">
              <div className="input-field">
                <label>First name</label>
                <input 
                  type="text" 
                  placeholder="Enter your First name" 
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)} 
                />
              </div>
              <div className="input-field">
                <label>Last name</label>
                <input 
                  type="text" 
                  placeholder="Enter Your Last Name" 
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)} 
                />
              </div>
            </div>
            <div className="input-row">
              <div className="input-field">
                <label>Email</label>
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)} 
                />
              </div>
              
            </div>
            <div className="input-field">
              <label>Password</label>
              <input 
                type="password" 
                placeholder="Enter your password" 
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)} 
              />
            </div>
            <div className="terms">
              <input 
                type="checkbox" 
                required 
                checked={termsAgreed}
                onChange={() => setTermsAgreed(!termsAgreed)} 
              /> 
              I agree to all <a href="#">&nbsp;terms & privacy policies</a>
            </div>
            <button type="submit" className="sign-up-btn">Sign Up</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;