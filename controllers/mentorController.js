const Mentor = require("../models/Mentor");

// Get all mentors
exports.getMentors = async (req, res) => {
  try {
    const mentors = await Mentor.find();
    res.json(mentors);
  } catch (err) {
    console.error("Error fetching mentors:", err);
    res.status(500).json({ error: "Server error" });
  }
};

// Add a new mentor
exports.addMentor = async (req, res) => {
  console.log("Received body:", req.body);

  const { name, email, contact, status } = req.body;

  if (!name || !email || !contact) {
    return res.status(400).json({ error: "Name, email, and contact are required" });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const contactRegex = /^[0-9]{10}$/;

  if (!emailRegex.test(email)) return res.status(400).json({ error: "Invalid email" });
  if (!contactRegex.test(contact)) return res.status(400).json({ error: "Invalid contact" });

  try {
    const newMentor = new Mentor({ name, email, contact, status });
    await newMentor.save();
    console.log("Mentor saved:", newMentor);
    res.status(201).json(newMentor);
  } catch (err) {
    console.error("Error saving mentor:", err);
    if (err.code === 11000) return res.status(400).json({ error: "Email already exists" });
    res.status(500).json({ error: "Server error" });
  }
};

// Update mentor
exports.updateMentor = async (req, res) => {
  const { name, email, contact, status } = req.body;

  try {
    const mentor = await Mentor.findById(req.params.id);
    if (!mentor) return res.status(404).json({ error: "Mentor not found" });

    mentor.name = name ?? mentor.name;
    mentor.email = email ?? mentor.email;
    mentor.contact = contact ?? mentor.contact;
    mentor.status = status ?? mentor.status;

    await mentor.save();
    res.json(mentor);
  } catch (err) {
    console.error("Error updating mentor:", err);
    res.status(500).json({ error: "Server error" });
  }
};

// Delete mentor
exports.deleteMentor = async (req, res) => {
  try {
    const mentor = await Mentor.findById(req.params.id);
    if (!mentor) return res.status(404).json({ error: "Mentor not found" });

    await mentor.remove();
    res.json({ message: "Mentor deleted successfully" });
  } catch (err) {
    console.error("Error deleting mentor:", err);
    res.status(500).json({ error: "Server error" });
  }
};