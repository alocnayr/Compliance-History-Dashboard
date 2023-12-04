import { BlobServiceClient } from "@azure/storage-blob";

const uploadReportToAzureBlob = async (pdfDoc) => {
    console.log(pdfDoc)
  const blobServiceClient = BlobServiceClient.fromConnectionString(
    "DefaultEndpointsProtocol=https;AccountName=alocnayr;AccountKey=5pIa+lxJyKiRV9qNFijJ3pjxov2ai94/EaqRFAnJoL2+k3luLlzWYpEk0F+reThcB0MPaIykrFIJ+AStlmfTbA==;EndpointSuffix=core.windows.net"
  );

  const containerName = "compliance-reports";
  const blobName = `Compliance_Report_${new Date().toISOString()}.pdf`;

  const containerClient = blobServiceClient.getContainerClient(containerName);
  const blockBlobClient = containerClient.getBlockBlobClient(blobName);

  await blockBlobClient.upload(pdfDoc, pdfDoc.length);

  console.log(`PDF uploaded to Azure Blob Storage: ${blobName}`);
};

export default uploadReportToAzureBlob;