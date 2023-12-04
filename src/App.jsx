import React, { useState, useEffect } from "react";
import ComplianceBarChart from "./ComplianceBarChart";
import SeverityBarChart from "./SeverityBarChart";
import LineChartComponent from "./LineChartComponent";
import Heatmap from "./HeatMap";
import Papa from "papaparse";
import generatePDFReport from "./GeneratePDFReport";
import uploadReportToAzureBlob from "./UploadReportToAzureBlob";
import "./App.css";
import StateStreetLogo from "./state-street.png";

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

  const handleDownloadPDF = () => {
    const pdfDoc = generatePDFReport(complianceData);
    uploadReportToAzureBlob(pdfDoc);
  };

  return (
    <div className="app">
      <div className="hud">
        <img src={StateStreetLogo} alt="State Street" className="state-street-logo" />
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