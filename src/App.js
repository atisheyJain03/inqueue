import React, { useContext, useEffect, useState } from "react";
import "./App.css";
import ShopPage from "./components/ShopPage/ShopPage";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Login from "./components/login/Login";
import SignUp from "./components/signUp/Signup";
import "react-dropdown/style.css";
import Allshops from "./components/main/AllShops";
import User from "./components/user/User";
import HeaderCustom from "./components/header/HeaderCustom";
import { socket } from "./socket";
import SnackbarCustom from "./components/snackbar/Snackbar";
import DrawerNew from "./components/user/DrawerNew.js";
import axios from "./axios";
import Axios from "axios";
import { UserContext, UserProvider } from "./UserContext";
import SettingsShop from "./components/Shop/Settings/SettingsShop";
import LoginShop from "./components/Shop/login/LoginShop";
import SignUpShop from "./components/Shop/Signup/SignupShop";

function App() {
  const [user, setUser] = useContext(UserContext);
  const [snackbar, setSnackbar] = useState({
    type: "",
    message: "",
    time: null,
  });
  console.log("app.js");
  useEffect(() => {
    console.log("header useEffect");
    // THIS IS CANCEL TOKEN IN CASE IF COMPONENT UNMOUNT BEFORE GETTING RESPONSE FROM SERVER
    const source = Axios.CancelToken.source();

    // IIFE FOR ASYNC REQUEST
    (async () => {
      try {
        const userRes = await axios.get("/users/me", {
          cancelToken: source.token,
        });

        if (userRes.status === 200 && userRes.data.data.user) {
          setUser({ ...userRes.data.data.user });
          const obj = {
            type: "success",
            message: `Welcome ${userRes.data.data.user.name}`,
            time: Date.now(),
          };
          setSnackbar({ ...obj });
        }
      } catch (error) {
        let obj = {
          type: "error",
          time: Date.now(),
        };
        if (
          error.response &&
          error.response.data &&
          error.response.data.message
        ) {
          obj.message = error.response.data.message;
        } else {
          obj.message = "Something went wrong Please Reload";
        }
        setSnackbar({ ...obj });
      }
    })();
    return () => {
      source.cancel();
    };
  }, []);

  return (
    <div className="App">
      <SettingsShop />
      <SnackbarCustom snackbar={snackbar} />
      {/* <LoginShop /> */}
      <Router>
        {/* <LoginShop setSnackbar={setSnackbar} /> */}
        <SignUpShop setSnackbar={setSnackbar} />
        {/* 
        <HeaderCustom searchBar={false} />
        <Route exact path="/">
          {null}
        </Route>
        <Route exact path="/shops">
          <Allshops setSnackbar={setSnackbar} />
        </Route>
        <Route exact path="/shops/:id">
          <ShopPage setSnackbar={setSnackbar} />
        </Route>
        <Route path="/login">
          <Login setSnackbar={setSnackbar} />
        </Route>
        <Route path="/signUp">
          <SignUp setSnackbar={setSnackbar} />
        </Route>
        <Route path="/userInfo">
          <User setSnackbar={setSnackbar} />
        </Route> */}
      </Router>
    </div>
  );
}

export function snackbarFunction(value) {
  return App.setSnackbar(value);
}

export default App;

// socket.on("connect", () => {
//   console.log(socket.id);
// });
// socket.on("5fdb7d6982f61146c026ed9d", (number) => {
//   console.log(number);
// });
