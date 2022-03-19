import React, { Component } from "react";
import Data from "../../jsonObject/sampleip.json";

function Visibility() {
  return (
    <div className="visibility-container">
      <h1>Track your visibilty</h1>
      <br />
      <p>Here you'll find some info about your IP address</p>
      <br />
      {Data.map((post) => {
        return (
          <>
            <p>Your prefix: {post.prefix}</p>
            <p>Country: {post.country}</p>
            <p>Internet service provider: {post.isp}</p>
            <p>Autonomous system (AS): {post.asnname}</p>
            <p>Autonomous system code: {post.asncode}</p>
          </>
        );
      })}
    </div>
  );
}

export default Visibility;
