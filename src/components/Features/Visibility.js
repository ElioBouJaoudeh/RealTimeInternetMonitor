import React,{useState,useEffect} from "react";
import './Visibility.css';
import ProgressBar from './ProgressBar';
import styled, { createGlobalStyle } from 'styled-components';

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

function Visibility() {
  const [dataa,setDataa]=useState([{}])
  useEffect(()=>{
    fetch("/as").then(
      res=>res.json()
    ).then(
      data => {
        setDataa(dataa)
        console.log(dataa)
      }
    )
  },[])

  const [data,setData]=useState([{}])
  useEffect(()=>{
    fetch("/ip").then(
      res=>res.json()
    ).then(
      data => {
        setData(data)
        console.log(data)
      }
    )
  },[])

  const [progress, setProgress] = useState(0);
  const [color, setColor] = useState('');
  const colorArray = ['#fa0000', "#fa6900", "#7bff00", "#d9edfe"];

  const randomColor = () => {
    if (data["ipv4"]<50){
      return colorArray[0];
    }
    else if(data["ipv4"]>=50 && data["ipv4"]<100){
      return colorArray[1];
    }else if(data["ipv4"]==100){
      return colorArray[2];
    }else{
      return colorArray[3];
    }
  }

  function getValue(){
    if(typeof data.ip === 'undefined') {return 0;}
    else{
      return data["ipv4"];
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
    <div className="visibility-container">
      <video src='/videos/blue.mp4' autoPlay loop muted />
      <h1>You will find some general information about your connection below:</h1>
      {(typeof data.ip === 'undefined') ? (
      <p>Loading...</p>
    ):(
        Object.keys(data).map((key, index) => (
          <p key={index}> {key} : {data[key]}</p> 
        ))
    )}
    <div className="button-container">
    <ButtonVis onClick={randomProgressValue}>
          Check Visibility
        </ButtonVis>
    </div>
    <ProgressBar 
          progress={progress}
          size={250}
          strokeWidth={15}
          circleOneStroke='#d9edfe'
          circleTwoStroke={color}
        />
    </div>
  );
}

export default Visibility;