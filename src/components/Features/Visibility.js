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
    fetch("/ip").then(
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

export default Visibility;