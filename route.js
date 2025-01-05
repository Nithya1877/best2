const express = require("express");
const router = express.Router();
const challengerController = require("../controller");

// Challenge management routes
router.post("/", challengerController.createChallenge);             // POST /challenges
router.get("/", challengerController.readAllChallenges);