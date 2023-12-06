import { useState, useEffect } from "react";
import ComplianceBarChart from "./components/ComplianceBarChart";
import SeverityBarChart from "./components/SeverityBarChart";
import LineChartComponent from "./components/LineChartComponent";
import generatePDFReport from "./components/GeneratePDFReport.jsx";
import StateStreetLogo from "./assets/images/state-street.png";
import Papa from "papaparse";
import "./App.css";

const App = () => {
  const [complianceData, setComplianceData] = useState([]);

  const fetchComplianceData = async () => {
    try {
      const response = await fetch("/Dummy Compliance Data.csv");
      const csvText = await response.text();
      Papa.parse(csvText, {
        header: true,
        dynamicTyping: true,
        complete: (results) => {
          setComplianceData(results.data);
        },
      });
    } catch (error) {
      console.error("Error fetching the CSV file:", error);
    }
  };

  useEffect(() => {
    fetchComplianceData();
  }, []);

  const uploadPDFToBlob = async (pdfData) => {
    try {
      const apiUrl = import.meta.env.VITE_API_URL;
      const response = await fetch(`${apiUrl}/upload`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          pdfData,
          blobName: `Compliance_Report_${new Date().toISOString()}.pdf`,
        }),
      });

      if (!response.ok) {
        throw new Error(`Error uploading PDF: ${response.statusText}`);
      }

      console.log("PDF uploaded successfully");
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleDownloadPDF = async () => {
    const pdfDoc = generatePDFReport(complianceData);
    pdfDoc.save(`Compliance_Report_${new Date().toISOString()}.pdf`);
  };

  const automatePDF = async () => {
    try {
      const pdfDoc = generatePDFReport(complianceData);
      const pdfData = pdfDoc.output("datauristring").split(",")[1];
      await uploadPDFToBlob(pdfData);
    } catch (error) {
      console.error("Error in automatePDF:", error);
    }
  };

  useEffect(() => {
    const millisecondsPerWeek = 60 * 60 * 24 * 7 * 1000;
    const uploadInterval = setInterval(automatePDF, millisecondsPerWeek);

    return () => clearInterval(uploadInterval);
  }, [complianceData]);

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
