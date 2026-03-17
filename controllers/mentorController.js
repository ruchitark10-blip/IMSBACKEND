const Mentor = require("../models/Mentor");
const bcrypt = require("bcryptjs");
const sendCredentialsEmail = require("../utils/sendEmail");

function generatePassword(length = 10) {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";
  let password = "";
  for (let i = 0; i < length; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return password;
}

// Exported functions
exports.createMentor = async (req, res) => {
  try {
    const { name, email, contact, status = "Active", joinedDate } = req.body;
    if (!name || !email || !contact || !joinedDate) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const dateObj = new Date(joinedDate);
    if (dateObj.getFullYear() !== 2026) {
      return res.status(400).json({ message: "Joined date must be in the year 2026" });
    }

    const existing = await Mentor.findOne({ email });
    if (existing) return res.status(400).json({ message: "Mentor with this email already exists" });

    const plainPassword = generatePassword(10);
    const hashedPassword = await bcrypt.hash(plainPassword, 10);

    const mentor = await Mentor.create({
      name,
      email,
      contact,
      status,
      joinedDate: dateObj,
      password: hashedPassword
    });

    await sendCredentialsEmail(email, plainPassword, "Mentor");

    res.status(201).json({ ...mentor.toObject(), password: plainPassword });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getMentors = async (req, res) => {
  try {
    const mentors = await Mentor.find().sort({ createdAt: -1 });
    res.json(mentors);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.updateMentor = async (req, res) => {
  try {
    const mentor = await Mentor.findById(req.params.id);
    if (!mentor) return res.status(404).json({ message: "Mentor not found" });

    const { name, email, contact, status, joinedDate } = req.body;
    if (joinedDate) {
      const dateObj = new Date(joinedDate);
      if (dateObj.getFullYear() !== 2026) return res.status(400).json({ message: "Joined date must be in 2026" });
      mentor.joinedDate = dateObj;
    }

    mentor.name = name ?? mentor.name;
    mentor.email = email ?? mentor.email;
    mentor.contact = contact ?? mentor.contact;
    mentor.status = status ?? mentor.status;

    await mentor.save();
    res.json(mentor);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.deleteMentor = async (req, res) => {
  try {
    const mentor = await Mentor.findByIdAndDelete(req.params.id);
    if (!mentor) return res.status(404).json({ message: "Mentor not found" });
    res.json({ message: "Mentor deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};