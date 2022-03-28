import React,{useState,useEffect} from "react";
import './Visibility.css';
import ProgressBar from './ProgressBar';
import { IconContext } from "react-icons/lib";
import styled from 'styled-components';
import { Button } from "../../globalStyles";
import { Container } from '../../globalStyles';

export const VisContainer = styled(Container)`
  display: flex;
  justify-content: space-between;
  height: 700px;

  ${Container}
`;

export const ButtonVis = styled.button`
  border-radius: 4px;
  background: ${({ primary }) => (primary ? '#07080a' : '##9aa5b3')};
  white-space: nowrap;
  padding: ${({ big }) => (big ? '12px 64px' : '10px 20px')};
  color: #fff;
  font-size: ${({ fontBig }) => (fontBig ? '20px' : '16px')};
  outline: none;
  border: none;
  cursor: pointer;

  &:hover {
    transition: all 0.3s ease-out;
    background: #fff;
    background-color: ${({ primary }) => (primary ? '#9aa5b3' : '#9aa5b3')};
  }

`;

function ASN() {
  const [dataa,setData]=useState([{}])
  useEffect(()=>{
    fetch("/as").then(
      res=>res.json()
    ).then(
      dataa => {
        setData(dataa)
        console.log(dataa["42020"]["List of prefixes"])
      }
    )
  },[])

  const [progress, setProgress] = useState(0);
  const [color, setColor] = useState('');
  const colorArray = ['#fa0000', "#fa6900", "#7bff00", "#d9edfe"];

  const randomColor = () => {
    if (dataa["42020"]["ipv4"]<50){
      return colorArray[0];
    }
    else if(dataa["42020"]["ipv4"]>=50 && dataa["42020"]["ipv4"]<100){
      return colorArray[1];
    }else if(dataa["42020"]["ipv4"]==100){
      return colorArray[2];
    }else{
      return colorArray[3];
    }
  }

  function getValue(){
    if(typeof dataa.dictionary === 'undefined') {return 0;}
    else{
      return dataa["42020"]["ipv4"];
    }
  }

  const randomProgressValue = () => {
    const progressValue = Math.floor(getValue());
    setProgress(progressValue);
    const randomProgressColor = randomColor();
    setColor(randomProgressColor);
  }

  const onChange = e => {
    if (e.target.value) {
      progress = e.target.value;
      setProgress(progress);
      const randomProgressColor = randomColor();
      setColor(randomProgressColor);
    } else {
      setProgress(0);
    }
  }

  return (
    <VisContainer>
    <div className="visibility-container">
      <video src='/videos/blue.mp4' autoPlay loop muted />
      <h1>General information about your connection:</h1>
      {(typeof dataa.dictionary === 'undefined') ? (
      <p>Loading...</p>
    ):(
        Object.keys(dataa["42020"]["List of prefixes"]).map((key, index) => (
          <p key={index}> {key} : {dataa["42020"]["List of prefixes"][key]}</p> 
        ))
    )}
    <div className="button-container">
    <Button primary onClick={randomProgressValue}>
          Check Visibility
        </Button>
    </div>
    <ProgressBar 
          progress={progress}
          size={250}
          strokeWidth={15}
          circleOneStroke='#d9edfe'
          circleTwoStroke={color}
        />
    </div>
    </VisContainer>
  );
}

export default ASN;