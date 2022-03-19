import React, { Component } from "react";
import Data from "../../jsonObject/sample.json";

function As() {
  return (
    <div className="as-container">
      <h1>Enter the Autonomous system numer:</h1>
      <br />
      {Data.map((post) => {
        return (
          <>
            <p>Your prefix: {post[42020].name}</p>
            <p>Ipv4 visibilities: {post[42020].ipv4} %</p>
            <p>Ipv6 visibilities: {post[42020].ipv6} %</p>
            <p>Any disconnection? : {post[42020].disconnection.toString()}</p>
          </>
        );
      })}
    </div>
  );
}

export default As;
