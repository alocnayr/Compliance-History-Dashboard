/**
 * Renders a bar chart component to display severity data.
 *
 * @component
 * @param {Object[]} data - The data array containing severity information.
 * @returns {JSX.Element} The SeverityBarChart component.
 */
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

const SeverityBarChart = ({ data }) => {
  // If no data, exit
  if (data.length === 0) return null;

  // Define severity colors
  const severityColors = {
    Low: "#0ac6ff", // Nice blue color for Low
    Medium: "#fab72d", // Yellow-oranish color for Medium
    High: "#ff0000", // Red-purplish color for High
  };

  // Group data by year and severity
  const dataByYear = data.reduce((acc, curr) => {
    const year = curr.Year;
    const severity = curr.Severity;
    const count = acc.get(year) || { Low: 0, Medium: 0, High: 0 };
    count[severity] += 1;
    acc.set(year, count);
    return acc;
  }, new Map());

  // Format data for chart
  const formattedData = Array.from(dataByYear.entries()).map(
    ([year, count]) => ({
      year,
      ...count,
    })
  );

  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart data={formattedData} style={{ color: "white" }}>
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
        <Bar dataKey="Low" fill={severityColors.Low} />
        <Bar dataKey="Medium" fill={severityColors.Medium} />
        <Bar dataKey="High" fill={severityColors.High} />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default SeverityBarChart;
