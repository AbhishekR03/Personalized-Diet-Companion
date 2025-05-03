const express = require("express");
const passport = require("passport");

const router = express.Router();

// Redirect to Google OAuth login
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// Google OAuth Callback
router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "https://nutritrackpdc.netlify.app/login",
    successRedirect: "https://nutritrackpdc.netlify.app/dashboard",
  })
);

module.exports = router;
