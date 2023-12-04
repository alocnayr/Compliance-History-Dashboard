const generatePDF = require("./GeneratePDFReport");
const uploadToAzureBlob = require("./UploadToAzureBlob");

const runScheduler = async (complianceData) => {

  setInterval(async () => {
    console.log("Generating and uploading PDF report...");
    const pdfBlob = generatePDF(complianceData);
    await uploadToAzureBlob(pdfBlob);
  }, 5 * 60 * 1000); // Run every 5 minutes
};

runScheduler();