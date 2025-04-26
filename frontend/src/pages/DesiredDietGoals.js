"use client";

import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../styles/DesiredDietGoals.css";
import ProgressBar from "../components/ProgressBar";

const dietGoalsList = [
  { id: "weightLoss", label: "Weight Loss" },
  { id: "muscleGain", label: "Muscle Gain" },
  { id: "maintenance", label: "Maintenance" },
  { id: "healthyEating", label: "Healthy Eating" },
  { id: "energyBoost", label: "Energy Boost" },
];

const cuisinesList = [
  { id: "italian", label: "Italian" },
  { id: "mexican", label: "Mexican" },
  { id: "japanese", label: "Japanese" },
  { id: "indian", label: "Indian" },
  { id: "mediterranean", label: "Mediterranean" },
  { id: "chinese", label: "Chinese" },
  { id: "thai", label: "Thai" },
  { id: "american", label: "American" },
];

const DesiredDietGoals = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const editSection = location.state?.editSection;
  const isNewRegistration = !editSection;

  const [formData, setFormData] = useState({
    dietGoals: [],
    budget: "",
    cuisinePreferences: [],
  });

  useEffect(() => {
    // Load existing data from localStorage
    const storedData = JSON.parse(
      localStorage.getItem("registrationData") || "{}"
    );
    setFormData((prev) => ({
      ...prev,
      dietGoals: storedData.dietGoals || [],
      budget: storedData.budget || "",
      cuisinePreferences: storedData.cuisinePreferences || [],
    }));
  }, []);

  const handleDietGoalsChange = (id) => {
    setFormData((prev) => ({
      ...prev,
      dietGoals: prev.dietGoals.includes(id)
        ? prev.dietGoals.filter((item) => item !== id)
        : [...prev.dietGoals, id],
    }));
  };

  const handleCuisineChange = (id) => {
    setFormData((prev) => ({
      ...prev,
      cuisinePreferences: prev.cuisinePreferences.includes(id)
        ? prev.cuisinePreferences.filter((item) => item !== id)
        : [...prev.cuisinePreferences, id],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Get existing data
    const existingData = JSON.parse(
      localStorage.getItem("registrationData") || "{}"
    );

    // Update only the relevant sections
    const updatedData = {
      ...existingData,
      ...(editSection === "goals" || isNewRegistration
        ? {
            dietGoals: formData.dietGoals,
            budget: formData.budget,
          }
        : {}),
      ...(editSection === "cuisine" || isNewRegistration
        ? {
            cuisinePreferences: formData.cuisinePreferences,
          }
        : {}),
    };

    localStorage.setItem("registrationData", JSON.stringify(updatedData));
    navigate("/dashboard");
  };

  const handleBack = () => {
    if (isNewRegistration) {
      navigate("/basic-user-info");
    } else {
      navigate("/dashboard");
    }
  };

  return (
    <div className="container">
      <div className="form-container">
        <div className="header-section">
          <h1 className="title">Set Your Diet Goals</h1>
          <p className="subtitle">Customize your nutrition plan</p>
        </div>

        <div className="progress-container">
          <ProgressBar currentStep={3} totalSteps={3} />
          <div className="progress-divider"></div>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Show Diet Goals and Budget only for new registration or when editing goals */}
          {(isNewRegistration || editSection === "goals") && (
            <>
              <div className="form-group">
                <h3 className="section-header">Diet Goals</h3>
                <div className="checkbox-group">
                  {dietGoalsList.map((item) => (
                    <div key={item.id} className="checkbox-item">
                      <input
                        type="checkbox"
                        id={`goal-${item.id}`}
                        checked={formData.dietGoals.includes(item.id)}
                        onChange={() => handleDietGoalsChange(item.id)}
                      />
                      <label htmlFor={`goal-${item.id}`}>{item.label}</label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="form-group">
                <h3 className="section-header">Budget</h3>
                <select
                  value={formData.budget}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, budget: e.target.value }))
                  }
                >
                  <option value="">Select your budget</option>
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
            </>
          )}

          {/* Show Cuisine Preferences only for new registration or when editing cuisine */}
          {(isNewRegistration || editSection === "cuisine") && (
            <div className="form-group">
              <h3 className="section-header">Cuisine Preferences</h3>
              <div className="checkbox-group">
                {cuisinesList.map((item) => (
                  <div key={item.id} className="checkbox-item">
                    <input
                      type="checkbox"
                      id={`cuisine-${item.id}`}
                      checked={formData.cuisinePreferences.includes(item.id)}
                      onChange={() => handleCuisineChange(item.id)}
                    />
                    <label htmlFor={`cuisine-${item.id}`}>{item.label}</label>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="button-container">
            <button type="button" className="back-btn" onClick={handleBack}>
              Back
            </button>
            <button type="button" className="next-btn" onClick={handleSubmit}>
              {editSection ? "Save Changes" : "Complete Registration"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DesiredDietGoals;
