import React from "react";
import "../App.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Logo & Description */}
        <div className="footer-top">
          <h3>🌱 CarbonCredit</h3>
          <p>
            Empowering individuals and organizations to track, reduce, and earn
            rewards for their environmental impact through sustainable
            practices.
          </p>
          <div className="social-links">
            <a href="#">
              <i className="fab fa-facebook-f" aria-hidden="true"></i>
            </a>
            <a href="#">
              <i className="fab fa-twitter" aria-hidden="true"></i>
            </a>
            <a href="#">
              <i className="fab fa-linkedin-in" aria-hidden="true"></i>
            </a>
            <a href="#">
              <i className="fab fa-instagram" aria-hidden="true"></i>
            </a>
          </div>
        </div>

        {/* Footer Links */}
        <div className="footer-links-section">
          <div>
            <h4>Quick Links</h4>
            <ul>
              <li>
                <a href="#home">Home</a>
              </li>
              <li>
                <a href="#about">About</a>
              </li>
              <li>
                <a href="#services">Services</a>
              </li>
              <li>
                <a href="#blog">Blog</a>
              </li>
              <li>
                <a href="#contact">Contact</a>
              </li>
            </ul>
          </div>
          <div>
            <h4>Services</h4>
            <ul>
              <li>
                <a href="#ev-tracking">EV Tracking</a>
              </li>
              <li>
                <a href="#solar-energy">Solar Energy</a>
              </li>
              <li>
                <a href="#tree-planting">Tree Planting</a>
              </li>
              <li>
                <a href="#carbon-credits">Carbon Credits</a>
              </li>
              <li>
                <a href="#sustainability">Sustainability</a>
              </li>
            </ul>
          </div>
          <div>
            <h4>Support</h4>
            <ul>
              <li>
                <a href="#help">Help Center</a>
              </li>
              <li>
                <a href="#faq">FAQ</a>
              </li>
              <li>
                <a href="#privacy">Privacy Policy</a>
              </li>
              <li>
                <a href="#terms">Terms</a>
              </li>
              <li>
                <a href="#contact">Support</a>
              </li>
            </ul>
          </div>
          <div>
            <h4>Contact</h4>
            <ul>
              <li className="text-black">
                <i className="fas fa-envelope"></i> support@carboncredit.com
              </li>
              <li className="text-black">
                <i className="fas fa-phone"></i> +91 8018246346
              </li>
              <li className="text-black">
                <i className="fas fa-map-marker-alt"></i> STPI, Bhubaneswar, India
              </li>
            </ul>
          </div>
        </div>

        {/* Newsletter */}
        <div className="newsletter">
          <h4>Stay Updated</h4>
          <p>Subscribe for updates on sustainability and carbon credits.</p>
          <form className="newsletter-form">
            <input type="email" placeholder="Your email" />
            <button type="submit">Subscribe</button>
          </form>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <p>&copy; 2025 CarbonCredit Dashboard. All rights reserved.</p>
          <div className="footer-bottom-links">
            <a href="#privacy">Privacy</a>
            <a href="#terms">Terms</a>
            <a href="#cookies">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
