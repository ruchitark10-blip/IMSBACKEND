const Intern = require("../models/Intern");

exports.createIntern = async (req, res) => {

  try {

    const { name, email, college, department, mentor } = req.body;

    if (!name || !email || !college || !department || !mentor) {
      return res.status(400).json({
        message: "All fields are required"
      });
    }

    const existing = await Intern.findOne({ email });

    if (existing) {
      return res.status(400).json({
        message: "Intern with this email already exists"
      });
    }

    const intern = await Intern.create({
      name,
      email,
      college,
      department,
      mentor
    });

    res.status(201).json(intern);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Server error"
    });

  }

};
exports.getInterns = async (req, res) => {

  try {

    const interns = await Intern.find().sort({ createdAt: -1 });

    res.json(interns);

  } catch (error) {

    res.status(500).json({
      message: "Server error"
    });

  }

};