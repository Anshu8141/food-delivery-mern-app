import React from 'react';
import '../styles/Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3>🍔 FoodHub</h3>
          <p>Delicious food delivered to your doorstep!</p>
        </div>
        
        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/foods">Foods</a></li>
            <li><a href="/about">About Us</a></li>
            <li><a href="/contact">Contact</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Company</h4>
          <ul>
            <li><a href="#privacy">Privacy Policy</a></li>
            <li><a href="#terms">Terms of Service</a></li>
            <li><a href="#careers">Careers</a></li>
            <li><a href="#help">Help Center</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Contact</h4>
          <p>Email: info@foodhub.com</p>
          <p>Phone: +1 (555) 123-4567</p>
          <p>Address: 123 Food Street, City, Country</p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; 2026 FoodHub. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
