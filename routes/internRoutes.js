const express = require("express");
const router = express.Router();

const { createIntern, getInterns, updateIntern, deleteIntern } = require("../controllers/internController");

// CRUD routes
router.post("/", createIntern);       // POST /api/interns
router.get("/", getInterns);         // GET /api/interns
router.put("/:id", updateIntern);    // PUT /api/interns/:id
router.delete("/:id", deleteIntern); // DELETE /api/interns/:id

module.exports = router;