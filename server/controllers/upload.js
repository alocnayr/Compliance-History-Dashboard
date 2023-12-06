// controllers/uploadController.js
const azureStorageService = require("../services/azureStorageService");

const uploadPdfController = async (req, res, next) => {
  const { pdfData, blobName } = req.body;

  try {
    await azureStorageService.uploadPdf(pdfData, blobName);
    res.status(200).send({ message: "File uploaded successfully" });
  } catch (error) {
    next(error); // Pass errors to the error handling middleware
  }
};

module.exports = {
  uploadPdfController,
};
