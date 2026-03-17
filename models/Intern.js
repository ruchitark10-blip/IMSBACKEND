const mongoose = require("mongoose");

const internSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    college: { type: String, required: true },
    department: { type: String, required: true },
    mentor: { type: String, required: true },
    status: { type: String, enum: ["Active", "Inactive", "Completed"], default: "Active" },
    password: { type: String, required: true }, // hashed password
    joinedDate: { 
      type: Date, 
      required: true,
      validate: {
        validator: function(date) {
          return date.getFullYear() === 2026; // only allow 2026
        },
        message: "Joined date must be in the year 2026"
      }
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Intern", internSchema);