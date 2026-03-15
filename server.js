require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db"); // connect to MongoDB

// Import routes
const internRoutes = require("./routes/internRoutes");
const mentorRoutes = require("./routes/mentorRoutes");
const authRoutes = require("./routes/auth.routes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectDB();

// Routes with proper namespace
app.use("/api/interns", internRoutes);
app.use("/api/mentors", mentorRoutes);
app.use("/auth", authRoutes);

// Health check route
app.get("/", (req, res) => {
  res.send("Server is running");
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});