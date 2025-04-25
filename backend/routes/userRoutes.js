const express = require("express");
const {
  register,
  login,
  forgotPassword,
  updateGoals,
  updateRegistrationStep,
  getRegistrationProgress,
  getProfile,
  updateProfile,
} = require("../controllers/userController");
const authenticateUser = require("../middleware/authMiddleware");
const router = express.Router();

// Public routes
router.post("/register", register);
router.post("/login", login);
router.post("/forgot-password", forgotPassword);

// Protected routes
router.put("/update-goals", authenticateUser, updateGoals);
router.put("/registration-step", authenticateUser, updateRegistrationStep);
router.get("/registration-progress", authenticateUser, getRegistrationProgress);
router.get("/profile", authenticateUser, getProfile);
router.put("/profile", authenticateUser, updateProfile);

module.exports = router;
