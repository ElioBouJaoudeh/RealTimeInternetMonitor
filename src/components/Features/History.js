import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Container } from "../../globalStyles";
import LineChart from "./LineChart";


export const HistContainer = styled(Container)`
  display: flex;
  justify-content: space-between;
  height: 100%;
  font-size: 15px;

  ${Container}
`;

function History() {

  const [userData, setUserData] = useState({
    labels: UserData.map((data) => data.year),
    datasets: [
      {
        label: "Announcements",
        data: data.map((item, i) => item),
        backgroundColor: [
          "#6a91af",
          "#6a91af",
          "#6a91af",
          "#6a91af",
          "#6a91af",
        ],
        borderColor: "black",
        borderWidth: 2,
      },
    ],
  });
  return (
    <HistContainer>
      {/* <div className="visibility-container">Hello</div> */}
      <div
        style={{
          width: 700,
        }}
      >
        {/* <LineChart chartData={user} /> */}
      </div>
    </HistContainer>
  );
}
export default History;
