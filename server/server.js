const express = require("express");
const cors = require("cors");
const path = require("path");

require("dotenv").config();

const uploadRoutes = require("./routes/upload");

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json({ limit: "50mb" }));

app.use("/upload", uploadRoutes);

// Serve static files from the React app
app.use(express.static(path.join(__dirname, "../client/dist")));

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/../client/dist/index.html"));
});

app.use((req, res, next) => {
  res.status(404).json({ message: "Not Found" });
});

app.use((error, req, res, next) => {
  console.error(error);
  const status = error.statusCode || 500;
  const message = error.message || "Internal Server Error";
  const data = error.data;
  res.status(status).json({ message: message, data: data });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
