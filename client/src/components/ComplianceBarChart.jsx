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

const ComplianceBarChart = ({ data }) => {
  if (data.length === 0) return null; // If no data, exit

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
        <Bar dataKey="Compliant" fill="#00ff00" /> {/* Bright green */}
        <Bar dataKey="Non-compliant" fill="#ff0000" /> {/* Bright red */}
      </BarChart>
    </ResponsiveContainer>
  );
};

export default ComplianceBarChart;
