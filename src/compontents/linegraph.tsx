import React, { useState } from "react";
import { Line } from "react-chartjs-2";
import axios from "axios";
import { Chart, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";
import { useQuery } from "@tanstack/react-query";
const ChartJS: typeof Chart = (window as any).Chart;


// Register necessary components for Chart.js
ChartJS?.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

// Function to fetch COVID data
const fetchHistoricalData = async () => {
  const response = await axios.get(
    "https://disease.sh/v3/covid-19/historical/all?lastdays=30"
  );
  return response.data;
};

const CovidLineGraph = () => {
  const [chartOptions, setChartOptions] = useState<any>({} as any);

  // Use TanStack Query to fetch the historical data
  const { data, isLoading, error } = useQuery({
    queryKey: ["covidHistoricalData"],
    queryFn: fetchHistoricalData,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading data...</div>;

  // Prepare chart data after the data is loaded
  const dates = Object.keys(data.cases);
  const cases = Object.values(data.cases);
  const recovered = Object.values(data.recovered);
  const deaths = Object.values(data.deaths);

  const chartData = {
    labels: dates,
    datasets: [
      {
        label: "Cases",
        data: cases,
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        fill: true,
        tension: 0.4,
      },
      {
        label: "Recovered",
        data: recovered,
        borderColor: "rgba(54, 162, 235, 1)",
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        fill: true,
        tension: 0.4,
      },
      {
        label: "Deaths",
        data: deaths,
        borderColor: "rgba(255, 99, 132, 1)",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        fill: true,
        tension: 0.4,
      },
    ],
  };

  // Set chart options for responsiveness
  if (!chartOptions.plugins) {
    setChartOptions({
      responsive: true,
      maintainAspectRatio: false, // Allows the chart to dynamically resize
      plugins: {
        legend: {
          position: "top",
        },
        title: {
          display: true,
          text: "COVID-19 Cases Fluctuations Over the Last 30 Days",
        },
      },
      scales: {
        x: {
          title: {
            display: true,
            text: "Date",
          },
        },
        y: {
          title: {
            display: true,
            text: "Number of Cases",
          },
        },
      },
    });
  }

  return (
    <div style={{ height: "60vh", width: "100%" }}>
      <Line data={chartData} options={chartOptions} />
    </div>
  );
};

export default CovidLineGraph;
