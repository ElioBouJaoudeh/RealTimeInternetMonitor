import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Container } from "../../globalStyles";
import './ASN.css';

export const ASNContainer = styled(Container)`
  display: flex;
  justify-content: space-between;
  height: 100%;
  font-size:15px;

  ${Container}
`;

export const Headline = styled.h1`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  font-size:17px;
  margin: 24px;

  @media screen and (max-width: 960px) {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
  }

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

export const FHeading = styled.p`
  color: #fff;
  font-size: 16px;
  padding: 15px;
  margin-left: 24px;
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
      <div className="asn-container">
        <Headline><h1>General information about your connection:</h1></Headline>
        <video src="/videos/blue.mp4" autoPlay loop muted />
        <FContainer>
        <FCard>
        <FHeading>
        <p>Your Autonomous System's available prefixes:</p>
        {Object.keys(dataa).length === 0 ? (
          <p>Loading...</p>
        ) : (
          Object.keys(val).map((key, index) => (
            <p key={index}> {val[index]}</p>
          ))
        )}
        </FHeading>
        </FCard>
        <FCard>
        <FHeading>
        {Object.keys(dataa).length === 0 ? (
          <p>Loading...</p>
        ) : (
          Object.keys(otherval).map((key, index) => (
            <p key={index}> {keystaken[key]}: {otherval[key]}</p>
          ))
        )}
        </FHeading>
        </FCard>
        </FContainer>
      </div>
    </ASNContainer>
  );
}

export default ASN;
