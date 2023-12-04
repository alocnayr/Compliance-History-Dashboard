const express = require("express");
const { BlobServiceClient } = require("@azure/storage-blob");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse incoming requests with JSON payloads
app.use(express.json());

app.post("/upload", async (req, res) => {
  const { pdfData, blobName } = req.body; // Assume pdfData is a base64 encoded string
  const connectionString = process.env.AZURE_STORAGE_CONNECTION_STRING;

  try {
    const blobServiceClient =
      BlobServiceClient.fromConnectionString(connectionString);
    const containerClient =
      blobServiceClient.getContainerClient("compliance-reports");
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);

    const buffer = Buffer.from(pdfData, "base64");
    await blockBlobClient.upload(buffer, buffer.length);

    res.status(200).send({ message: "File uploaded successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Error uploading to Azure Blob Storage" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
