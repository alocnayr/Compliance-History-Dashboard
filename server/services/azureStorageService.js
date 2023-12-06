// services/azureStorageService.js
const { BlobServiceClient } = require("@azure/storage-blob");

// services/azureStorageService.js
const connectionString = process.env.AZURE_STORAGE_CONNECTION_STRING;
const containerName = "compliance-reports"; // Container name can also be stored in an environment variable

exports.uploadPdf = async (pdfData, blobName) => {
  const blobServiceClient =
    BlobServiceClient.fromConnectionString(connectionString);
  const containerClient = blobServiceClient.getContainerClient(containerName);
  const blockBlobClient = containerClient.getBlockBlobClient(blobName);

  const buffer = Buffer.from(pdfData, "base64");
  await blockBlobClient.upload(buffer, buffer.length);
};
