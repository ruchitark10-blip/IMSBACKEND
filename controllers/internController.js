const Intern = require("../models/Intern");

// Create new intern
exports.createIntern = async (req, res) => {
  try {
    const { name, email, college, department, mentor, status = "Active" } = req.body;
    if (!name || !email || !college || !department || !mentor) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existing = await Intern.findOne({ email });
    if (existing) return res.status(400).json({ message: "Intern with this email already exists" });

    const intern = await Intern.create({ name, email, college, department, mentor, status });
    res.status(201).json(intern);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get all interns
exports.getInterns = async (req, res) => {
  try {
    const interns = await Intern.find().sort({ createdAt: -1 });
    res.json(interns);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Update intern
exports.updateIntern = async (req, res) => {
  try {
    const intern = await Intern.findById(req.params.id);
    if (!intern) return res.status(404).json({ message: "Intern not found" });

    const { name, email, college, department, mentor, status } = req.body;
    intern.name = name ?? intern.name;
    intern.email = email ?? intern.email;
    intern.college = college ?? intern.college;
    intern.department = department ?? intern.department;
    intern.mentor = mentor ?? intern.mentor;
    intern.status = status ?? intern.status;

    await intern.save();
    res.json(intern);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Delete intern
exports.deleteIntern = async (req, res) => {
  try {
    const intern = await Intern.findById(req.params.id);
    if (!intern) return res.status(404).json({ message: "Intern not found" });

    await intern.remove();
    res.json({ message: "Intern deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};