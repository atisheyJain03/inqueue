import { Button, Grid, Input, makeStyles } from "@material-ui/core";
import React from "react";
import logo from "../../logo.png";
import "./Header.css";
const useStyle = makeStyles(() => ({
  root: {
    backgroundColor: "transparent",
    "& ::placeholder": {
      color: "#e0e0e0",
      opacity: 0.8,
      letterSpacing: 1,
      fontSize: "1rem",
      textTransform: "uppercase",
    },
  },
  input: {
    color: "#e0e0e0",
    fontSize: "1rem",
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
      borderColor: "#ff751a"
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
  grid_item: {
    height: "80px",
  },
}));

function Header() {
  const classes = useStyle();
  return (
    <Grid
      container
      className="header"
      justify="space-between"
      alignItems="center"
    >
      <Grid
        item
        xs={2}
        classes={{
          item: classes.grid_item,
        }}
      >
        <img src={logo} />
      </Grid>
      {/* <Grid
        item
        xs={7}
        classes={{
          item: classes.grid_item,
        }}
      >
        <form></form>
      </Grid> */}
      <Grid
        item
     
        classes={{
          item: classes.grid_item,
        }}
      >
        <div className="header__buttons">
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
            style={{}}
          >
            sign up
          </Button>
        </div>
      </Grid>
    </Grid>
  );
}

export default Header;

{
  /* <div className="header">
  <div className="header__buttons">
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
      style={{}}
    >
      sign up
    </Button>
  </div>
  <div className="header__input">
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
        style={{
          display: "inline-block",
        }}
      >
        set location
      </Button>
    </form>
  </div>
</div>; */
}
