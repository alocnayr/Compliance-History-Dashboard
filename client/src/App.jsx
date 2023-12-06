import { useState, useEffect } from "react";

import ComplianceBarChart from "./components/ComplianceBarChart";
import SeverityBarChart from "./components/SeverityBarChart";
import LineChartComponent from "./components/LineChartComponent";
import generatePDFReport from "./components/GeneratePDFReport.jsx";
import StateStreetLogo from "./assets/state-street.png";

import Papa from "papaparse";
import "./App.css";

const App = () => {
  const [complianceData, setComplianceData] = useState([]);

  useEffect(() => {
    fetch("/Dummy Compliance Data.csv")
      .then((response) => response.text())
      .then((csvText) => {
        Papa.parse(csvText, {
          header: true,
          dynamicTyping: true,
          complete: (results) => {
            setComplianceData(results.data);
          },
        });
      })
      .catch((error) => {
        console.error("Error fetching the CSV file:", error);
      });
  }, []);

  const uploadPDFToBlob = async (pdfData) => {
    try {
      // Send a POST request to the /upload endpoint
      const response = await fetch("http://localhost:5001/upload", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          pdfData,
          blobName: `Compliance_Report_${new Date().toISOString()}.pdf`,
        }),
      });

      if (response.ok) {
        console.log("PDF uploaded successfully");
      } else {
        console.error("Error uploading PDF:", response.statusText);
      }
    } catch (error) {
      console.error("Error uploading PDF:", error);
    }
  };

  const handleDownloadPDF = async () => {
    const pdfDoc = generatePDFReport(complianceData);
    pdfDoc.save(`Compliance_Report_${new Date().toISOString()}.pdf`);
  };

  const automatePDF = async () => {
    try {
      const pdfDoc = generatePDFReport(complianceData);

      // Convert the PDF to a base64 encoded string
      const pdfData = pdfDoc.output("datauristring").split(",")[1];

      // Upload the PDF to Blob Storage
      uploadPDFToBlob(pdfData);
    } catch (error) {
      console.error("Error generating PDF:", error);
    }
  };

  useEffect(() => {
    const uploadInterval = setInterval(() => {
      automatePDF();
    }, 60000); // 60000 milliseconds = 1 minute

    // Clean up the interval on component unmount
    return () => clearInterval(uploadInterval);
  }, []);

  return (
    <div className="app">
      <div className="hud">
        <img
          src={StateStreetLogo}
          alt="State Street"
          className="state-street-logo"
        />
        <h1 className="hud-title">Compliance Dashboard</h1>
        <button onClick={handleDownloadPDF}>Download PDF Report</button>
      </div>
      <div className="dark-mode">
        <div className="chart-container">
          <h1 className="chart-title">Compliance History Chart</h1>
          <ComplianceBarChart data={complianceData} />
        </div>
        <div className="chart-container">
          <h1 className="chart-title">Line Chart</h1>
          <LineChartComponent data={complianceData} />
        </div>
        <div className="chart-container">
          <h1 className="chart-title">Severity Bar Chart</h1>
          <SeverityBarChart data={complianceData} />
        </div>
      </div>
    </div>
  );
};

export default App;
