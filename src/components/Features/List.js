import React , {useState } from "react";
import data from "./ListData.json";

function List(props) {
  //create a new array by filtering the original array
  const filteredData = data.filter((el) => {
    //if no input the return the original
    // console.log(props)
    if (props.input === "") {
      return el;
    }
    //return the item which contains the user input
    else {
      return el.name.toLowerCase().includes(props.input);
    }
  });
  console.log(filteredData)
  return (

    <ul>
      {filteredData.map((item) => (
        <li key={item.code}>{item.name}</li>
      ))}
      <li>test</li>
    </ul>
  );
}

export default List;
