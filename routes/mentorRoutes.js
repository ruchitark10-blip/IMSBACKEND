const express = require("express");
const router = express.Router();

// Import controller
const mentorController = require("../controllers/mentorController");

// Routes — pass **function references**, no parentheses
router.post("/", mentorController.createMentor);
router.get("/", mentorController.getMentors);
router.put("/:id", mentorController.updateMentor);
router.delete("/:id", mentorController.deleteMentor);

module.exports = router;