// components/MyLineChart.tsx
"use client";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    Tooltip,
    PointElement,
    LineElement,
    ChartData,
    ChartOptions
} from "chart.js";
import { Line } from "react-chartjs-2";

// Register ChartJS components using ChartJS.register
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip
);

const options: ChartOptions = {
    scales: {
        yAxes: [
            {
                ticks: {
                    beginAtZero: true,
                    fontColor: "blue", // Change the color of y-axis labels here
                },
            },
        ],
        xAxes: [
            {
                ticks: {
                    beginAtZero: true,
                    fontColor: "green", // Change the color of x-axis labels here
                },
            },
        ],
    },
    legend: {
        labels: {
            fontColor: "red", // Change the color of dataset labels here
        },
    },
};

const MyLineChart = () => {
    return (
        <div className="bg-gray-700 rounded-md p-5">
            <Line
                data={{
                    labels: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
                    datasets: [
                        {
                            data: [100, 120, 115, 134, 168, 132, 200],
                            backgroundColor: "red",
                            borderColor: 'white',
                            pointRadius: 6
                        },
                    ],
                }}
                options={{
                    plugins: {
                        legend: {
                            labels: {
                                color: "blue"
                            }
                        },
                    },
                    scales: {
                        y: {
                            ticks: {
                                color: "yellow",
                                font: {
                                    size: 16
                                }
                            }
                        },
                        x: {
                            ticks: {
                                color: "white",
                                font: {
                                    size: 16
                                }
                            }
                        }
                    }
                }}
            />
        </div>
    );
};
export default MyLineChart;