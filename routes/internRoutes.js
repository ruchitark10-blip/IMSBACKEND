const express = require("express");
const router = express.Router();

// Import controller
const internController = require("../controllers/internController");

// Routes
router.post("/", internController.createIntern);
router.get("/", internController.getInterns);
router.put("/:id", internController.updateIntern);
router.delete("/:id", internController.deleteIntern);

module.exports = router;