import React, { useEffect, useState } from 'react';
import "./altitudeGraph.css";

import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend
);

export const LineChart = ({
  data,
  isActive,
  simulatedData,
  startTime,
}) => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Altitude (ft)',
        data: [],
        fill: false,
        borderColor: 'red',
        tension: 0.4,
        pointRadius: 0,
      },
    ],
  });


  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    if (!isActive) return;
    const interval = setInterval(() => {
      setSeconds((prev) => prev + 1);

      // Simulate altitude value (replace this with actual sensor data later)
      const newAltitude = data.accx ?? simulatedData?.altitude ?? 0;
      //const newAltitude = data.accx ?? 0;

      setChartData((prevData) => {
        const newLabels = [...prevData.labels, `T+${seconds}s`];
        const newData = [...prevData.datasets[0].data, newAltitude];

        return {
          ...prevData,
          labels: newLabels,
          datasets: [
            {
              ...prevData.datasets[0],
              data: newData,
            },
          ],
        };
      });
    }, 1000); // Update every 1 second

    return () => clearInterval(interval);
  }, [seconds, isActive]);

  const options = {
    plugins: {
      legend: { display: false },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: { display: true, text: 'Altitude (ft)' },
      },
      x: {
        display: false,
        title: { display: true, text: 'Time' },
      },
    },
  };

  return (
    <div className="inner-graph-box">
      <div className="alt-title">
      <h2>Altitude</h2>
      </div>
      <div className="alt-graph">
      <Line data={chartData} options={options} />
      </div>
    </div>
  );
};