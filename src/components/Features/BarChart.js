import { Chart as ChartJS } from "chart.js/auto";
import { Bar } from "react-chartjs-2";
import React, { useEffect } from "react";
import data from "./ListData.json";
import { Link } from "react-router-dom";

export default function BarChart() {
  let num1 = [];
  let num2 = [];
  let cod;
  useEffect(() => {
    const pays = localStorage.getItem("Country");
    console.log(pays);
    data.map((item) => {
      if (item.name === pays) {
        cod = item.code;
        console.log(cod);
        return cod;
      } else {
        return "error";
      }
    });
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
  );
}
