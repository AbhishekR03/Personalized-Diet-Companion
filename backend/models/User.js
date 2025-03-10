const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  googleId: String,
  resetToken: String,
  resetTokenExpiry: Date,
  goals: String,
  mealSchedule: [String],
});

module.exports = mongoose.model("User", UserSchema);
