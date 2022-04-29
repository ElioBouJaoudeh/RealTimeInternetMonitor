import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Line } from "react-chartjs-2";
import "./Chart.css";

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

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const Container = styled.div`
  z-index: 1;
  width: 100%;
  max-width: 1300px;
  margin-right: auto;
  margin-left: auto;
  padding-right: 50px;
  padding-left: 50px;

  @media screen and (max-width: 991px) {
    padding-right: 30px;
    padding-left: 30px;
  }
`;

export const Button = styled.button`
  border-radius: 4px;
  background: ${({ primary }) => (primary ? '#07080a' : '##9aa5b3')};
  white-space: nowrap;
  padding: ${({ big }) => (big ? '12px 64px' : '10px 20px')};
  color: #fff;
  font-size: ${({ fontBig }) => (fontBig ? '20px' : '16px')};
  outline: none;
  border: none;
  cursor: pointer;
  text-align: center;

  &:hover {
    transition: all 0.3s ease-out;
    background: #fff;
    background-color: ${({ primary }) => (primary ? '#9aa5b3' : '#9aa5b3')};
  }

  @media screen and (max-width: 960px) {
    width: 100%;
  }
`;

export const ASNContainer = styled(Container)`
  display: flex;
  justify-content: space-between;
  height: 1000px;
  font-size: 15px;
  ${Container}
`;

export const FContainer = styled.div`
  display: flex;
  justify-content: left;
  margin-bottom: 5%;
  align-items: center;
  @media screen and (max-width: 960px) {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
  }
`;

export const FCard = styled(Link)`
  background: white;
  box-shadow: 0 6px 20px rgba(56, 125, 255, 0.2);
  width: 90%;
  height: 100%;
  margin-left: 5%;
  text-decoration: none;
  border-radius: 4px;
  &:nth-child(2) {
    margin: 24px;
  }
  @media screen and (max-width: 960px) {
    width: 90%;
    &:hover {
      transform: none;
    }
  }
`;

export const FHeading = styled.p`
  color: #fff;
  font-size: 16px;
  padding: 15px;
  margin-left: 24px;
`;

const LineChart = () => {
  const [groupe,setD]=useState([{}])
  useEffect(()=>{
    fetch("https://intermeterflaskserver.herokuapp.com/all").then(
      res=>res.json()
    ).then(
      groupe => {
        setD(groupe)
        console.log(groupe)
      }
    )
  },[])

  
  var data = {
    labels: Object.keys(groupe).map((key, index) =>key),
    //labels: chart?.coins?.map((x) => x.name),
    datasets: [
      {
        label: "Prefixes variation",
        data:Object.keys(groupe).map((key, value) =>groupe[key]),
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
          stepSize: 10,
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
    <ASNContainer>
      <div className="chart-container">
        <video src="/videos/blue.mp4" autoPlay loop muted />
        <h1>BGP visibility of your Autonomous System related to all the prefixes:</h1>
        <FContainer position="relative">
          <FCard>
            <FHeading>
         <div>
         <Line data={data} height={400} options={options1} />
         </div>
         </FHeading>
            </FCard>
        </FContainer>
        
      </div>
    </ASNContainer>
  );
};
export default LineChart;

