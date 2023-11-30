import React, { useState, useEffect } from "react";
import ComplianceHistoryChart from "./ComplianceHistoryChart";
import Papa from "papaparse";

const App = () => {
  const [complianceData, setComplianceData] = useState([]);

  useEffect(() => {
    fetch("/Dummy Compliance Data.csv")
      .then((response) => response.text())
      .then((csvText) => {
        // Parse the CSV data with PapaParse
        Papa.parse(csvText, {
          header: true, // Assumes the first row of your CSV are headers
          dynamicTyping: true, // Automatically converts strings to numbers, booleans, etc.
          complete: (results) => {
            setComplianceData(results.data);
            console.log("Updated data:", results.data); // Log the updated data
          },
        });
      })
      .catch((error) => {
        console.error("Error fetching the CSV file:", error);
      });
  }, []);

  return (
    <div>
      <h1>Compliance History Chart</h1>
      <ComplianceHistoryChart data={complianceData} />
    </div>
  );
};

export default App;
