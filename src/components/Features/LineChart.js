import React from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
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

function LineChart({ chartData }) {
  return <Line data={chartData} />;
}

export default LineChart;
