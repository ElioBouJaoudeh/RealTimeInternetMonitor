import React,{useState,useEffect} from "react";
import './ASN.css';

function ASN() {

  return (
    <div className="ASN-container">
      <video src='/videos/blue.mp4' autoPlay loop muted />
      <h1>General Information about your Autonomous System:</h1>
      {/* {(typeof data.dictionary === 'undefined') ? (
      <p>Loading...</p>
    ):(
        Object.keys(data).map((key, index) => ( 
          <p key={index}> Your {key} is {data[key]}</p> 
        ))
    )}  */}
    </div>
  );
}

export default ASN;