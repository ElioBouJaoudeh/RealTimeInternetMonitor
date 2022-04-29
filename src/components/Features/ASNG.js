import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Button } from "../../globalStyles";
import { Container } from "../../globalStyles";
import { Line } from "react-chartjs-2";
import "./ASN.css";

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
    <ASNContainer>
      <div className="chart-container">
        <video src="/videos/blue.mp4" autoPlay loop muted />
        <h1>Number of announcements related to the your prefix over the past year:</h1>
        <FContainer position="relative">
          <FCard>
            <FHeading>
          <Link to='/asn'>
          <Button primary >
              BACK
          </Button>
         </Link>
         <div>
         <Line data={datasingle} height={400} options={options1} />
         </div>
         </FHeading>
            </FCard>
        </FContainer>
        
      </div>
    </ASNContainer>
  );
};


export default ASNG;

