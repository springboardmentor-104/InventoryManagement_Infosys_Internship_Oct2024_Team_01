// src/pages/Login.jsx
import React from 'react';
import './Login.css';

const Login = () => {
  const onFinish = (e) => {
    e.preventDefault();
    console.log('Form submitted');
  };

  const handleGoogleSignIn = () => {
    window.location.href = '#';
  };

  return (
    <div className="desktop-1">
      <div className="div">
        <div className="column">
          <div className="div-2">
            <div className="stock-smart">StockSmart</div>
            <div className="div-3">
              <div className="div-4">
                <div className="div-5">
                  <div className="login">Login</div>
                  <div className="div-6"></div>
                </div>
              </div>
              <div className="input-collection">
                <div className="google-button">
                  <button onClick={handleGoogleSignIn} className="google-button">
                    <div className="sign-in-with-google">Sign in with Google</div>
                    <img
                      loading="lazy"
                      src="https://cdn.builder.io/api/v1/image/assets/TEMP/ca85bd4195c3967cf9597af5d7101f3f1cf8777bf80cb8a91b2c6be32dcc5905?placeholderIfAbsent=true&apiKey=6de64210dad5440294bfb16468effd24"
                      className="img"
                      alt="Google Icon"
                    />
                  </button>
                </div>
                <form className="div-7" onSubmit={onFinish}>
                  <div className="div-8">
                    <label className="email">Email*</label>
                    <input
                      type="email"
                      placeholder="Enter your email"
                      className="enter-you-email"
                      required
                    />
                  </div>
                  <div className="div-9">
                    <label className="email">Password*</label>
                    <input
                      type="password"
                      placeholder="minimum 8 characters"
                      className="enter-you-email"
                      required
                    />
                  </div>
                  <div className="div-10">
                    <div className="div-11">
                      <input type="checkbox" />
                      <span className="remember-me">Remember me</span>
                    </div>
                    <div className="forgot-password">
                      <a href="/#">Forgot password?</a>
                    </div>

                  </div>
                  <button className="div-13" type="submit">
                    Sign In
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div className="column-2">
          <div className="div-14">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/b6e1c32ca9c00389550a20a2410ada0273e2959986253b14b1eff5d7008d4264?placeholderIfAbsent=true&apiKey=6de64210dad5440294bfb16468effd24"
              className="img-2"
              alt="Background"
            />
            <div className="hint-1">
              <div className="welcome-back">Welcome Back!</div>
              <div className="please-sign-in-to-your-account-with-the-given-details-to-continue">
                Please sign in to your
                <br />
                account with the given
                <br />
                details to continue
              </div>
              <div className="new-here-create-a-new-account">
                New here? create a new account
              </div>
              <button className="div-15" onClick={() => window.location.href = '/signup'}>Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
