import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/auth.css";

const Register = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    dob: "",
    gender: "",
    height: "",
    weight: "",
    activityLevel: "",
    allergies: [],
    dietaryRestrictions: [],
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Store the user data in localStorage to access it in BasicUserInfo
    localStorage.setItem("registrationData", JSON.stringify(userData));
    navigate("/basic-user-info");
  };

  return (
    <div className="flex">
      <div className="card">
        <div className="card-header">
          <h1 className="app-title">Create Your Account</h1>
          <p className="app-description">
            Enter your credentials to get started
          </p>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: "33.33%" }}></div>
          </div>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="card-content">
            <div className="form-group">
              <label htmlFor="fullName">Full Name</label>
              <input
                id="fullName"
                name="fullName"
                type="text"
                placeholder="Enter your full name"
                value={userData.fullName}
                onChange={handleInputChange}
                required
                className="auth-input"
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="your@email.com"
                value={userData.email}
                onChange={handleInputChange}
                required
                className="auth-input"
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                placeholder="Create a password"
                value={userData.password}
                onChange={handleInputChange}
                required
                className="auth-input"
              />
            </div>
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                placeholder="Confirm your password"
                value={userData.confirmPassword}
                onChange={handleInputChange}
                required
                className="auth-input"
              />
            </div>
            <button type="submit" className="auth-button login-button">
              Next
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
