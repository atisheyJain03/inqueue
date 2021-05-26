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
import axios from "./axios";
import Axios from "axios";
import { UserContext, UserProvider } from "./UserContext";
import SettingsShop from "./components/Shop/Settings/SettingsShop";
import LoginShop from "./components/Shop/login/LoginShop";
import SignUpShop from "./components/Shop/Signup/SignupShop";
import HeaderShop from "./components/Shop/header/HeaderShop";
import Queue from "./components/Shop/queue/Queue";
import Homepage from "./components/header/Homepage/Homepage";
import Cookies from "js-cookie";

function App() {
  const [user, setUser] = useContext(UserContext);
  // console.log(user);
  const [snackbar, setSnackbar] = useState({
    type: "",
    message: "",
    time: null,
  });
  // console.log("app.js");
  useEffect(() => {
    // console.log("header useEffect");
    // THIS IS CANCEL TOKEN IN CASE IF COMPONENT UNMOUNT BEFORE GETTING RESPONSE FROM SERVER
    const source = Axios.CancelToken.source();

    // IIFE FOR ASYNC REQUEST
    (async () => {
      try {
        const userRes = await axios.get(`/users/me/${Cookies.get("jwt")}`, {
          cancelToken: source.token,
        });
        // console.log("🚀 ~ file: App.js ~ line 44 ~ userRes", userRes);

        if (userRes.status === 200 && userRes.data.data.user) {
          setUser({ ...userRes.data.data.user });
          // console.log({ ...userRes.data.data.user });
          if (userRes.data.data.user.shop) {
            // console.log(userRes.data.data.user.shop);
            socket.emit("join", { idShop: userRes.data.data.user.shop });
          } else if (userRes.data.data.user.role === "user") {
            // console.log(userRes.data.data.user.id);
            socket.emit("join", { idUser: userRes.data.data.user.id });
            // socket.on("user", () => alert("user res"));
          }
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

  // socket.on("connect", () => {
  //   console.log(socket.id);
  // });
  // socket.on("5fdb7d6982f61146c026ed9d", (number) => {
  //   console.log(number);
  // });

  return (
    <div className="App">
      <SnackbarCustom snackbar={snackbar} />

      <Router>
        <HeaderCustom searchBar={false} />
        <Route path="/shopAccount">{user ? <HeaderShop /> : null}</Route>
        <Route exact path="/shopAccount/loginShop">
          <LoginShop setSnackbar={setSnackbar} />
        </Route>
        <Route exact path="/shopAccount/signupShop">
          <SignUpShop setSnackbar={setSnackbar} />
        </Route>
        <Route exact path="/shopAccount/shopQueue">
          <Queue />
        </Route>
        <Route exact path="/shopAccount/settingsShop">
          <SettingsShop />
        </Route>

        <Route exact path="/">
          {!user || user.role != "admin" ? (
            <Homepage />
          ) : (
            <>
              <HeaderShop />
              <SettingsShop />
            </>
          )}
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
        </Route>
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
