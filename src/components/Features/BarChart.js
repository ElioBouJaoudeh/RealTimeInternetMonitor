import { Chart as ChartJS } from "chart.js/auto";
import { Bar } from "react-chartjs-2";
import React, { useState, useEffect } from "react";
import data from "./ListData.json";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Container } from "../../globalStyles";

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

export default function BarChart() {
  let num1 = [];
  let num2 = [];
  let cod;
  const [names, setD] = useState([{}]);
  useEffect(() => {
    const pays = localStorage.getItem("Country");
    console.log(pays);
    fetch("https://intermeterflaskserver.herokuapp.com/pay")
      .then((res) => res.json())
      .then((names) => {
        setD(names);
        console.log(names);
      });
    Object.keys(names).map((key, value) => {
      if (key === pays) {
        cod = names[key];
        console.log(cod);
        return cod;
      }
    });
    // data.map((item) => {
    //   if (item.name === pays) {
    //     cod = item.code;
    //     console.log(cod);
    //     return cod;
    //   } else {
    //     return "error";
    //   }
    // });
    const url =
      "https://stat.ripe.net/data/country-asns/data.json?resource=" + cod;
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const asn = await response.json();
        const registered = asn["data"]["countries"][0]["stats"]["registered"];
        const routed = asn["data"]["countries"][0]["stats"]["routed"];
        num1.push(registered);
        num2.push(routed);
      } catch (error) {
        console.log("error", error);
      }
    };

    fetchData();
  }, []);
  const state = {
    labels: [0],
    datasets: [
      {
        label: "registered ASNs",
        backgroundColor: "rgba(224,224,224)",
        borderColor: "rgba(224,224,224)",
        borderWidth: 1,
        data: num1,
        order: 1,
        categoryPercentage: 0.2,
      },
      {
        label: "seen ASNs",
        backgroundColor: "rgba(102,255,102)",
        borderColor: "rgba(102,255,102)",
        borderWidth: 1,
        data: num2,
        order: 0,
        categoryPercentage: 0.1,
      },
    ],
  };
  return (
    <ASNContainer>
      <div className="asn-container">
        <video src="/videos/blue.mp4" autoPlay loop muted />
        <FContainer position="relative">
          <FCard>
            <FHeading>
              <div style={{ width: "80%" }}>
                <Bar
                  data={state}
                  options={{
                    scales: {
                      x: {
                        stacked: true,
                      },
                      y: {
                        beginAtZero: true,
                      },
                    },
                    responsive: true,
                    title: {
                      display: true,
                      text: "ALOOOOO",
                      fontSize: 100,
                    },
                    legend: {
                      style: {
                        usePointStyle: true,
                      },
                      display: true,
                      labels: {
                        usePointStyle: true,
                      },
                    },
                  }}
                />
                {/* <Link to="/">
        <button>Back</button>
      </Link> */}
              </div>
            </FHeading>
          </FCard>
        </FContainer>
      </div>
    </ASNContainer>
  );
}
