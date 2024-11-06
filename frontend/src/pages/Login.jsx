import React, { useState } from 'react';
import axios from 'axios';
import './Login.css';
import { Link } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const onFinish = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `http://localhost:4000/api/users/login`,
        { email, password },
        { headers: { 'Content-Type': 'application/json' } }
      );
      const { token } = response.data;
      localStorage.setItem('token', token);
      window.location.href = '/admin/dashboard';
    } catch (err) {
      console.log(err.response);
      setError('Invalid credentials. Please try again.');
    }
  };

  return (
    <div className="desktop-1">
      <div className="div">
        <div className="column">
          <div className="div-2">
            <div className="div-3">
              <div className="div-4">
                <div className="div-5">
                  <div className="login">Login</div>
                </div>
              </div>
              <div className="input-collection">
                <div className="google-button">
                  <div className="sign-in-with-google-container">
                    <div className="google-icon-button">
                      <img
                        loading="lazy"
                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/ca85bd4195c3967cf9597af5d7101f3f1cf8777bf80cb8a91b2c6be32dcc5905?placeholderIfAbsent=true&apiKey=6de64210dad5440294bfb16468effd24"
                        className="google-icon"
                        alt="Google Icon"
                      />
                    </div>
                    <div className="sign-in-with-google">Sign in with Google</div>
                  </div>
                </div>

                <form className="div-7" onSubmit={onFinish}>
                  <div className="div-8">
                    <label className="email">Email</label>
                    <input
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="enter-you-email"
                      required
                    />
                  </div>
                  <div className="div-9">
                    <label className="email">Password</label>
                    <input
                      type="password"
                      placeholder="Minimum 8 characters"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="enter-you-email"
                      required
                    />
                  </div>
                  <div className="div-10">
                    <div className="forgot-password">
                      <Link to="/forgot-password">Forgot password?</Link>
                    </div>
                  </div>
                  <button className="div-13" type="submit">
                    Sign In
                  </button>
                </form>
                <div className="not-regestered-yet-create-a-new-account">
                  <span style={{ color: 'rgba(19, 19, 19, 1)' }}>
                    Not registered yet?
                  </span>
                  <Link to="/signup">Create a new account</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="column-2">
          <div className="div-14">
            <img
              loading="lazy"
              src="https://images.pexels.com/photos/6169180/pexels-photo-6169180.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              className="img-2"
              alt="Background"
            />
            <div className="hint-1">
              <div className="welcome-back">Welcome Back!</div>
              <div className="please-sign-in-to-your-account-with-the-given-details-to-continue">
                Please sign in to your
                account with the given
                <br />
                details to continue
              </div>
              <div className="new-here-create-a-new-account">
                New here? create a new account
              </div>
              <Link to="/signup">
                <button className="div-15">Sign Up</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
