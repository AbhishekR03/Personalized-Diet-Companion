const mongoose = require("mongoose");

const MealSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  goal: String,
  dietaryRestrictions: String,
  budget: Number,
  mealSuggestions: Array,
});

module.exports = mongoose.model("Meal", MealSchema);
