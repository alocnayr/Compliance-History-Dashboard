import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  ResponsiveContainer
} from 'recharts';

const SeverityBarChart = ({ data }) => {
  if (data.length === 0) return null; // If no data, exit

  const severityColors = {
    Low: "#3498db",    // Nice blue color for Low
    Medium: "#f39c12", // Yellow-oranish color for Medium
    High: "#e74c3c"    // Red-purplish color for High
  };

  const dataByYear = data.reduce((acc, curr) => {
    const year = curr.Year;
    const severity = curr.Severity;
    const count = (acc.get(year) || { Low: 0, Medium: 0, High: 0 });
    count[severity] += 1;
    acc.set(year, count);
    return acc;
  }, new Map());

  const formattedData = Array.from(dataByYear.entries()).map(([year, count]) => ({
    year,
    ...count
  }));

  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart data={formattedData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="year" angle={-45} textAnchor="end" height={50} />
        <YAxis label={{ value: 'Number Of Policies', angle: -90, position: 'insideLeft' }} />
        <Tooltip />
        <Legend />
        <Bar dataKey="Low" fill={severityColors.Low} />
        <Bar dataKey="Medium" fill={severityColors.Medium} />
        <Bar dataKey="High" fill={severityColors.High} />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default SeverityBarChart;
