"use client";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  Tooltip,
  PointElement,
  LineElement,
  ChartData,
  ChartOptions,
} from "chart.js";
import { Line } from "react-chartjs-2";

// Register ChartJS components using ChartJS.register
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip);

const options: ChartOptions<"line"> = {
  responsive: true,
  plugins: {
    legend: {
      labels: {
        color: "blue", // Color of the legend labels
      },
    },
    tooltip: {
      backgroundColor: 'rgba(0, 0, 0, 0.7)', // Background color of tooltips
      titleColor: 'white', // Color of the tooltip title
      bodyColor: 'white', // Color of the tooltip body
    },
  },
  scales: {
    y: {
      ticks: {
        color: "yellow", // Color of y-axis labels
        font: {
          size: 16,
        },
      },
      grid: {
        color: 'rgba(255, 255, 255, 0.1)', // Color of y-axis grid lines
      },
    },
    x: {
      ticks: {
        color: "white", // Color of x-axis labels
        font: {
          size: 16,
        },
      },
      grid: {
        color: 'rgba(255, 255, 255, 0.1)', // Color of x-axis grid lines
      },
    },
  },
};

const data: ChartData<"line"> = {
  labels: [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ],
  datasets: [
    {
      label: "Dataset 1",
      data: [100, 120, 115, 134, 168, 132, 200, 142],
      backgroundColor: "rgba(255, 0, 0, 0.2)",
      borderColor: "white",
      pointBackgroundColor: "white",
      pointBorderColor: "red",
      pointRadius: 6,
    },
  ],
};

const MyLineChart = () => {
  return (
      <div className="bg-gray-700 rounded-md p-5 shadow-lg h-[500px] min-w-full w-full max-w-full">
          <Line data={data} options={options} className="w-full h-full" />
      </div>
  );
};
export default MyLineChart;
