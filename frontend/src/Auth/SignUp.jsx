import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Auth/SignUp.css";

const SignUp = () => {
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");

  const [formError, setFormError] = useState("");
  const [errorFields, setErrorFields] = useState([]);

  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();

    const tFullName = fullName.trim();
    const tUsername = username.trim();
    const tEmail = email.trim();
    const tPassword = password.trim();
    const tPhone = phone.trim();

    setFormError("");
    setErrorFields([]);

    const missing = [];
    if (!tFullName) missing.push("fullName");
    if (!tUsername) missing.push("username");
    if (!tEmail) missing.push("email");
    if (!tPassword) missing.push("password");

    if (missing.length > 0) {
      setFormError("Please fill in all required fields");
      setErrorFields(missing);
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(tEmail)) {
      setFormError("Enter a valid email address");
      setErrorFields(["email"]);
      return;
    }

    if (tPhone && !/^\d+$/.test(tPhone)) {
      setFormError("Phone number must contain only digits");
      setErrorFields(["phone"]);
      return;
    }

    const payload = {
      fullName: tFullName,
      username: tUsername,
      email: tEmail,
      password: tPassword,
      phone: tPhone,
    };

    try {
      const response = await fetch("http://localhost:8000/user/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      if (response.ok) {
        localStorage.setItem("token", data.access_token);
          if (data.user) {
            localStorage.setItem("user", JSON.stringify(data.user));
          }

        window.dispatchEvent(new Event("authChanged"));
        navigate("/test");
      } else {
        setFormError(data.detail || "Sign up failed");
      }
    } catch (err) {
      setFormError("Network error");
    }
  };

  return (
    <div className="user-signup">
      <form onSubmit={handleSignUp} noValidate>
        <div className="user-signup__identity-title">Identity Info</div>
        <div className="user-signup__user-info-title">User Info</div>

        <div className="user-signup__full-name-label">Full Name</div>
        <div className={`user-signup__full-name-input-wrapper ${errorFields.includes("fullName") ? "input-error" : ""}`}>
          <input
            id="fullName"
            name="fullName"
            autoComplete="name"
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
        </div>

        <div className="user-signup__username-label">Username</div>
        <div className={`user-signup__username-input-wrapper ${errorFields.includes("username") ? "input-error" : ""}`}>
          <input
            id="username"
            name="username"
            autoComplete="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div className="user-signup__email-label">Email</div>
        <div className={`user-signup__email-input-wrapper ${errorFields.includes("email") ? "input-error" : ""}`}>
          <input
            id="email"
            name="email"
            autoComplete="email"
            type="text" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="user-signup__password-label">Password</div>
        <div className={`user-signup__password-input-wrapper ${errorFields.includes("password") ? "input-error" : ""}`}>
          <input
            id="password"
            name="password"
            autoComplete="new-password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="user-signup__phone-label">Phone Number</div>
        <div className={`user-signup__phone-input-wrapper ${errorFields.includes("phone") ? "input-error" : ""}`}>
          <input
            id="phone"
            name="phone"
            autoComplete="tel"
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>

        <div className="user-signup__signup-button-wrapper">
          <button className="user-signup__signup-button" type="submit">
            Sign Up
          </button>
          {formError && <div className="error-message visible">{formError}</div>}
        </div>
      </form>
    </div>
  );
};

export default SignUp;
