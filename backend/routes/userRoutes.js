const express = require("express");
const {
  register,
  login,
  forgotPassword,
  updateGoals,
} = require("../controllers/userController");
const authenticateUser = require("../middleware/authMiddleware"); // Import JWT Middleware
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/forgot-password", forgotPassword);
router.put("/update-goals", authenticateUser, updateGoals); // ✅ Protected route

module.exports = router;
