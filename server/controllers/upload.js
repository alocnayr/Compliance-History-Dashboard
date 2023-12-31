// controllers/uploadController.js
const azureStorageService = require("../services/azureStorageService");

/**
 * Controller function to handle the upload of a PDF file.
 */
const uploadPdfController = async (req, res, next) => {
  const { pdfData, blobName } = req.body;

  try {
    await azureStorageService.uploadPdf(pdfData, blobName);
    res.status(200).send({ message: "File uploaded successfully" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  uploadPdfController,
};
