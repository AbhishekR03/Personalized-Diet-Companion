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

// Register user
exports.register = async (req, res) => {
  try {
    const { email, password, fullName } = req.body;

    // Check if user exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    user = new User({
      email,
      password: hashedPassword,
      fullName,
    });

    await user.save();

    // Create token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });

    res.status(201).json({
      token,
      user: {
        id: user._id,
        email: user.email,
        fullName: user.fullName,
        registrationStep: user.registrationStep,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Login user
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Validate password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Create token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });

    res.json({
      token,
      user: {
        id: user._id,
        email: user.email,
        fullName: user.fullName,
        registrationComplete: user.registrationComplete,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Update user profile
exports.updateProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const updateData = req.body;

    // Update user data
    const user = await User.findByIdAndUpdate(
      userId,
      {
        ...updateData,
        registrationStep: updateData.registrationStep || 1,
        registrationComplete: updateData.registrationComplete || false,
      },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({
      user: {
        id: user._id,
        email: user.email,
        fullName: user.fullName,
        registrationComplete: user.registrationComplete,
        ...updateData,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get user profile
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Update Registration Step
exports.updateRegistrationStep = async (req, res) => {
  try {
    const { userId } = req.user;
    const { stepData, step } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update user data based on the current step
    switch (step) {
      case 2:
        user.personalInfo = { ...user.personalInfo, ...stepData };
        break;
      case 3:
        user.goals = { ...user.goals, ...stepData };
        break;
      default:
        break;
    }

    // Update registration progress
    user.registrationStep = step + 1;
    if (step === 3) {
      user.registrationComplete = true;
    }

    await user.save();

    res.json({
      message: "Registration step updated",
      currentStep: user.registrationStep,
      isComplete: user.registrationComplete,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get Registration Progress
exports.getRegistrationProgress = async (req, res) => {
  try {
    const { userId } = req.user;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({
      currentStep: user.registrationStep,
      isComplete: user.registrationComplete,
      personalInfo: user.personalInfo,
      goals: user.goals,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
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
