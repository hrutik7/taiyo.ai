import React, { useState, useEffect, useRef } from "react";
import { Line } from "react-chartjs-2";
import axios from "axios";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useQuery } from "@tanstack/react-query";
import { Chart } from "chart.js";

// Register necessary components for Chart.js
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

// Function to fetch COVID data
const fetchHistoricalData = async () => {
  const response = await axios.get(
    "https://disease.sh/v3/covid-19/historical/all?lastdays=30"
  );
  return response.data;
};

const CovidLineGraph = () => {
  const chartRef = useRef<any>(null); // Reference for the chart instance
  const [chartOptions, setChartOptions] = useState({});

  // Use TanStack Query to fetch the historical data
  const { data, isLoading, error } = useQuery({
    queryKey: ["covidHistoricalData"],
    queryFn: fetchHistoricalData,
  });

  useEffect(() => {
    (chartRef.current as ChartJS | null)?.destroy?.(); // Destroy existing chart instance before creating a new one
  }, [data]);
  // Set chart options for responsiveness
  useEffect(() => {
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

    // Cleanup function to destroy chart instance if the component unmounts or re-renders
    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, [data]);
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading data...</div>;

  // Prepare chart data after the data is loaded
  const dates = Object.keys(data.cases);
  const cases = Object.values(data.cases);
  const recovered = Object.values(data.recovered);
  const deaths = Object.values(data.deaths);
  const isBrowser = typeof window !== 'undefined';

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



  return (
    <div style={{ height: "60vh", width: "100%" }}>
    {
        isBrowser && <Line ref={chartRef} data={chartData} options={chartOptions} />
    }
    </div>
  );
};

export default CovidLineGraph;
