import React from "react";
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  ZAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  ResponsiveContainer
} from 'recharts';

const Heatmap = ({ data }) => {
  if (data.length === 0) return null; // If no data, exit

  const dataByYear = data.reduce((acc, curr) => {
    const year = curr.Year;
    const status = curr.Compliance_Status;
    const severity = curr.Severity;
    const count = (acc.get(year) || { total: 0, compliant: 0, nonCompliant: 0, low: 0, medium: 0, high: 0 });
    count.total += 1;
    status === 'Compliant' ? count.compliant += 1 : count.nonCompliant += 1;
    count[`${severity}Severity`] += 1;
    acc.set(year, count);
    return acc;
  }, new Map());

  const formattedData = Array.from(dataByYear.entries()).map(([year, count]) => ({
    year,
    total: count.total,
    Compliant: count.compliant,
    "Non-compliant": count.nonCompliant,
    "Low Severity": count.low,
    "Medium Severity": count.medium,
    "High Severity": count.high,
  }));

  return (
    <ResponsiveContainer width="100%" height={400}>
      <ScatterChart margin={{ top: 20, right: 20, bottom: 10, left: 10 }}>
        <CartesianGrid />
        <XAxis type="category" dataKey="year" />
        <YAxis dataKey="total" />
        <ZAxis dataKey="total" range={[50, 400]} />
        <Tooltip cursor={{ strokeDasharray: '3 3' }} />
        <Legend />
        <Scatter name="Compliant" data={formattedData} fill="#82ca9d" />
        <Scatter name="Non-compliant" data={formattedData} fill="#e74c3c" />
        <Scatter name="Low Severity" data={formattedData} fill="#8884d8" />
        <Scatter name="Medium Severity" data={formattedData} fill="#82ca9d" />
        <Scatter name="High Severity" data={formattedData} fill="#ffc658" />
        {/* Add more Scatter components for other severity levels as needed */}
      </ScatterChart>
    </ResponsiveContainer>
  );
};

export default Heatmap;
