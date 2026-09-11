import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import "../styles/Components/Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const isActive = (path) => (location.pathname === path ? "active" : "");

  const goToSignInPage = () => navigate("/login");
  const goToGrainPage = () => navigate("/grain");
  const goToTestPage = () => navigate("/test");
  const goToAboutUsPage = () => navigate("/");

  const handleSignOut = () => {
  localStorage.removeItem("token");
  window.dispatchEvent(new Event("authChanged"));
  navigate("/");
  };
  return (
    <header className="nav-header">
      <div className="nav-header-bg"></div>
      <div className="nav-header-inner">
        <div className="nav-frame-1">
          {!isLoggedIn ? (
            <div className="nav-sign-in-btn" onClick={goToSignInPage}>
              <div className="nav-btn-rect">
                <span className="nav-btn-text">Sign In</span>
              </div>
            </div>
          ) : (
            <div className="nav-sign-in-btn" onClick={handleSignOut}>
              <div className="nav-btn-rect">
                <span className="nav-btn-text">Sign Out</span>
              </div>
            </div>
          )}
          <div
            className={`nav-menu-item ${isActive("/")}`}
            onClick={goToAboutUsPage}
          >
            About Us
          </div>
          <div
            className={`nav-menu-item ${isActive("/grain")}`}
            onClick={goToGrainPage}
          >
            Rice Grains
          </div>

          {isLoggedIn && (
            <div
              className={`nav-menu-item ${isActive("/test")}`}
              onClick={goToTestPage}
            >
              Test
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
export default Navbar;
