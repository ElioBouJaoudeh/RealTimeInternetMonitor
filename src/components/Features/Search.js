import React, { useState, useEffect } from "react";
// import TextField from "@mui/material/TextField";
import List from "./List";
import "./Search.css";
import { Link } from "react-router-dom";
// import { BrowserRouter as Router, Switch, Route } from "react-router-dom";



export function handleSubmit() {
  const country = document.getElementById("country").value;
  localStorage.setItem("Country",country);
  return;
}

function Search() {
  const [inputText, setInputText] = useState("");
  const country = localStorage.getItem("Country");
  const [names,setD]=useState([{}]);
    useEffect(()=>{
      fetch("https://intermeterflaskserver.herokuapp.com/pay").then(
        res=>res.json()
      ).then(
        names => {
          setD(names)
          console.log(names)
        }
      )
    },[])
    let cod;
    Object.keys(names).map((key, value) => {
      if (key === country) {
        cod = names[key];
        console.log(cod);
        return cod;
      }
    });
  localStorage.setItem("Cod", cod);
  let inputHandler = (e) => {
    //convert input text to lower case
    var lowerCase = e.target.value.toLowerCase();
    setInputText(lowerCase);
  };
    
  return (
    // <Router>
    <div className="main">
      <video src="/videos/blue.mp4" autoPlay loop muted />
      <div style={{ marginBlock: "15%" }}>
        <h1>Enter the country name </h1>
        <div
          className="search"
          style={{
            display: "flex",
            flexDirection: "row",
            marginLeft: "25%",
            marginTop: "10%",
          }}
        >
          <input
            type="text"
            id="country"
            onChange={inputHandler}
            variant="outlined"
            //   fullWidth
            label="Search"
          />
          <Link to="/barchart">
            <button
              style={{ width: "100%", marginLeft: "20px", borderRadius: "8px" }}
              onClick={handleSubmit}
            >
              Search
            </button>
          </Link>
        </div>
        {/* <List input={inputText} /> */}
      </div>
    </div>
  );
}

export default Search;
