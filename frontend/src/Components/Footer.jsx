import React from "react";
import "../styles/Components/Footer.css";
import facebookImg from "../assets/Facebook.png";
import instagramImg from "../assets/Instagram.png";
import telegramImg from "../assets/Telegram.png";
import youtubeImg from "../assets/You Tube.png";
import mail from "../assets/mail.png";
import phone from "../assets/phone.png";

const Footer = () => {
  return (
    <footer className="frame9">
      <div className="footer">
        <div className="rectangle-9"></div>
        <div className="socials">
          <div className="social-title">Social Media</div>
          <div className="frame6">
            <div
              className="social-icon facebook"
              style={{ backgroundImage: `url(${facebookImg})` }}
            ></div>
            <div
              className="social-icon instagram"
              style={{ backgroundImage: `url(${instagramImg})` }}
            ></div>
            <div
              className="social-icon telegram"
              style={{ backgroundImage: `url(${telegramImg})` }}
            ></div>
            <div
              className="social-icon youtube"
              style={{ backgroundImage: `url(${youtubeImg})` }}
            ></div>
          </div>

          <div className="contact-ways">
            <div className="email-contact">
              <span className="contact-text">something@gmail.com</span>
              <div
              className="mail-icon"
              style={{ backgroundImage: `url(${mail})` }}
              ></div>
            </div>
            <div className="phone-contact">
              <span className="contact-text">+980000000</span>
            <div
            className="phone-icon"
            style={{ backgroundImage: `url(${phone})` }}
            ></div>
          </div>
          </div>

        </div>

        <div className="about-us">
          <div className="about-title">About Us</div>
          <p className="about-description">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea.
          </p>
        </div>
      </div>
      <div className="rectangle-44"></div>
      <div className="copyright-section">
        <span className="copyright-text">Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</span>
      </div>
    </footer>
  );
};

export default Footer;
