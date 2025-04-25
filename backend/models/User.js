const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  dob: String,
  gender: String,
  height: String,
  weight: String,
  activityLevel: String,
  allergies: [String],
  dietaryRestrictions: [String],
  dietGoals: [String],
  budget: String,
  cuisinePreferences: [String],
  registrationStep: {
    type: Number,
    default: 1,
  },
  registrationComplete: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("User", UserSchema);
