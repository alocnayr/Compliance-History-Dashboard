/**
 * @file LineChartComponent.jsx
 * @description Renders a line chart component based on the provided data.
 */

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";


/**
 * @function LineChartComponent
 * @description Renders a line chart based on the provided data.
 * @param {Object} props - The component's properties.
 * @param {Array} props.data - The data to be visualized on the line chart.
 * @returns {React.Component} A React component rendering a line chart.
 */
const LineChartComponent = ({ data }) => {
  if (data.length === 0) return null;

  const dataByYear = data.reduce((acc, curr) => {
    const year = curr.Year;
    const status = curr.Compliance_Status;
    const count = acc.get(year) || { total: 0, compliant: 0, nonCompliant: 0 };
    count.total += 1;
    status === "Compliant" ? (count.compliant += 1) : (count.nonCompliant += 1);
    acc.set(year, count);
    return acc;
  }, new Map());

  const formattedData = Array.from(dataByYear.entries()).map(
    ([year, count]) => ({
      year,
      total: count.total,
      Compliant: count.compliant,
      "Non-compliant": count.nonCompliant,
    })
  );

  /**
     * @description Renders the LineChart component.
     * @returns {React.Component} A React component rendering the LineChart.
   */
  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart data={formattedData} style={{ color: "white" }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#555" />
        <XAxis
          dataKey="year"
          angle={-45}
          textAnchor="end"
          height={50}
          stroke="white"
        />
        <YAxis
          label={{
            value: "Number Of Policies",
            angle: -90,
            position: "insideLeft",
            fill: "white",
          }}
          stroke="white"
        />
        <Tooltip
          labelStyle={{ color: "white" }}
          contentStyle={{
            background: "#555",
            border: "none",
            borderRadius: "5px",
            padding: "10px",
            color: "white",
          }}
        />
        <Legend wrapperStyle={{ color: "white" }} />
        <Line
          type="monotone"
          dataKey="Compliant"
          stroke="#00ff00"
          strokeWidth={3}
        />{" "}
        {/* Bright green */}
        <Line
          type="monotone"
          dataKey="Non-compliant"
          stroke="#ff0000"
          strokeWidth={3}
        />{" "}
        {/* Bright red */}
      </LineChart>
    </ResponsiveContainer>
  );
};

export default LineChartComponent;
