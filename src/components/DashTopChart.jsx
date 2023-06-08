import React from "react";
import ReactApexChart from "react-apexcharts";
import "../styles/sla-chart.css";

const options = {
  chart: {
    height: "100%",
    type: "line",
    toolbar: false,
  },
  zoom: {
    enabled: false,
  },
  dataLabels: {
    enabled: false,
  },
  stroke: {
    curve: "smooth",
    // colors: ["#ff0000", "#F55364"],
  },

  colors: ["#6E0FF5", "#F55364", "#546E7A", "#E91E63", "#FF9800"],
  legend: {
    markers: {
      colors: ["#6E0FF5", "#F55364"],
    },
    position: "top",
    horizontalAlign: "left",
    floating: false,
    // offsetY: -25,
    // offsetX: -5,
  },

  xaxis: {
    axisBorder: {
      show: false,
      color: "#78909C",
      offsetX: 0,
      offsetY: 0,
    },
    axisTicks: {
      show: false,
      // borderType: "solid",
      // color: "#78909C",
      // width: 6,
      // offsetX: 0,
      // offsetY: 0,
    },
    zoom: {
      enabled: false,
    },
    // title: {
    //   text: "Hello",
    // },
    categories: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    labels: {
      show: false,
    },
    // title: {
    //   text: "Time Duration",
    // },
  },
  yaxis: {
    zoom: {
      enabled: false,
    },
    // categories: ["0%", "25%", "50%", "75%", "100%"],
    // labels: ["Apples", "Oranges", "Berries", "Grapes"],
    // categories: [1, 22, 33, 4, 20, 200],
    labels: {
      show: true,
      formatter: function (value) {
        return value + " %";
      },
    },
    min: 0,
    max: 100,
    tickAmount: 4,
    // show: false,
    // step: 25,
    // title: {
    //   text: "Avarage Service Level",
    // },
  },
  tooltip: {
    x: {
      format: "dd/MM/yy HH:mm",
    },
  },

  // title: {
  //   text: "Average High & Low Temperature",
  //   align: "right",
  // },
};

const A = {
  a1: [31, 70, 28, 51, 88, 60, 100, 50, 30, 40, 60, 60],
  a2: [80, 30, 58, 15, 88, 30, 40, 20, 90, 20, 90, 40],
};

const B = {
  b1: [90, 32, 45, 32, 20, 52, 41, 20, 30, 40, 70, 30],
  b2: [20, 62, 20, 50, 60, 20, 91, 30, 40, 30, 80, 90],
};

const DashTopChart = ({ dataA = "a2", dataB = "b2" }) => {
  const series = [
    {
      name: "SLA 1",
      data: A[dataA],
    },
    {
      name: "SAL 2",
      data: B[dataB],
    },
  ];

  return (
    <ReactApexChart
      options={options}
      series={series}
      type="line"
      height={230}
      width={"100%"}
    />
  );
};

export default DashTopChart;
