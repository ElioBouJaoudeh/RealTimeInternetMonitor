import React, { useState, useEffect } from "react";
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

import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);


const ASNG = () => {

  const [chart,setData]=useState([{}])
  useEffect(()=>{
    fetch("https://intermeterflaskserver.herokuapp.com/history").then(
      res=>res.json()
    ).then(
      chart => {
        setData(chart)
        console.log(chart)
      }
    )
  },[])


  var datasingle = {
    labels: Object.keys(chart).map((key, index) =>key),
    //labels: chart?.coins?.map((x) => x.name),
    datasets: [
      {
        label: "number of announcements",
        data:Object.keys(chart).map((key, value) =>chart[key]),
        // label: `${chart?.coins?.length} Coins Available`,
        // data: chart?.coins?.map((x) => x.price),
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  var options = {
    maintainAspectRatio: false,
    scales: {
      y:
        {
          min: 0,
          max: 400,
          stepSize: 50,
        },
      x:
        {
          
        },
    },
    legend: {
      labels: {
        fontSize: 25,
      },
    },
  };
  var options1 = {
    maintainAspectRatio: false,
    scales: {},
    legend: {
      labels: {
        fontSize: 25,
      },
    },
  };

  return (
    <div>
      <Line data={datasingle} height={400} options={options1} />
    </div>
  );
};


export default ASNG;

