import { useState } from "react";
import axios from "axios";

const Dashboard = () => {
  const [goals, setGoals] = useState("");
  const [mealSchedule, setMealSchedule] = useState([
    "07:00 AM Breakfast",
    "12:30 PM Lunch",
  ]);
  const userId = "USER_ID_FROM_AUTH"; // Replace with actual user ID from authentication

  const updateGoals = async () => {
    try {
      await axios.put("http://localhost:5000/api/users/update-goals", {
        userId,
        goals,
        mealSchedule,
      });
      alert("Goals updated successfully!");
    } catch (error) {
      console.error("Error updating goals:", error);
      alert("Failed to update goals.");
    }
  };

  return (
    <div>
      <h1>Welcome to the Dashboard!</h1>
      <h2>Update Your Goals & Meal Schedule</h2>
      <input
        type="text"
        placeholder="Enter goal (e.g. Weight Loss)"
        value={goals}
        onChange={(e) => setGoals(e.target.value)}
      />
      <button onClick={updateGoals}>Save Changes</button>
    </div>
  );
};

export default Dashboard;
