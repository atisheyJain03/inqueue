import { Button, Input, makeStyles } from "@material-ui/core";
import React from "react";
import "./Navbar.css";
import logo from "../../logo.png";

import backgroundImg from "../../images/background.jpg";
import { useHistory } from "react-router-dom";

const useStyle = makeStyles(() => ({
  root: {
    backgroundColor: "transparent",
    cursor: "pointer",
    "& ::placeholder": {
      color: "#e0e0e0",
      opacity: 0.8,
      letterSpacing: 1,
      fontSize: "2.5rem",
      textTransform: "uppercase",
    },
  },
  input: {
    color: "#e0e0e0",
    fontSize: "2.5rem",
    fontWeight: "500",
    padding: "0.7rem",
    border: "6px solid #e0e0e0",
    letterSpacing: 1,
  },
  button__root: {
    transition: "all 0.3s",
    "&:hover": {
      background: "black",
      opacity: "0.9",
      transform: "translateY(-3px)",
    },
  },
  button__outline: {
    fontSize: "1.2rem",
    color: "#e0e0e0",
    letterSpacing: 1,
    fontWeight: "600",
    "&:hover": {
      border: "3px solid white",
    },
  },
  button__outline_primary: {
    border: "3px solid #e0e0e0",
    color: "#e0e0e0",
    letterSpacing: 1,
    // "& :hover": {
    //   border: "3px solid #e0e0e0",
    //   color: "#e0e0e0",
    // },
  },
}));

function Navbar() {
  const history = useHistory();
  const classes = useStyle();
  return (
    <div
      className="navbar"
      style={{
        background: `url(${backgroundImg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <img
        src={logo}
        className="navbar__image"
        onClick={() => history.push("/shops")}
      ></img>
      <div className="navbar__buttons">
        <Button
          elevation={5}
          variant="outlined"
          color="primary"
          size="medium"
          classes={{
            textPrimary: classes.button__outline,
            outlinedPrimary: classes.button__outline_primary,
            root: classes.button__root,
            outlinedSizeLarge: classes.button__outline,
          }}
          style={{
            marginRight: "20px",
          }}
        >
          login
        </Button>

        <Button
          elevation={5}
          variant="outlined"
          color="primary"
          size="medium"
          classes={{
            textPrimary: classes.button__outline,
            outlinedPrimary: classes.button__outline_primary,
            root: classes.button__root,
            outlinedSizeLarge: classes.button__outline,
          }}
          style={{
            marginRight: "40px",
          }}
        >
          sign up
        </Button>
      </div>
      <div className="navbar__input">
        <form>
          <Input
            placeholder="enter pincode"
            disableUnderline="true"
            fullWidth="true"
            className="navbar__input"
            classes={{
              input: classes.input,
              root: classes.root,
            }}
          />
          <Button
            type="submit"
            elevation={5}
            variant="outlined"
            color="primary"
            size="large"
            classes={{
              textPrimary: classes.button__outline,
              outlinedPrimary: classes.button__outline_primary,
              root: classes.button__root,
              outlinedSizeLarge: classes.button__outline,
            }}
          >
            set location
          </Button>
        </form>
      </div>
    </div>
  );
}

export default Navbar;
