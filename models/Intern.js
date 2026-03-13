const mongoose = require("mongoose");

const internSchema = new mongoose.Schema({

  name: {
    type: String,
    required: true
  },

  email: {
    type: String,
    required: true,
    unique: true
  },

  college: {
    type: String,
    required: true
  },

  department: {
    type: String,
    required: true
  },

  mentor: {
    type: String,
    required: true
  }

}, { timestamps: true });

module.exports = mongoose.model("Intern", internSchema);