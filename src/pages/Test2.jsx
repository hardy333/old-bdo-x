import React, { useState } from "react";
import { Bubble } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";
ChartJS.register(LinearScale, PointElement, Tooltip, Legend);

const options = {
  scales: {
    y: {
      beginAtZero: true,
    },
  },
};
const labels = ["January", "February", "March", "April", "May", "June", "July"];

const data = {
  labels,
  datasets: [
    {
      label: "Red dataset",
      data: [{ r: 10 }],
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
    {
      label: "Blue dataset",
      data: [{ r: 20 }],

      backgroundColor: "rgba(53, 162, 235, 0.5)",
    },
  ],
};

const Test2 = () => {
  return <Bubble options={options} data={data} />;
};

export default Test2;
