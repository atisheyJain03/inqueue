import React from "react";
import "./App.css";
import Navbar from "./components/navbar/Navbar";
import Input from "./components/navbar/input.js";
import Header from "./components/header/Header";
import Main from "./components/main/Main";
import ShopPage from "./components/ShopPage/ShopPage";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

function App() {
  return (
    <div className="App">
     
      <Router>
      <Header />
        <Route exact path="/" >
          <Navbar />
        </Route>
        <Route exact path="/shops" >
          <Main />
        </Route>
        <Route exact path="/shops/:id" >
        <ShopPage />
        </Route>
      </Router>
    </div>
  );
}

export default App;
