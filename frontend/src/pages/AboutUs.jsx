import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "../styles/pages/Aboutus.css";
import Footer from "../Components/Footer";
import Navbar from "../Components/Navbar";

const AboutUs = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
  const checkLogin = () => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  };

  checkLogin(); 
  window.addEventListener("authChanged", checkLogin); 
  return () => {
    window.removeEventListener("authChanged", checkLogin);
  };
}, []);

  const goToSignUpPage = () => {
    navigate("/signup");
  };

  return (
    <div className="ent-container">
      <Navbar />
      <div className="ab-content">
        <div className="detailed-about">
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in.</p>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna.</p>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna.</p>
          <p>To test make an account</p>
        </div>

        {!isLoggedIn && (
          <div className="joinbutton" onClick={goToSignUpPage}>
            <div className="joinbg"></div>
            <span className="jointext">Sign Up</span>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default AboutUs;
