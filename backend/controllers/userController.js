const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const { google } = require("googleapis");
require("dotenv").config();

const oAuth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID_GMAIL,
  process.env.GOOGLE_CLIENT_SECRET_GMAIL,
  "https://developers.google.com/oauthplayground"
);
oAuth2Client.setCredentials({
  refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
});

// Send Email Function
const sendEmail = async (to, subject, text) => {
  const accessToken = await oAuth2Client.getAccessToken();
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: process.env.EMAIL,
      clientId: process.env.GOOGLE_CLIENT_ID_GMAIL,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET_GMAIL,
      refreshToken: process.env.GOOGLE_REFRESH_TOKEN,
      accessToken: accessToken.token,
    },
  });

  await transporter.sendMail({ from: process.env.EMAIL, to, subject, text });
};

// Register User
exports.register = async (req, res) => {
  const { name, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({ name, email, password: hashedPassword });
  await user.save();
  res.json({ message: "User registered successfully" });
};

// Login User
exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ message: "User not found" });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
  res.json({ token, user: { name: user.name, email: user.email } });
};

// Forgot Password
exports.forgotPassword = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ message: "User not found" });

  const resetToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
    expiresIn: "15m",
  });
  user.resetToken = resetToken;
  user.resetTokenExpiry = Date.now() + 15 * 60 * 1000;
  await user.save();

  const resetUrl = `http://localhost:3000/reset-password/${resetToken}`;
  await sendEmail(
    email,
    "Password Reset",
    `Click here to reset your password: ${resetUrl}`
  );

  res.json({ message: "Password reset email sent" });
};

// Update Meal Plan
exports.updateGoals = async (req, res) => {
  const { userId, goals, mealSchedule } = req.body;
  await User.findByIdAndUpdate(userId, { goals, mealSchedule });
  res.json({ message: "Goals updated successfully" });
};
