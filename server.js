require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

// ROUTES
const internRoutes = require("./routes/internRoutes");
const authRoutes = require("./routes/auth.routes"); // ADD THIS

const app = express();

// MIDDLEWARE
app.use(cors());
app.use(express.json());

// DATABASE
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

// ROUTES
app.use("/api", internRoutes);
app.use("/auth", authRoutes); // ADD THIS

// SERVER
app.listen(5000, () => {
  console.log("Server running on port 5000");
});