const express = require("express");
const { generateDietPlan } = require("../controllers/mealController");
const router = express.Router();

// Temporarily remove authentication for testing
router.post("/generate-diet-plan", generateDietPlan);

module.exports = router;
