import React from 'react';
import './ContactPage.css';
import { Link, useLocation } from 'react-router-dom';

const NavBar = () => {
  const location = useLocation();

  return (
    <nav className="nav-bar">
      <Link to="/" className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}>Video Games</Link>
      <Link to="/contact" className={`nav-link ${location.pathname === '/contact' ? 'active' : ''}`}>Contact</Link>
    </nav>
  );
};

const ContactPage = () => {
  return (
    <div className="contact-page">
      <div className="contact-content">
        <h1>GET IN TOUCH</h1>
        <p className="contact-description">
          For any kind of query, just reach out to us, fill the below form
        </p>
        <div className="contact-form">
          <form>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="name">Name *</label>
                <input type="text" id="name" placeholder="Your Name" />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email Address *</label>
                <input type="email" id="email" placeholder="Your Email" />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="message">Message *</label>
              <textarea id="message" placeholder="Your Message"></textarea>
            </div>
            <button type="submit" className="submit-button">Send</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
