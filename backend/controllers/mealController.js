const { generateDietPlan } = require("../services/geminiService");

exports.generateDietPlan = async (req, res) => {
  try {
    console.log("Received user data:", req.body);
    const userData = req.body;

    // Call the Gemini service to generate the diet plan
    const plan = await generateDietPlan(userData);
    console.log("Generated diet plan:", plan);

    res.json(plan);
  } catch (err) {
    console.error("Error generating diet plan:", err);
    res.status(500).json({
      error: "Failed to generate diet plan",
      message: err.message,
    });
  }
};
