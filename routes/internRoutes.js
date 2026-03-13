const express = require("express");
const router = express.Router();

const {
  createIntern,
  getInterns
} = require("../controllers/internController");

router.post("/interns", createIntern);
router.get("/interns", getInterns);

module.exports = router;