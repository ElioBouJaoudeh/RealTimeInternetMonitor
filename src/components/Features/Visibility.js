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

function Visibility() {


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

  const [progress, setProgress] = useState(0);
  const [color, setColor] = useState('');
  const colorArray = ['#fa0000', "#fa6900", "#7bff00", "#d9edfe"];

  const colorIPv4 = () => {
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

  function getipv4(){
    if(typeof data.ip === 'undefined') {return 0;}
    else{
      return data["ipv4"];
    }
  }

  const randomProgressValue = () => {
    const progressValue = Math.floor(getipv4());
    setProgress(progressValue);
    const randomProgressColor = colorIPv4();
    setColor(randomProgressColor);
  }

  const onChange = e => {
    if (e.target.value) {
      progress = e.target.value;
      setProgress(progress);
      const randomProgressColor = colorIPv4();
      setColor(randomProgressColor);
    } else {
      setProgress(0);
    }
  }

  const [progress1, setProgress1] = useState(0);
  const [color1, setColor1] = useState('');

  const colorIPv6 = () => {
    if (data["ipv6"]<50){
      return colorArray[0];
    }
    else if(data["ipv6"]>=50 && data["ipv6"]<100){
      return colorArray[1];
    }else if(data["ipv6"]==100){
      return colorArray[2];
    }else{
      return colorArray[3];
    }
  }

  function getipv6(){
    if(typeof data.ip === 'undefined') {return 0;}
    else{
      console.log(data["ipv6"]);
      return data["ipv6"];
    }
  }

  const randomProgressValue1 = () => {
    const progressValue1 = Math.floor(getipv6());
    setProgress(progressValue1);
    const randomProgressColor1 = colorIPv6();
    setColor(randomProgressColor1);
  }

  const onChange1 = e => {
    if (e.target.value) {
      progress1 = e.target.value;
      setProgress(progress1);
      const randomProgressColor1 = colorIPv6();
      setColor(randomProgressColor1);
    } else {
      setProgress(0);
    }
  }

  return (
    <VisContainer>
    <div className="visibility-container">
      <video src='/videos/blue.mp4' autoPlay loop muted />
      <h1>General information about your connection:</h1>
      {(typeof data.ip === 'undefined') ? (
      <p>Loading...</p>
    ):(
        Object.keys(data).map((key, index) => (
          <p key={index}> {key} : {data[key]}</p> 
        ))
    )}
    <div className="button-container">
    <br/>
    <Button primary onClick={randomProgressValue}>
        IPv4 Visibility
        </Button>
    <br/>
    <Button primary onClick={randomProgressValue1}>
        IPv6 Visibility
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

export default Visibility;