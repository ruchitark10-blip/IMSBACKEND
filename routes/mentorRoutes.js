const express = require("express");
const router = express.Router();
const mentorController = require("../controllers/mentorController");

// CRUD routes
router.get("/", mentorController.getMentors);
router.post("/", mentorController.addMentor);
router.put("/:id", mentorController.updateMentor);
router.delete("/:id", mentorController.deleteMentor);

module.exports = router;