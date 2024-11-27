import React from 'react';
import './HomePage.css';
import footer from '../assests/footer-bg.png';
import HomeBackground from '../assests/home-background.png';
import { Link } from 'react-router-dom';
import logo_img from '../assests/logo-img.png';
import { useNavigate } from 'react-router-dom';
import box1 from '../assests/box1.png';
import image3 from '../assests/image3.png';
import boxes from '../assests/boxes_6690949.png';
import factory from '../assests/factory_4866966.png'
import exchange from '../assests/exchange_1585197.png';
import report from '../assests/report_1321887.png';
import features_main from '../assests/features.jpg';
import about_shape_3 from '../assests/images/aboutshape3.png';
import about_shape4 from '../assests/images/about4.svg';
import images from '../assests/images.jpeg';


function LandingPage() {

    const navigate = useNavigate(); // Initialize navigate

    const handleSignUpClick = () => {
      navigate('/signup'); // Navigate to the sign-up page
    };
    const handleloginClick =()=>{
      navigate('/login');
    }

    return (
       
    <div className ="body1" >
      <header className="header" data-header>
        <div className="container">
        <div className="LogoTextDiv">
          <Link href="#" className="logo">
            <div className="logo-img-nav">
            <img src={logo_img}  alt="EduWeb logo"/>
          </div>
          </Link>
          <div className="logo-text">
            <p className="unity-talk">InvenTrackUp</p>
          
          </div>
        </div>
    
          <nav className="navbar" data-navbar>
    
            <div className="wrapper">
              <div className="LogoTextDiv">
                <Link href="#" className="logo">
                  <img className  src={logo_img} width="62" height="20" alt="EduWeb logo"/>
                </Link>
                <div className="logo-text">
                  <p className="unity-talk">InvenTrackUp</p>
                
                </div>
              </div>
    
              <button className="nav-close-btn" aria-label="close menu" data-nav-toggler>
                <ion-icon name="close-outline" aria-hidden="true"></ion-icon>
              </button>
            </div>
    
            <ul className="navbar-list">
    
              <li className="navbar-item">
                <Link href="#home" className="navbar-link" data-nav-link>Home</Link>
              </li>
    
              <li className="navbar-item">
                <Link href="#about" className="navbar-link" data-nav-link>About</Link>
              </li>
    
              <li className="navbar-item">
                <Link href="#courses" className="navbar-link" data-nav-link>Features</Link>
              </li>
    
              <li className="navbar-item">
                <Link href="#footer" className="navbar-link" data-nav-link>Contact</Link>
              </li>
    
            </ul>
    
          </nav>
    
          <div className="header-actions">
           
    
            <Link to='/login' className="btn has-before">
              <span className="span">Login</span>
    
              <ion-icon name="arrow-forward-outline" aria-hidden="true"></ion-icon>
            </Link>
            
           
    
            <button className="header-action-btn" aria-label="open menu" data-nav-toggler>
              <ion-icon name="menu-outline" aria-hidden="true"></ion-icon>
            </button>
    
          </div>
    
          <div className="overlay" data-nav-toggler data-overlay></div>
    
        </div>
      </header>
    
      <main>
        <article>
    
          <section className="section hero has-bg-image background-svg background-home" style={{ backgroundImage: `url(${HomeBackground})` }} id="home" aria-label="home">
    
            <div className="container">
    
              <div className="hero-content">
    
                <h1 className="h1 section-title">
                  Effortless <span className="span"> Task Management</span> for<span className="span"> Teams</span> and <span className="span">Suppliers</span>
                </h1>
    
                <p className="hero-text">
                  Our service caters to the Small business holders ensuring they can stay organised and control their products
                </p>
    
                <Link to='/signup' className="btn has-before">
                  <span className="span">Register</span>
    
                  <ion-icon name="arrow-forward-outline" aria-hidden="true"></ion-icon>
                </Link>
    
              </div>
    
              <figure className="hero-banner">
    
                <div className="img-holder one" >
                  <img src={box1} width="300" height="1000" alt="hero banner" className="img-cover"/>
                </div>
    
                <div className="img-holder two" >
                  <img src={image3} width="240" height="370" alt="hero banner" className="img-cover"/>
                </div>
    
              </figure>
    
            </div>
          </section>
          <section className="section category" aria-label="category">
            <div className="container">
    
    
              <h2 className="h2 section-title">
                Track <span className="span">real-time progress</span> with reports.
              </h2>
    
              <p className="section-text">
                Watch your inventory’s progress for ultimate inventory control
              </p>
    
              <ul className="grid-list">
    
                <li>
                  <div className="category-card card1" >
    
                    <div className="card-icon">
                      <img src={boxes} width="60" height="70" loading="lazy"
                        alt="Online Degree Programs" className="img"/>
                    </div>
    
                    <h3 className="h3">
                      <a href="#" className="card-title">Manage your products</a>
                    </h3>
    
                    <p className="card-text">
                      Easily add, edit, or remove products—keep your inventory fresh and dynamic!
                    </p>
    
                  </div>
                </li>
    
                <li>
                  <div className="category-card card2" >
    
                    <div className="card-icon">
                      <img src={factory} width="60" height="70"  loading="lazy"
                        alt="Non-Degree Programs" className="img"/>
                    </div>
    
                    <h3 className="h3">
                      <a href="#" className="card-title">Supplier Relationship Management</a>
                    </h3>
    
                    <p className="card-text">
                      Maintain communication and collaboration with suppliers to ensure timely deliveries
                    </p>
    
                  </div>
                </li>
    
                <li>
                  <div className="category-card card1" >
    
                    <div className="card-icon">
                      <img src={exchange} width="60" height="40" loading="lazy"
                        alt="Off-Campus Programs" className="img"/>
                    </div>
    
                    <h3 className="h3">
                      <a href="#" className="card-title">Return Management</a>
                    </h3>
    
                    <p className="card-text">
                      Streamline the process of handling returns and exchanges efficiently!
                    </p>
                  </div>
                </li>
    
                <li>
                  <div className="category-card card2" >
    
                    <div className="card-icon">
                      <img src={report} width="46" height="50" loading="lazy"
                        alt="Hybrid Distance Programs" className="img"/>
                    </div>
    
                    <h3 className="h3">
                      <a href="#" className="card-title">Inventory Aging Reports</a>
                    </h3>
    
                    <p className="card-text">
                      Identify slow-moving or obsolete stock to make informed decisions
                    </p>
    
                  </div>
                </li>
    
              </ul>
    
            </div>
          </section>
          <section className="section about" id="about" aria-label="about">
            <div className="container">
    
              <figure className="about-banner">
    
                <div className="img-holder feature-about">
                  <img src={features_main} width="520" height="370" loading="lazy" alt="about banner"
                    className="img-cover"/>
                </div>
    
                <img src={about_shape_3} width="722" height="528" loading="lazy" alt=""
                  className="shape about-shape-3"/>
    
              </figure>
    
              <div className="about-content">
    
                <p className="section-subtitle">Features</p>
    
                <h2 className="h2 section-title">
                    Explore the  <span className="span">features to elevate</span>  your experiences
                </h2>
    
                <p className="section-text">
                  We create easy-to-use inventory management systems that help businesses efficiently track and manage their stock. Our team focuses on reducing manual tasks and providing real-time updates, making inventory control simple and effective for companies of any size. We aim to streamline your business operations.
                      </p>
    
                <ul className="about-list">
    
                  <li className="about-item">
                    <ion-icon name="checkmark-done-outline" aria-hidden="true"></ion-icon>
    
                    <span className="span">Product Management</span>
                  </li>
    
                  <li className="about-item">
                    <ion-icon name="checkmark-done-outline" aria-hidden="true"></ion-icon>
    
                    <span className="span">Supplier Management</span>
                  </li>
    
                  <li className="about-item">
                    <ion-icon name="checkmark-done-outline" aria-hidden="true"></ion-icon>
    
                    <span className="span">Tracking Returned Products</span>
                  </li>
    
                  <li className="about-item">
                    <ion-icon name="checkmark-done-outline" aria-hidden="true"></ion-icon>
    
                    <span className="span">Purchase Details</span>
                  </li>
    
                  <li className="about-item">
                    <ion-icon name="checkmark-done-outline" aria-hidden="true"></ion-icon>
    
                    <span className="span">Stock Management</span>
                  </li>
                 
    
                </ul>
    
                <img src={about_shape4} width="100" height="100" loading="lazy" alt=""
                  className="shape about-shape-4"/>
    
              </div>
    
            </div>
          </section>
    
          <section className="section course" id="courses" aria-label="course">
            <div className="container">
    
              <p className="section-subtitle">Features </p>
    
              <h2 className="h2 section-title">Monitor <span className="span">stock levels</span> and  <span className="span">movements</span> instantly</h2>
    
              <ul className="grid-list">
    
                <li>
                  <div className="course-card">
    
                    <figure className="card-banner img-holder" >
                      <img src={images} width="370" height="220" loading="lazy"
                        alt="Build Responsive Real- World Websites with HTML and CSS" className="img-cover"/>
                    </figure>
    
                    <div className="card-content">
    
                      <h3 className="h3">
                        <a href="#" className="card-title">Feature-packed dashboard that brings real-time insights</a>
                      </h3>
    
                    </div>
    
                  </div>
                </li>
    
                <li>
                  <div className="course-card">
    
                    <figure className="card-banner img-holder" >
                      <img src={images} width="370" height="220" loading="lazy"
                        alt="Java Programming MasterclassName for Software Developers" className="img-cover"/>
                    </figure>
    
                    <div className="card-content">
    
                      <h3 className="h3">
                        <a href="#" className="card-title">Stay ahead with real-time tracking of product movement and stocking</a>
                      </h3>
    
    
                    </div>
    
                  </div>
                </li>
    
                <li>
                  <div className="course-card">
    
                    <figure className="card-banner img-holder" >
                      <img src={images} width="370" height="220" loading="lazy"
                        alt="The Complete Camtasia Course for Content Creators" className="img-cover"/>
                    </figure>
    
                    <div className="card-content">
    
                      <h3 className="h3">
                        <a href="#" className="card-title"> Perform regular stock counts to maintain accuracy without disrupting operations</a>
                      </h3>
    
                    
    
                    </div>
    
                  </div>
                </li>   
              </ul>
              <Link to='/login' className="btn has-before">
                <span className="span">Browse more groups</span>
    
                <ion-icon name="arrow-forward-outline" aria-hidden="true"></ion-icon>
              </Link>   
            </div>
          </section>    
        </article>
      </main>
    
    
      <footer className="footer" id="footer" style={{ backgroundImage: `url(${footer})` }}>
    
        <div className="footer-top section"/>
          <div className="container grid-list">
    
            <div className="footer-brand">
    
                <div className="LogoTextDiv">
                    <a href="#" className="logo">
                      <img src={logo_img} width="62" height="20" alt="EduWeb logo"/>
                    </a>
                    <div className="logo-text">
                      <p className="unity-talk-footer">InvenTrackUp</p>
             
                    </div>
                  </div>
    
              <p className="footer-brand-text">
                Smart Inventory Solutions
              </p>
    
    
              <div className="wrapper">
                <span className="span">Call:</span>
    
                <a href="tel:+011234567890" className="footer-link">+91 xxxxxxxxxx</a>
              </div>
    
              <div className="wrapper">
                <span className="span">Email:</span>
    
                <a href="mailto:info@eduweb.com" className="footer-link">InvenTrackUp@gmail.com</a>
              </div>
    
            </div>
    
          <div className="footer-list-wrap">
    
            <div className="footer-list">
    
              <p className="footer-list-title">Contacts</p>
    
              <p className="footer-list-text">
                Enter your email address for your Feedbacks
              </p>
    
              <form action="" className="newsletter-form">
                <input type="email" name="email_address" placeholder="Your email" required className="input-field"/>
    
                <button type="submit" className="btn has-before">
                  <span className="span">Feedback</span>
    
                  <ion-icon name="arrow-forward-outline" aria-hidden="true"></ion-icon>
                </button>
              </form>
    
              <ul className="social-list">
    
                <li>
                  <a href="#" className="social-link">
                    <ion-icon name="logo-facebook"></ion-icon>
                  </a>
                </li>
    
                <li>
                  <a href="#" className="social-link">
                    <ion-icon name="logo-linkedin"></ion-icon>
                  </a>
                </li>
    
                <li>
                  <a href="#" className="social-link">
                    <ion-icon name="logo-instagram"></ion-icon>
                  </a>
                </li>
    
                <li>
                  <a href="#" className="social-link">
                    <ion-icon name="logo-twitter"></ion-icon>
                  </a>
                </li>
    
                <li>
                  <a href="#" className="social-link">
                    <ion-icon name="logo-youtube"></ion-icon>
                  </a>
                </li>
    
              </ul>
    
            </div>
    
          </div>
        </div>
    
        <div className="footer-bottom">
          <div className="container">
    
          </div>
        </div>
    
      </footer>
    
      <a href="#top" className="back-top-btn" aria-label="back top top" data-back-top-btn>
        <ion-icon name="chevron-up" aria-hidden="true"></ion-icon>
      </a>
    </div>
       
    
      )
}

export default LandingPage
