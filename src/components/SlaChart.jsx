import React from "react";
import ReactApexChart from "react-apexcharts";
import "../styles/sla-chart.css";

const options = {
  chart: {
    height: 350,
    type: "line",
  },
  zoom: {
    enabled: false,
  },
  dataLabels: {
    enabled: false,
  },
  stroke: {
    curve: "smooth",
    // colors: ["#6E0FF5", "#F55364"],
  },
  legend: {
    // show: false,
  },
  colors: ["#6E0FF5", "#F55364", "#546E7A", "#E91E63", "#FF9800"],
  legend: {
    markers: {
      colors: ["#6E0FF5", "#F55364"],
    },
  },
  xaxis: {
    type: "datetime",
    categories: [
      "2018-09-19T00:00:00.000Z",
      "2018-09-19T01:30:00.000Z",
      "2018-09-19T02:30:00.000Z",
      "2018-09-19T03:30:00.000Z",
      "2018-09-19T04:30:00.000Z",
      "2018-09-19T05:30:00.000Z",
      "2018-09-19T06:30:00.000Z",
    ],
    title: {
      text: "Time Duration",
    },
  },
  yaxis: {
    min: 5,
    max: 100,
    title: {
      text: "Avarage Service Level",
    },
  },
  tooltip: {
    x: {
      format: "dd/MM/yy HH:mm",
    },
  },
};

const A = {
  a1: [31, 70, 28, 51, 88, 60, 100],
  a2: [80, 30, 58, 15, 88, 30, 40],
};

const B = {
  b1: [90, 32, 45, 32, 20, 52, 41],
  b2: [20, 62, 35, 30, 28, 12, 91],
};

const SlaChart = ({ dataA, dataB }) => {
  const series = [
    {
      name: "Duration A",
      data: A[dataA],
    },
    {
      name: "Duration B",
      data: B[dataB],
    },
  ];

  return (
    <ReactApexChart
      options={options}
      series={series}
      type="line"
      height={350}
      width={1100}
    />
  );
};

export default SlaChart;
