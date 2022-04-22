import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Button } from "../../globalStyles";
import { Container } from "../../globalStyles";
import "./ASN.css";

let asn;
let visipv4;
let visipv6;

export const ASNContainer = styled(Container)`
  display: flex;
  justify-content: space-between;
  height: 100%
  font-size: 15px;

  ${Container}
`;

export const Headline = styled.h1`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  font-size:13px;
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

const Progress = ({done}) => {
	const [style, setStyle] = React.useState({});
	
	setTimeout(() => {
		const newStyle = {
			opacity: 1,
			width: `${done}%`
		}
		
		setStyle(newStyle);
	}, 200);
	
	return (
		<div className="progress">
			<div className="progress-done" style={style}>
				{done}%
			</div>
		</div>
	)
}

function ASN() {
  const [data,setData]=useState([{}])
  useEffect(()=>{
    fetch("https://intermeterflaskserver.herokuapp.com/ip").then(
      res=>res.json()
    ).then(
      data => {
        setData(data)
        console.log(typeof(data))
        console.log(data)
      }
    )
  },[])

  asn = data['asncode'];
  const [otherval, setOtherArray] = useState([]);
  const [dataa, setData1] = useState([{}]);
  const [val, setArray] = useState([]);
  const [keystaken, setKeys] = useState([]);
  const [couplekeystaken, setcoupleKeys] = useState([]);
  useEffect(() => {
    fetch("https://intermeterflaskserver.herokuapp.com/as")
      .then((res) => res.json())
      .then((dataa) => {
        console.log(asn);
        for (const key of Object.keys(dataa[asn]["List of prefixes"])){
          val.push(dataa[asn]["List of prefixes"][key]);
        }
        delete dataa[asn]["List of prefixes"];
        for (const key of Object.keys(dataa[asn])){
          otherval.push(dataa[asn][key]);
        }
        for (const key of Object.keys(dataa[asn])){
          keystaken.push(key);
        }
        for (let i = 0; i < val.length/4; i++) {
          couplekeystaken.push(val[i]);
        }
        visipv4 = otherval[2].toString();
        visipv6 = otherval[3].toString();
        console.log(typeof(visipv4));
        console.log(visipv6);
        setData1(dataa);
        setArray(val);
        setOtherArray(otherval);
        setKeys(keystaken);
        setcoupleKeys(couplekeystaken);
      });
  }, []);

  return (
    <ASNContainer>
      <div className="asn-container">
        <Headline>
          <h1>General information about your connection:</h1>
        </Headline>
        <video src="/videos/blue.mp4" autoPlay loop muted />
        <FContainer position="relative">
          <FCard>
            <FHeading>
              {Object.keys(dataa).length === 0 ? (
                <p>Loading...</p>
              ) : (
                <p>
                  {" "}
                  Your Autonomous System is : &nbsp;&nbsp; {otherval[4]}
                  <br />
                  Any disconnections occured?{" "}
                  {otherval[1] === false ? <p>No </p> : <p> Yes </p>}
                Number of Prefixes: {otherval[0]}
                <br />
                Ipv4 Visibility:
                <Progress done = {visipv4} />
                <br />
                Ipv6 Visibility: 
                <Progress done = {visipv6}/>
                <br/>
                <Link to='/asngraph'>
                <Button primary > ASN GRAPH </Button>
                </Link>
                </p>
              )}
            </FHeading>
          </FCard>
          <FCard>
            <FHeading>
              <p>Some of your Autonomous System's prefixes:</p>
              <br/>
              {Object.keys(dataa).length === 0 ? (
                <p>Loading...</p>
              ) : (
                Object.keys(couplekeystaken).map((key, index) => (
                  <p key={index}>
                    {" "}
                    <li>{couplekeystaken[index]}</li>
                  </p>
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
