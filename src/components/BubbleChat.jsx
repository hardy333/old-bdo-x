import React from "react";
import ReactApexChart from "react-apexcharts";

var options = {
  legend: {
    // show: false,
  },
  chart: {
    type: "bubble",
    width: "100%",
    toolbar: false,
    height: 200,
  },
  dataLabels: {
    enabled: false,
  },
  fill: {
    opacity: 0.8,
  },
  title: {
    text: "Simple Bubble Chart",
  },
  xaxis: {},
  yaxis: {
    max: 80,
    min: 0,
    tickAmount: 4,
  },
};

const series = [
  {
    name: "Vendor 1",
    data: [
      {
        x: 10,
        y: 20,
        z: 30,
      },
    ],
  },
  {
    name: "vendor 2",
    data: [
      {
        x: 10,
        y: 30,
        z: 50,
      },
    ],
  },
  // {
  //   name: "vendor 3",
  //   data: [
  //     {
  //       x: 10,
  //       y: 20,
  //       z: 30,
  //     },
  //   ],
  // },
  // {
  //   name: "vendor 4",
  //   data: [
  //     {
  //       x: 10,
  //       y: 20,
  //       z: 30,
  //     },
  //   ],
  // },
];

const BubbleChat = () => {
  return <ReactApexChart options={options} series={series} height={250} />;
};

export default BubbleChat;
