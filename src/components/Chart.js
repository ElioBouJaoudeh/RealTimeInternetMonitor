// /* App.js */
// var React = require("react");
// var Component = React.Component;
// var CanvasJSReact = require("./canvasjs.react");
// var CanvasJS = CanvasJSReact.CanvasJS;
// var CanvasJSChart = CanvasJSReact.CanvasJSChart;

// var dataPoints = [];
// class Chart extends Component {
//   render() {
//     const options = {
//       theme: "light2",
//       title: {
//         text: "Stock Price of NIFTY 50",
//       },
//       axisY: {
//         title: "Price in USD",
//         prefix: "$",
//       },
//       data: [
//         {
//           type: "line",
//           xValueFormatString: "MMM YYYY",
//           yValueFormatString: "$#,##0.00",
//           dataPoints: dataPoints,
//         },
//       ],
//     };
//     return (
//       <div>
//         <CanvasJSChart options={options} onRef={(ref) => (this.chart = ref)} />
//         {/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
//       </div>
//     );
//   }

//   componentDidMount() {
//     var chart = this.chart;
//     fetch(
//       "https://stat.ripe.net/data/bgp-update-activity/data.json?endtime=2022-04-12T09%3A00%3A00&hide_empty_samples=false&max_samples=350&resource=185.185.179.0%2F24&starttime=2022-03-29T09%3A00%3A00"
//     )
//       .then(function (response) {
//         return response.json();
//       })
//       .then(function (data) {
//         for (var i = 0; i < data.length; i++) {
//           dataPoints.push({
//             x: new Date(data[i].x),
//             y: data[i].y,
//           });
//         }
//         chart.render();
//       });
//   }
// }

// module.exports = Chart;

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

const LineChart = () => {
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

  var data = {
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
    scales: {},
    legend: {
      labels: {
        fontSize: 25,
      },
    },
  });
}

export default Chartt;

// import React, { useState, useEffect } from "react";
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend,
// } from "chart.js";

// import { Line } from "react-chartjs-2";

// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend
// );

// const LineChart = () => {
//   const [chart, setChart] = useState({});
//   var baseUrl = "https://stat.ripe.net/data/bgp-update-activity/data.json";
//   var proxyUrl = "https://cors-anywhere.herokuapp.com/";
//   //var apiKey = "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx";

//   useEffect(() => {
//     const fetchData = async () => {
//       await fetch(`${baseUrl}`, {
//         method: "GET",
//         headers: {
//           "Content-Type": "application/json",
//           //"x-access-token": `${apiKey}`,
//           "Access-Control-Allow-Origin": "*",
//         },
//       })
//         .then((response) => {
//           if (response.ok) {
//             response.json().then((json) => {
//               console.log(json.data);
//               setChart(json.data);
//             });
//           }
//         })
//         .catch((error) => {
//           console.log(error);
//         });
//     };
//     fetchData();
//   }, [baseUrl, proxyUrl]);

//   console.log("chart", chart);
//   var data = {
//     labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
//     //labels: chart?.coins?.map((x) => x.name),
//     datasets: [
//       {
//         label: "# of votes",
//         data: [12, 19, 3, 5, 2, 3],
//         // label: `${chart?.coins?.length} Coins Available`,
//         // data: chart?.coins?.map((x) => x.price),
//         backgroundColor: [
//           "rgba(255, 99, 132, 0.2)",
//           "rgba(54, 162, 235, 0.2)",
//           "rgba(255, 206, 86, 0.2)",
//           "rgba(75, 192, 192, 0.2)",
//           "rgba(153, 102, 255, 0.2)",
//           "rgba(255, 159, 64, 0.2)",
//         ],
//         borderColor: [
//           "rgba(255, 99, 132, 1)",
//           "rgba(54, 162, 235, 1)",
//           "rgba(255, 206, 86, 1)",
//           "rgba(75, 192, 192, 1)",
//           "rgba(153, 102, 255, 1)",
//           "rgba(255, 159, 64, 1)",
//         ],
//         borderWidth: 1,
//       },
//     ],
//   };

//   var options = {
//     maintainAspectRatio: false,
//     scales: {},
//     legend: {
//       labels: {
//         fontSize: 25,
//       },
//     },
//   };

//   return (
//     <div>
//       <Line data={data} height={400} options={options} />
//     </div>
//   );
// };

// export default LineChart;
