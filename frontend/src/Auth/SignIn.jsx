import React, { useState } from "react";
import "../styles/Auth/SignIn.css";
import eyeOpen from "../assets/eye.svg";
import eyeClosed from "../assets/eye-password-hide.svg";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const goToSignUpPage = () => {
    navigate("/signup");
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!username || !password) {
      setError("Please fill in the required fields");
      return;
    }
    setError("");

    const formData = new FormData();
    formData.append("username", username);
    formData.append("password", password);

    try {
      const response = await fetch("http://localhost:8000/login", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      if (!response.ok) {
        if (data.detail === "Invalid credentials") {
            setError("username or password entered is incorrect");
        }
      } else {
        console.log("Logged in successfully:", data);
        localStorage.setItem("token", data.access_token); 
        navigate("/test");
      }
    } catch (err) {
      setError("Network error");
    }
  };

  return (
    <div className="user-login-container">
      <div className="user-login-box">
        <form onSubmit={handleLogin}>
          <div className="placeholder">
            <label className="fi-username-label">Username</label>
            <div className={`fi-username-input-box ${error && !username ? "input-error" : ""}`}>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <label className="fi-password-label">Password</label>
            <div className={`fi-password-input-box ${error && !password ? "input-error" : ""}`}>
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <span
                className="password-toggle-icon"
                onClick={() => setShowPassword(!showPassword)}
              >
                <img src={showPassword ? eyeOpen : eyeClosed} alt="toggle password" />
              </span>
            </div>
          </div>

          <div className="no-account" onClick={goToSignUpPage}>
           Don't have an account?
          </div>
          <button className="sign-in-button" type="submit">
            <div className="sign-in-button-text">Enter</div>
          </button>
        </form>
        {error && <div className="error-message visible">{error}</div>}
      </div>
    </div>
  );
};

export default SignIn;
