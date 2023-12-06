// routes/uploadRoutes.js
const express = require("express");
const router = express.Router();
const { uploadPdfController } = require("../controllers/upload");

router.post("/", uploadPdfController);

module.exports = router;
