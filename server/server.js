const express = require("express");
const cors = require("cors");

require("dotenv").config();

const uploadRoutes = require("./routes/upload");

const app = express();
const port = process.env.PORT || 3000;

app.use(cors()); 
app.use(express.json({ limit: "50mb" })); 

app.use("/upload", uploadRoutes); 

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
