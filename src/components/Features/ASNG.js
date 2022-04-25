import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Button } from "../../globalStyles";
import { Container } from "../../globalStyles";
import axios from "axios";

import "./ASN.css";

export const ASNContainer = styled(Container)`
  display: flex;
  justify-content: space-between;
  height: 850px;
  font-size: 15px;

  ${Container}
`;

export const FContainer = styled.div`
  display: flex;
  justify-content: left;
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
  background: #2c4151;
  box-shadow: 0 6px 20px rgba(56, 125, 255, 0.2);
  width: 40%;
  height: 100%;
  text-decoration: none;
  border-radius: 4px;

  &:nth-child(2) {
    margin: 24px;
  }

  &:hover {
    transform: scale(1.06);
    transition: all 0.3s ease-out;
    color: white;
  }

  @media screen and (max-width: 960px) {
    width: 90%;

    &:hover {
      transform: none;
    }
  }
`;

function ASNG() {
  const [data, setData] = useState([{}]);
  useEffect(() => {
    fetch("https://intermeterflaskserver.herokuapp.com/pred")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        let jsonlist = data["data"]["updates"];
        let listlen = jsonlist.length;
        let newlen = listlen / 100;
        console.log(data);
        console.log(newlen);
        const listtoadd = {
          resource: data["data"]["resource"],
          announcements: data["data"]["updates"][0]["announcements"],
          starttime: data["data"]["updates"][0]["starttime"],
        };
        const listtoadd1 = {
          resource: data["data"]["resource"],
          announcements: data["data"]["updates"][1]["announcements"],
          starttime: data["data"]["updates"][1]["starttime"],
        };
        console.log(listtoadd1);
        // axios.post("http://localhost:5000/vis/add", listtoadd1)
        //    .then(res=>console.log(res.data));
        // for (let i = 0; i < newlen; i++) {
        //   axios.post("http://localhost:5000/vis/add", {"resource": data["data"]["resource"], "announcements": data["data"]["updates"][i]["announcements"], "starttime": data["data"]["updates"][i]["starttime"]})
        //    .then(res=>console.log(res.data));
        // }
      });
  }, []);

  return (
    <ASNContainer>
      <div className="visibility-container">
        <video src="/videos/blue.mp4" autoPlay loop muted />
        <FContainer position="relative">
          <Link to="/asn">
            <Button primary>BACK</Button>
          </Link>
        </FContainer>
      </div>
    </ASNContainer>
  );
}

export default ASNG;
