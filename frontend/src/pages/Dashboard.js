import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  ChevronDown,
  User,
  Target,
  Utensils,
  FileText,
  Loader2,
} from "lucide-react";
import "../styles/Dashboard.css";
import axios from "axios";

const Dashboard = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState("personal");
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is authenticated
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    // Load data from localStorage
    const loadUserData = async () => {
      // Get user data from registration process
      const registrationData =
        JSON.parse(localStorage.getItem("registrationData")) || {};
      console.log("Registration data:", registrationData);

      try {
        // Fetch personalized diet plan from backend
        console.log("Calling backend API...");
        const response = await axios.post(
          "http://localhost:5000/api/meals/generate-diet-plan",
          registrationData,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("Backend API response:", response.data);
        const dietPlan = response.data;

        if (!dietPlan) {
          throw new Error("No diet plan received from backend");
        }

        setUserData({
          personalInfo: {
            fullName: registrationData.fullName || "",
            email: registrationData.email || "",
            dateOfBirth: registrationData.dob || "",
            gender: registrationData.gender || "",
            height: registrationData.height || "",
            weight: registrationData.weight || "",
            activityLevel: registrationData.activityLevel || "",
            allergies: registrationData.allergies || [],
            dietaryRestrictions: registrationData.dietaryRestrictions || [],
          },
          dietGoals: {
            weightGoal: registrationData.dietGoals || [],
            targetWeight: registrationData.targetWeight || "",
            weeklyGoal: registrationData.weeklyGoal || "",
            activityLevel: registrationData.activityLevel || "",
            dietaryRestrictions: registrationData.dietaryRestrictions || [],
            healthConditions: registrationData.healthConditions || [],
            supplementPreferences: registrationData.supplementPreferences || [],
            mealPreferences: registrationData.mealPreferences || {},
            budget: registrationData.budget || "",
          },
          cuisinePreferences: registrationData.cuisinePreferences || [],
          personalizedPlan: dietPlan,
        });
      } catch (error) {
        console.error("Error loading user data:", error);
        console.error("Error details:", error.response?.data || error.message);
        // Show error to user
        alert("Failed to generate diet plan. Please try again later.");
        // Set default values if API call fails
        setUserData({
          personalInfo: {
            fullName: registrationData.fullName || "",
            email: registrationData.email || "",
            dateOfBirth: registrationData.dob || "",
            gender: registrationData.gender || "",
            height: registrationData.height || "",
            weight: registrationData.weight || "",
            activityLevel: registrationData.activityLevel || "",
            allergies: registrationData.allergies || [],
            dietaryRestrictions: registrationData.dietaryRestrictions || [],
          },
          dietGoals: {
            weightGoal: registrationData.dietGoals || [],
            targetWeight: registrationData.targetWeight || "",
            weeklyGoal: registrationData.weeklyGoal || "",
            activityLevel: registrationData.activityLevel || "",
            dietaryRestrictions: registrationData.dietaryRestrictions || [],
            healthConditions: registrationData.healthConditions || [],
            supplementPreferences: registrationData.supplementPreferences || [],
            mealPreferences: registrationData.mealPreferences || {},
            budget: registrationData.budget || "",
          },
          cuisinePreferences: registrationData.cuisinePreferences || [],
          personalizedPlan: {
            targetCalories: 2200,
            macros: {
              carbohydrates: { percentage: 40, grams: 220 },
              protein: { percentage: 30, grams: 165 },
              fats: { percentage: 30, grams: 73 },
            },
            mealPlan: {
              breakfast:
                "Vegetarian omelette with spinach and feta, whole grain toast, and fresh fruit.",
              lunch:
                "Mediterranean bowl with quinoa, chickpeas, cucumber, tomatoes, and olive oil dressing.",
              dinner: "Baked salmon with roasted vegetables and brown rice.",
              snacks:
                "Greek yogurt with berries, mixed nuts, or vegetable sticks with hummus.",
            },
            shoppingList: {
              proteins: [
                "Eggs",
                "Greek yogurt",
                "Salmon",
                "Chicken breast",
                "Tofu",
              ],
              grainsLegumes: [
                "Quinoa",
                "Brown rice",
                "Whole grain bread",
                "Chickpeas",
                "Lentils",
              ],
              vegetablesFruits: [
                "Spinach",
                "Bell peppers",
                "Broccoli",
                "Berries",
                "Bananas",
              ],
              healthyFats: [
                "Olive oil",
                "Avocados",
                "Mixed nuts",
                "Chia seeds",
                "Flaxseeds",
              ],
            },
          },
        });
      } finally {
        setIsLoading(false);
      }
    };

    loadUserData();
  }, [navigate]);

  const toggleSection = (section) => {
    setActiveSection(activeSection === section ? null : section);
  };

  const handleEdit = (section) => {
    switch (section) {
      case "personal":
        navigate("/basic-user-info", { state: { isEdit: true } });
        break;
      case "goals":
        navigate("/diet-goals", { state: { editSection: "goals" } });
        break;
      case "cuisine":
        navigate("/diet-goals", { state: { editSection: "cuisine" } });
        break;
      default:
        break;
    }
  };

  if (isLoading) {
    return (
      <div className="loading-container">
        <Loader2 className="loading-spinner" />
        <p>Loading your personalized diet plan...</p>
      </div>
    );
  }

  if (!userData) return <div className="loading">Loading...</div>;

  const capitalizeFirstLetter = (str) => {
    return str
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  };

  const formatDisplayValue = (value, key) => {
    if (Array.isArray(value)) {
      return value
        .map((item) => {
          // Split by capital letters and join with space
          const words = item.replace(/([A-Z])/g, " $1").trim();
          // Capitalize first letter of each word
          return words
            .split(" ")
            .map(
              (word) =>
                word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
            )
            .join(" ");
        })
        .join(", ");
    }
    if (typeof value === "object" && value !== null) {
      if (Object.keys(value).length === 0) return "";
      return Object.entries(value)
        .filter(([_, included]) => included)
        .map(([key]) => {
          // Split by capital letters and join with space
          const words = key.replace(/([A-Z])/g, " $1").trim();
          // Capitalize first letter of each word
          return words
            .split(" ")
            .map(
              (word) =>
                word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
            )
            .join(" ");
        })
        .join(", ");
    }
    // Special handling for full name to capitalize each word
    if (key === "fullName") {
      return capitalizeFirstLetter(value.toString());
    }
    // Preserve original case for email
    if (key === "email") {
      return value.toString();
    }
    return (
      value.toString().charAt(0).toUpperCase() +
      value.toString().slice(1).toLowerCase()
    );
  };

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>Your Nutrition Dashboard</h1>
        <button className="logout-button" onClick={() => navigate("/login")}>
          Logout
        </button>
      </header>

      <main className="dashboard-content">
        {/* Personal Information Section */}
        <section className="dashboard-section">
          <button
            className="section-header"
            onClick={() => toggleSection("personal")}
          >
            <div className="section-title">
              <User className="section-icon" />
              <div>
                <h2>Personal Information</h2>
                <p className="section-subtitle">Your basic details</p>
              </div>
            </div>
            <ChevronDown
              className={`chevron ${
                activeSection === "personal" ? "rotated" : ""
              }`}
            />
          </button>
          {activeSection === "personal" && (
            <div className="section-content">
              <div className="info-grid">
                {Object.entries(userData.personalInfo).map(
                  ([key, value]) =>
                    value && (
                      <div key={key} className="info-row">
                        <span className="info-label">
                          {key
                            .replace(/([A-Z])/g, " $1")
                            .trim()
                            .replace(/^\w/, (c) => c.toUpperCase())}
                          :
                        </span>
                        <span className="info-value">
                          {formatDisplayValue(value, key)}
                        </span>
                      </div>
                    )
                )}
              </div>
              <button
                className="edit-button"
                onClick={() => handleEdit("personal")}
              >
                <span className="edit-icon">✎</span> Edit
              </button>
            </div>
          )}
        </section>

        {/* Diet Goals Section */}
        <section className="dashboard-section">
          <div className="section-header">
            <div className="section-header-content">
              <div className="section-title">
                <Target className="section-icon" />
                <div>
                  <h2>Diet Goals</h2>
                  <p className="section-subtitle">Your nutrition objectives</p>
                </div>
              </div>
              <button
                className="edit-button"
                onClick={() => handleEdit("goals")}
              >
                <span className="edit-icon">✎</span> Edit
              </button>
            </div>
          </div>
          <div className="section-content">
            <div className="info-grid">
              {Object.entries(userData.dietGoals)
                .filter(
                  ([key, value]) =>
                    key !== "cuisinePreferences" &&
                    value &&
                    (typeof value === "object"
                      ? Object.keys(value).length > 0
                      : true)
                )
                .map(([key, value]) => (
                  <div key={key} className="info-row">
                    <span className="info-label">
                      {key
                        .replace(/([A-Z])/g, " $1")
                        .trim()
                        .replace(/^\w/, (c) => c.toUpperCase())}
                      :
                    </span>
                    <span className="info-value">
                      {formatDisplayValue(value, key)}
                    </span>
                  </div>
                ))}
            </div>
          </div>
        </section>

        {/* Cuisine Preferences Section */}
        <section className="dashboard-section">
          <div className="section-header">
            <div className="section-header-content">
              <div className="section-title">
                <Utensils className="section-icon" />
                <div>
                  <h2>Cuisine Preferences</h2>
                  <p className="section-subtitle">Your favorite food types</p>
                </div>
              </div>
              <button
                className="edit-button"
                onClick={() => handleEdit("cuisine")}
              >
                <span className="edit-icon">✎</span> Edit
              </button>
            </div>
          </div>
          <div className="section-content">
            <div className="cuisine-tags">
              {userData.cuisinePreferences.map((cuisine) => (
                <span key={cuisine} className="cuisine-tag">
                  {capitalizeFirstLetter(cuisine)}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Personalized Diet Plan Section */}
        <section className="personalized-plan-section">
          <div className="section-title">
            <FileText className="section-icon" />
            <div className="title-content">
              <h1>PERSONALIZED DIET PLAN</h1>
              <p className="section-subtitle">
                Your customized nutrition plan based on your goals and
                preferences
              </p>
            </div>
          </div>

          <div className="plan-content">
            <div className="calorie-target">
              <h4>Daily Calorie Target</h4>
              <p>
                Based on your height, weight, and activity level, your
                recommended daily calorie intake is{" "}
                <strong>
                  {userData.personalizedPlan.targetCalories} calories
                </strong>
                .
              </p>
            </div>

            <div className="macros-section">
              <h4>Macronutrient Distribution</h4>
              <div className="macros-grid">
                {Object.entries(userData.personalizedPlan.macros).map(
                  ([macro, data]) => (
                    <div key={macro} className="macro-card">
                      <span className="macro-percentage">
                        {data.percentage}%
                      </span>
                      <span className="macro-name">
                        {macro.charAt(0).toUpperCase() + macro.slice(1)}
                      </span>
                      <span className="macro-grams">{data.grams}g daily</span>
                    </div>
                  )
                )}
              </div>
            </div>

            <div className="meal-plan">
              <h4>Meal Plan Suggestions</h4>
              <div className="meal-cards">
                {Object.entries(userData.personalizedPlan.mealPlan).map(
                  ([meal, description]) => (
                    <div key={meal} className="meal-card">
                      <h5>{meal.charAt(0).toUpperCase() + meal.slice(1)}</h5>
                      <p>{description}</p>
                    </div>
                  )
                )}
              </div>
            </div>

            <div className="shopping-list">
              <h4>Weekly Shopping List</h4>
              <div className="shopping-grid">
                <div className="shopping-column">
                  <h5>Proteins</h5>
                  <ul>
                    {userData.personalizedPlan.shoppingList.proteins.map(
                      (item) => (
                        <li key={item}>{item}</li>
                      )
                    )}
                  </ul>
                </div>
                <div className="shopping-column">
                  <h5>Vegetables & Fruits</h5>
                  <ul>
                    {userData.personalizedPlan.shoppingList.vegetablesFruits.map(
                      (item) => (
                        <li key={item}>{item}</li>
                      )
                    )}
                  </ul>
                </div>
                <div className="shopping-column">
                  <h5>Grains & Legumes</h5>
                  <ul>
                    {userData.personalizedPlan.shoppingList.grainsLegumes.map(
                      (item) => (
                        <li key={item}>{item}</li>
                      )
                    )}
                  </ul>
                </div>
                <div className="shopping-column">
                  <h5>Healthy Fats</h5>
                  <ul>
                    {userData.personalizedPlan.shoppingList.healthyFats.map(
                      (item) => (
                        <li key={item}>{item}</li>
                      )
                    )}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
