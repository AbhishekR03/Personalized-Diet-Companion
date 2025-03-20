import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import navigation hook
import "../styles/BasicUserInfo.css"; // Import CSS

export default function BasicUserInfo() {
  const navigate = useNavigate(); // Initialize navigation

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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCheckboxChange = (e) => {
    const { name, value, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: checked
        ? [...prevData[name], value]
        : prevData[name].filter((item) => item !== value),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Ideally, save data to localStorage or state management (Redux)
    navigate("/diet-goals"); // Navigate to Desired Diet Goals Page
  };

  return (
    <div className="container">
      <h2 className="title">BASIC USER INFORMATION</h2>
      <form className="form-container" onSubmit={handleSubmit}>
        <div className="left-section">
          <div className="form-group">
            <label>
              <strong>Full Name:</strong>
            </label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>
              <strong>Date of Birth:</strong>
            </label>
            <input
              type="date"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>
              <strong>Gender:</strong>
            </label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
            >
              <option value="">Select</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
              <option value="prefer-not">Prefer not to say</option>
            </select>
          </div>

          <div className="form-group">
            <label>
              <strong>Height (cm):</strong>
            </label>
            <input
              type="number"
              name="height"
              value={formData.height}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>
              <strong>Weight (kg):</strong>
            </label>
            <input
              type="number"
              name="weight"
              value={formData.weight}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="right-section">
          <div className="form-group">
            <label>
              <strong>Activity Level:</strong>
            </label>
            <select
              name="activityLevel"
              value={formData.activityLevel}
              onChange={handleChange}
            >
              <option value="">Select</option>
              <option value="sedentary">Sedentary</option>
              <option value="lightly-active">Lightly Active</option>
              <option value="active">Active</option>
              <option value="very-active">Very Active</option>
            </select>
          </div>

          <div className="form-group">
            <label>
              <strong>Dietary Restrictions:</strong>
            </label>
            <div className="checkbox-group">
              <label>
                <input
                  type="checkbox"
                  name="dietaryRestrictions"
                  value="vegetarian"
                  onChange={handleCheckboxChange}
                />{" "}
                Vegetarian
              </label>
              <label>
                <input
                  type="checkbox"
                  name="dietaryRestrictions"
                  value="vegan"
                  onChange={handleCheckboxChange}
                />{" "}
                Vegan
              </label>
              <label>
                <input
                  type="checkbox"
                  name="dietaryRestrictions"
                  value="gluten-free"
                  onChange={handleCheckboxChange}
                />{" "}
                Gluten-Free
              </label>
              <label>
                <input
                  type="checkbox"
                  name="dietaryRestrictions"
                  value="keto"
                  onChange={handleCheckboxChange}
                />{" "}
                Keto
              </label>
            </div>
          </div>

          <div className="form-group">
            <label>
              <strong>Allergies:</strong>
            </label>
            <div className="checkbox-group">
              <label>
                <input
                  type="checkbox"
                  name="allergies"
                  value="nuts"
                  onChange={handleCheckboxChange}
                />{" "}
                Nuts
              </label>
              <label>
                <input
                  type="checkbox"
                  name="allergies"
                  value="dairy"
                  onChange={handleCheckboxChange}
                />{" "}
                Dairy
              </label>
              <label>
                <input
                  type="checkbox"
                  name="allergies"
                  value="shellfish"
                  onChange={handleCheckboxChange}
                />{" "}
                Shellfish
              </label>
            </div>
          </div>
        </div>
      </form>

      <button type="submit" className="submit-btn" onClick={handleSubmit}>
        Next
      </button>
    </div>
  );
}
