const { BlobServiceClient } = require("@azure/storage-blob");

const connectionString = process.env.AZURE_STORAGE_CONNECTION_STRING;
const containerName = "compliance-reports";

/**
 * Uploads a PDF file to Azure Blob Storage.
 * @param {string} pdfData Base64 encoded PDF data
 * @param {string} blobName Name of the blob to be created
 */
const uploadPdf = async (pdfData, blobName) => {
  try {
    const blobServiceClient =
      BlobServiceClient.fromConnectionString(connectionString);
    const containerClient = blobServiceClient.getContainerClient(containerName);
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);

    const buffer = Buffer.from(pdfData, "base64");
    await blockBlobClient.upload(buffer, buffer.length);

    console.log(`File ${blobName} uploaded successfully.`);
  } catch (error) {
    console.error("Error occurred during file upload:", error);
    throw error;
  }
};

module.exports = {
  uploadPdf,
};
