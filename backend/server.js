require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const passport = require("passport"); // Import Passport for Google OAuth
require("./middleware/GoogleAuth"); // Load Google OAuth Middleware

const app = express();

// Configure CORS
app.use(
  cors({
    origin: ["http://localhost:3000", "https://nutritrackpdc.netlify.app"],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.use(express.json());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.log("❌ MongoDB Connection Error:", err));

// Import Routes
const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes"); // Import Google Auth Routes
const mealRoutes = require("./routes/mealRoutes");

app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes); // Add Google Auth Routes
app.use("/api/meals", mealRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log("Environment variables loaded:");
  console.log("- MONGO_URI:", process.env.MONGO_URI ? "✅ Set" : "❌ Missing");
  console.log(
    "- GEMINI_API_KEY:",
    process.env.GEMINI_API_KEY ? "✅ Set" : "❌ Missing"
  );
});
