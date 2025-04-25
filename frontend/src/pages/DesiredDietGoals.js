import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/DesiredDietGoals.css"; // Ensure CSS is updated

export default function DesiredDietGoals() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    dietGoal: "",
    customGoal: "",
    budget: "",
    cuisinePreferences: [],
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCheckboxChange = (e) => {
    const { name, value, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: checked
        ? [...prev[name], value]
        : prev[name].filter((item) => item !== value),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/meal-planner"); // Navigate to the next page
  };

  return (
    <div className="container">
      <h2 className="title">SET YOUR DIET GOALS</h2>
      <form onSubmit={handleSubmit} className="form-container">
        {/* Diet Goal Section */}
        <div className="form-group">
          <label>
            <strong>Diet Goal:</strong>
          </label>
          <div className="radio-group">
            <label className="radio-option">
              <input
                type="radio"
                name="dietGoal"
                value="Weight Loss"
                onChange={handleChange}
              />
              <span>Weight Loss</span>
            </label>
            <label className="radio-option">
              <input
                type="radio"
                name="dietGoal"
                value="Muscle Gain"
                onChange={handleChange}
              />
              <span>Muscle Gain</span>
            </label>
            <label className="radio-option">
              <input
                type="radio"
                name="dietGoal"
                value="Maintenance"
                onChange={handleChange}
              />
              <span>Maintenance</span>
            </label>
            <label className="radio-option">
              <input
                type="radio"
                name="dietGoal"
                value="Balanced Nutrition"
                onChange={handleChange}
              />
              <span>Balanced Nutrition</span>
            </label>
            <label className="radio-option">
              <input
                type="radio"
                name="dietGoal"
                value="Custom"
                onChange={handleChange}
              />
              <span>Custom Goal:</span>
            </label>
            {formData.dietGoal === "Custom" && (
              <input
                type="text"
                name="customGoal"
                placeholder="Enter your goal"
                className="custom-goal-input"
                onChange={handleChange}
              />
            )}
          </div>
        </div>

        {/* Budget Section */}
        <div className="form-group">
          <label>
            <strong>Budget:</strong>
          </label>
          <select name="budget" value={formData.budget} onChange={handleChange}>
            <option value="">Select</option>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>

        {/* Cuisine Preferences */}
        <div className="form-group">
          <label>
            <strong>Select Your Preferred Cuisine:</strong>
          </label>
          <div className="checkbox-group">
            <label>
              <input
                type="checkbox"
                name="cuisinePreferences"
                value="Indian"
                onChange={handleCheckboxChange}
              />
              Indian
            </label>
            <label>
              <input
                type="checkbox"
                name="cuisinePreferences"
                value="Continental"
                onChange={handleCheckboxChange}
              />
              Continental
            </label>
            <label>
              <input
                type="checkbox"
                name="cuisinePreferences"
                value="Asian"
                onChange={handleCheckboxChange}
              />
              Asian
            </label>
            <label>
              <input
                type="checkbox"
                name="cuisinePreferences"
                value="Mediterranean"
                onChange={handleCheckboxChange}
              />
              Mediterranean
            </label>
            <label>
              <input
                type="checkbox"
                name="cuisinePreferences"
                value="Keto-Friendly"
                onChange={handleCheckboxChange}
              />
              Keto-Friendly
            </label>
            <label>
              <input
                type="checkbox"
                name="cuisinePreferences"
                value="Vegan"
                onChange={handleCheckboxChange}
              />
              Vegan
            </label>
            <label>
              <input
                type="checkbox"
                name="cuisinePreferences"
                value="Any"
                onChange={handleCheckboxChange}
              />
              Any
            </label>
          </div>
        </div>
      </form>

      {/* Navigation Buttons */}
      <div className="button-container">
        <button
          type="button"
          className="back-btn"
          onClick={() => navigate("/basic-user-info")}
        >
          Back
        </button>
        <button type="submit" className="next-btn">
          Next
        </button>
      </div>
    </div>
  );
}
