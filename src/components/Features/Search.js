import React, { useState } from "react";
// import TextField from "@mui/material/TextField";
import List from "./List";
import "./Search.css";
import BarChart from "./BarChart";
import { Link } from "react-router-dom";
// import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

export function handleSubmit() {
  const country = document.getElementById("country").value;
  localStorage.setItem("Country", country);
  return;
}
function Search() {
  const [inputText, setInputText] = useState("");
  let inputHandler = (e) => {
    //convert input text to lower case
    var lowerCase = e.target.value.toLowerCase();
    setInputText(lowerCase);
  };

  return (
    // <Router>
    <div className="main">
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
