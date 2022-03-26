import React from "react";
import GlobalStyle from "./globalStyles";
import Home from "./pages/HomePage/Home";
import Visibility from "./components/Features/Visibility";
import ASN from "./components/Features/ASN";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import { Navbar, Footer } from "./components";

function App() {
  return (
    <Router>
      <GlobalStyle />
      <ScrollToTop />
      <Navbar />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/visibility" exact component={Visibility} />
        <Route path="/asn" exact component={ASN} />
        {/* <Route path="/as" exact component={ASN} /> */}
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
