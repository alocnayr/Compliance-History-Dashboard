// ComplianceHistoryChart.js

import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

const ComplianceHistoryChart = ({ data }) => {
  const chartRef = useRef();

  useEffect(() => {
    const svg = d3.select(chartRef.current);
    const parseDate = d3.timeParse("%Y");

    // Parse CSV data
    const parsedData = d3.csvParse(data, (d) => ({
      Date: parseDate(d.Date),
      ComplianceStatus: d["Compliance Status"],
    }));

    // Group data by year
    const dataByYear = d3.group(parsedData, (d) => d.Date.getFullYear());

    // D3.js logic to create a bar chart
    const width = 600;
    const height = 300;

    const xScale = d3
      .scaleBand()
      .domain(Array.from(dataByYear.keys()))
      .range([0, width])
      .padding(0.1);

    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(dataByYear, (d) => d[1].length)])
      .range([height, 0]);

    svg
      .selectAll("rect")
      .data(dataByYear)
      .enter()
      .append("rect")
      .attr("x", (d) => xScale(d[0]))
      .attr("y", (d) => yScale(d[1].length))
      .attr("width", xScale.bandwidth())
      .attr("height", (d) => height - yScale(d[1].length))
      .attr("fill", "steelblue");
  }, [data]);

  return <svg ref={chartRef}></svg>;
};

export default ComplianceHistoryChart;
