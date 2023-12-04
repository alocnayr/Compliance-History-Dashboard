const express = require("express");
const { json } = require("express");
const { BlobServiceClient } = require("@azure/storage-blob");
const cors = require("cors");
const { schedule } = require("node-cron");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 5001;

app.use(cors());
app.use(json({ limit: '50mb' }));
app.use(express.static('client/src'));

// Function to handle PDF upload
const uploadPDFToBlob = async () => {
  try {
    // Add logic to fetch or generate compliance data
    const complianceData = [];

    // Use dynamic import for GeneratePDFReport.mjs
    const generatePDFReportModule = await import('../client/src/GeneratePDFReport.mjs');
    const pdfDoc = generatePDFReportModule.default(complianceData);
    const pdfData = pdfDoc.output('datauristring').split(',')[1];

    const connectionString = process.env.AZURE_STORAGE_CONNECTION_STRING;
    const blobServiceClient = BlobServiceClient.fromConnectionString(connectionString);
    const containerClient = blobServiceClient.getContainerClient("compliance-reports");
    const blobName = `Compliance_Report_${new Date().toISOString()}.pdf`;

    const buffer = Buffer.from(pdfData, "base64");
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);
    await blockBlobClient.upload(buffer, buffer.length);

    console.log('PDF uploaded successfully');
  } catch (error) {
    console.error('Error generating or uploading PDF:', error);
  }
};

schedule('* * * * *', () => {
  uploadPDFToBlob();
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
