import React,{useState,useEffect} from "react";
import { dataa } from "./Features";
import './Visibility.css';

function Visibility() {
  return (
    <div className="visibility-container">
      <video src='/videos/blue.mp4' autoPlay loop muted />
      <h1>Track your visibilty</h1>
      <br />
      <p>Here you'll find some info about your IP address</p>
      <br />
      <>
      <dataa.Consumer>
          {(fname) => {
            return console.log(fname);
          }}
        </dataa.Consumer>
      </>
    <div>
    {/* {(typeof data.ip === 'undefined') ? (
      <p>Loading...</p>
    ):(
      dataa.ip.map((member,i) => (
        <p key={i}>{member}</p>
      ))
    )} */}
      
    </div>     
    </div>
  );
}

export default Visibility;
