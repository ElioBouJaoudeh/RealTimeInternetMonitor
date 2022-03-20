import React,{useState,useEffect} from "react";
import './Visibility.css';
import ProgressBar from './ProgressBar';

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
  const colorArray = ['#7ea9e1', "#ed004f", "#00fcf0", "#d2fc00", "#7bff00", "#fa6900"];

  const randomColor = () => {
    return colorArray[Math.floor(Math.random() * colorArray.length)];
  }

  const randomProgressValue = () => {
    const progressValue = Math.floor(Math.random() * 101);
    setProgress(progressValue);
    const randomProgressColor = randomColor();
    setColor(randomProgressColor);
  }

  const onChange = e => {
    if (e.target.value) {
      if (e.target.value > 100) {
        progress = 100;
      }
      if (e.target.value < 0) {
          progress = 0;
      }
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
          <p key={index}> Your {key} is {data[key]}</p> 
        ))
    )}
    <ProgressBar 
          progress={progress}
          size={300}
          strokeWidth={15}
          circleOneStroke='#d9edfe'
          circleTwoStroke={color}
        />
    </div>
  );
}

export default Visibility;