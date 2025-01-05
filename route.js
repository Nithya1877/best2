const express = require("express");
const router = express.Router();
const challengeController = require("../controller");

// Challenge management routes
router.post("/challenges", challengeController.createChallenge);    // Create a new challenge
router.get("/challenges", challengeController.readAllChallenges);   // Get all challenges

module.exports = router;