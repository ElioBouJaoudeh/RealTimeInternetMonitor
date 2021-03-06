import React, { useEffect, useState } from "react";
import GlobalStyle from "./globalStyles";
import Home from "./pages/HomePage/Home";
import Visibility from "./components/Features/Visibility";
import ASN from "./components/Features/ASN";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import { Navbar, Footer } from "./components";
import ASNG from "./components/Features/ASNG";
import Search from "./components/Features/Search";
import BarChart from "./components/Features/BarChart";
import LineChart from "./components/Chart";
import Modal from "./pages/HomePage/Modal";

function App() {

  return (
    <Router>
      <GlobalStyle />
      <ScrollToTop />
      <Navbar />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/asngraph" exact component={ASNG} />
        <Route path="/visibility" exact component={Visibility} />
        <Route path="/asn" exact component={ASN} />
        <Route path="/hist" exact component={LineChart} />
        <Route path="/search" exact component={Search} />
        <Route path="/barchart" exact component={BarChart} />
        <Route path="/modal" exact component={Modal} />
      </Switch>
      <Footer />
      </Router>
  );
}

export default App;
