import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useContext, useState } from "react";
import { Bar } from "react-chartjs-2";
import { SocketContext } from "../context/SocketContext";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const StackedBarChart = () => {
  const { results } = useContext(SocketContext);
  const labels = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "November",
    "December",
  ];
  const data = {
    labels,
    datasets: [
      {
        label: "Equipment Loads",
        data: results?.equipment,
        backgroundColor: "rgb(100,100,100)",
      },
      {
        label: "Fans",
        data: results?.fans,
        backgroundColor: "rgb(150,150,150)",
      },
      {
        label: "Lighting",
        data: results?.lighting,
        backgroundColor: "rgb(200,200,100)",
      },
      {
        label: "Hot Water",
        data: results?.water,
        backgroundColor: "rgb(200,200,30)",
      },
      {
        label: "Heating",
        data: results?.heating,
        backgroundColor: "rgb(200,30,30)",
      },
      {
        label: "Cooling",
        data: results?.cooling,
        backgroundColor: "rgb(30,30,200)",
      },
    ],
  };
  const options = {
    plugins: {
      title: {
        display: true,
        text: "EUI Simulation (kWh/m2)",
      },
    },
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
      },
    },
  };
  const [visible, setVisible] = useState(false);
  return (
    <div className="results">
      <button
        className="results-expander"
        onClick={() => setVisible((prev) => !prev)}
      >
        Results
      </button>
      {visible ? (
        <div className="stacked-bar-chart-container">
          {results ? (
            <Bar data={data} options={options} />
          ) : (
            <p>No results available yet.</p>
          )}
        </div>
      ) : null}
    </div>
  );
};
