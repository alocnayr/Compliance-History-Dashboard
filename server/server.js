const express = require("express");
const cors = require("cors");

require("dotenv").config(); // Load environment variables

const uploadRoutes = require("./routes/upload"); // Import the upload routes

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors()); // Enable CORS for all requests
app.use(express.json({ limit: "50mb" })); // Parse JSON bodies with a larger limit

// Routes
app.use("/upload", uploadRoutes); // Use the upload routes

// catch rest of routes and return 404
app.use((req, res, next) => {
  res.status(404).json({ message: "Not Found" });
});

// Error handling middleware
app.use((error, req, res, next) => {
  console.error(error); // Log the error
  const status = error.statusCode || 500;
  const message = error.message || "Internal Server Error";
  const data = error.data;
  res.status(status).json({ message: message, data: data });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
