const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

// Connect to MongoDB (without deprecated options)
mongoose
  .connect(process.env.MONGODB_URI || "mongodb://localhost:27017/notes-manager")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));

// Import routes
const noteRoutes = require("./routes/noteRoutes");
app.use("/api/notes", noteRoutes);

// Export the handler for Vercel to use
module.exports = app;
