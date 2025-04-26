import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../styles/BasicUserInfo.css";

const allergiesList = [
  { id: "peanuts", label: "Peanuts" },
  { id: "dairy", label: "Dairy" },
  { id: "shellfish", label: "Shellfish" },
  { id: "gluten", label: "Gluten" },
];

const dietaryRestrictionsList = [
  { id: "vegetarian", label: "Vegetarian" },
  { id: "vegan", label: "Vegan" },
  { id: "keto", label: "Keto" },
  { id: "paleo", label: "Paleo" },
];

export default function BasicUserInfo() {
  const navigate = useNavigate();
  const location = useLocation();
  const isEditMode = location.state?.isEdit;

  const [formData, setFormData] = useState({
    fullName: "",
    dob: "",
    gender: "",
    height: "",
    weight: "",
    activityLevel: "",
    dietaryRestrictions: [],
    allergies: [],
  });

  useEffect(() => {
    // Get the stored registration data
    const storedData = localStorage.getItem("registrationData");
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      setFormData((prev) => ({
        ...prev,
        ...parsedData,
      }));
    }
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCheckboxChange = (category, id, checked) => {
    setFormData((prev) => ({
      ...prev,
      [category]: checked
        ? [...prev[category], id]
        : prev[category].filter((item) => item !== id),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Store updated user data
    localStorage.setItem("registrationData", JSON.stringify(formData));

    // Navigate based on mode
    if (isEditMode) {
      navigate("/dashboard");
    } else {
      navigate("/diet-goals");
    }
  };

  const handleBack = () => {
    if (isEditMode) {
      navigate("/dashboard");
    } else {
      navigate("/register");
    }
  };

  return (
    <div className="flex">
      <div className="card">
        <div className="card-header">
          <h1 className="app-title">Basic User Information</h1>
          <p className="app-description">
            Please provide your personal details
          </p>
          {!isEditMode && (
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: "66.66%" }}></div>
            </div>
          )}
        </div>
        <form onSubmit={handleSubmit}>
          <div className="card-content">
            <div className="form-group">
              <label htmlFor="fullName">Full Name</label>
              <input
                id="fullName"
                name="fullName"
                type="text"
                className="auth-input"
                placeholder="Enter your full name"
                value={formData.fullName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="dob">Date of Birth</label>
              <input
                id="dob"
                name="dob"
                type="date"
                className="auth-input"
                value={formData.dob}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="gender">Gender</label>
              <select
                id="gender"
                name="gender"
                className="auth-input"
                value={formData.gender}
                onChange={handleChange}
              >
                <option value="">Select gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="height">Height (cm)</label>
                <input
                  id="height"
                  name="height"
                  type="number"
                  className="auth-input"
                  placeholder="Height in cm"
                  value={formData.height}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="weight">Weight (kg)</label>
                <input
                  id="weight"
                  name="weight"
                  type="number"
                  className="auth-input"
                  placeholder="Weight in kg"
                  value={formData.weight}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="activityLevel">Activity Level</label>
              <select
                id="activityLevel"
                name="activityLevel"
                className="auth-input"
                value={formData.activityLevel}
                onChange={handleChange}
              >
                <option value="">Select activity level</option>
                <option value="sedentary">
                  Sedentary (little or no exercise)
                </option>
                <option value="light">Light (exercise 1-3 days/week)</option>
                <option value="moderate">
                  Moderate (exercise 3-5 days/week)
                </option>
                <option value="active">Active (exercise 6-7 days/week)</option>
                <option value="veryActive">
                  Very Active (intense exercise daily)
                </option>
              </select>
            </div>

            <div className="form-group">
              <label>Allergies</label>
              <div className="checkbox-grid">
                {allergiesList.map((item) => (
                  <div key={item.id} className="checkbox-item">
                    <input
                      type="checkbox"
                      id={`allergy-${item.id}`}
                      checked={formData.allergies.includes(item.id)}
                      onChange={(e) =>
                        handleCheckboxChange(
                          "allergies",
                          item.id,
                          e.target.checked
                        )
                      }
                    />
                    <label htmlFor={`allergy-${item.id}`}>{item.label}</label>
                  </div>
                ))}
              </div>
            </div>

            <div className="form-group">
              <label>Dietary Restrictions</label>
              <div className="checkbox-grid">
                {dietaryRestrictionsList.map((item) => (
                  <div key={item.id} className="checkbox-item">
                    <input
                      type="checkbox"
                      id={`diet-${item.id}`}
                      checked={formData.dietaryRestrictions.includes(item.id)}
                      onChange={(e) =>
                        handleCheckboxChange(
                          "dietaryRestrictions",
                          item.id,
                          e.target.checked
                        )
                      }
                    />
                    <label htmlFor={`diet-${item.id}`}>{item.label}</label>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="button-group">
            <button
              type="button"
              onClick={handleBack}
              className="auth-button register-button"
            >
              {isEditMode ? "Cancel" : "Back"}
            </button>
            <button type="submit" className="auth-button login-button">
              {isEditMode ? "Save Changes" : "Next"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
