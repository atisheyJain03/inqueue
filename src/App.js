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
import Login from "./components/login/Login";
import SignUp from "./components/signUp/Signup";
import Dropdown from "react-dropdown";
import 'react-dropdown/style.css';

function App() {
  const options = [
   {value: {
     name: 'Atishey',
     lastName :"jain"
   },
   label : 'hello'
  }
  ];
  return (
    <div className="App">
     {/* <Dropdown options={options} placeholder="Select an option" onChange= {(value) => console.log(value)} /> */}
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
        <Route path="/login" >
          <Login />  
        </Route>
        <Route path="/signUp" >
          <SignUp />  
        </Route>
      </Router>
    </div>
  );
}

export default App;
