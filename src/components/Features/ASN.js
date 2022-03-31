import React, { useState, useEffect } from "react";
import "./Visibility.css";
import styled, { keyframes } from "styled-components";
import { Container } from "../../globalStyles";

export const ASNContainer = styled(Container)`
  display: flex;
  justify-content: space-between;
  height:700px;
  font-size:20px;

  ${Container}
`;

function ASN() {
  const [otherval, setOtherArray] = useState([]);
  const [dataa, setData] = useState([{}]);
  const [val, setArray] = useState([]);
  const [keystaken, setKeys] = useState([]);
  useEffect(() => {
    fetch("/as")
      .then((res) => res.json())
      .then((dataa) => {
        for (const key of Object.keys(dataa["42020"]["List of prefixes"])){
          val.push(dataa["42020"]["List of prefixes"][key]);
        }
        delete dataa["42020"]["List of prefixes"];
        for (const key of Object.keys(dataa["42020"])){
          otherval.push(dataa["42020"][key]);
        }
        for (const key of Object.keys(dataa["42020"])){
          keystaken.push(key);
        }
        setData(dataa);
        setArray(val);
        setOtherArray(otherval);
        setKeys(keystaken);
        console.log(keystaken);
      });
  }, []);

  return (
    <ASNContainer>
      <div className="visibility-container">
        <video src="/videos/blue.mp4" autoPlay loop muted />
        <h1>General information about your connection:</h1>
        <p>Your Autonomous System's available prefixes:</p>
        {Object.keys(dataa).length === 0 ? (
          <p>Loading...</p>
        ) : (
          Object.keys(val).map((key, index) => (
            <p key={index}> {val[index]}</p>
          ))
        )}
        {Object.keys(dataa).length === 0 ? (
          <p>Loading...</p>
        ) : (
          Object.keys(otherval).map((key, index) => (
            <p key={index}> {keystaken[key]}: {otherval[key]}</p>
          ))
        )}
      </div>
    </ASNContainer>
  );
}

export default ASN;
