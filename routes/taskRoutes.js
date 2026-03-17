const express = require("express");
const router = express.Router();
const Task = require("../models/Task");

// 1. CREATE: Assign a new task
router.post("/", async (req, res) => {
  try {
    const { internId, taskName, description, assignDate, deadline } = req.body;
    const newTask = new Task({
      internId,
      taskName,
      description,
      assignDate,
      deadline,
      status: "Pending"
    });
    await newTask.save();
    res.status(201).json({ message: "Task assigned and saved successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Server error: Could not save task" });
  }
});

// 2. READ: Get all tasks (Populated with Intern names for the table)
router.get("/", async (req, res) => {
  try {
    const tasks = await Task.find()
      .populate("internId", "name") // Gets intern name for the 'Assigned Intern' column
      .sort({ createdAt: -1 });
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Error fetching tasks" });
  }
});

// 3. UPDATE: Change Task Status (Required for your editable dropdown)
router.put("/:id", async (req, res) => {
  try {
    const { status } = req.body;
    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true } // Returns the updated document
    );
    
    if (!updatedTask) {
      return res.status(404).json({ message: "Task not found" });
    }
    
    res.status(200).json(updatedTask);
  } catch (error) {
    console.error("Update error:", error);
    res.status(500).json({ message: "Server error: Could not update status" });
  }
});

// 4. DELETE: Remove a task
router.delete("/:id", async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error: Could not delete task" });
  }
});

module.exports = router;