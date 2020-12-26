import React, { useRef, useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Cookies from "js-cookie";
import { Link, useHistory } from "react-router-dom";
import axios from "../../../axios";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignUpShop({ setSnackbar }) {
  const classes = useStyles();
  const history = useHistory();
  const [showInstructions, setShowInstructions] = useState(false);

  const nameRef = useRef(),
    emailRef = useRef(),
    passwordRef = useRef(),
    passwordConfirmRef = useRef();

  const submitHandler = (event) => {
    event.preventDefault();
    const name = nameRef.current.value.trim();
    const email = emailRef.current.value.trim();
    const password = passwordRef.current.value;
    const passwordConfirm = passwordConfirmRef.current.value;
    if (!name || !email || !password || !passwordConfirm) {
      console.log("something is missing");
      return;
    }
    console.log(name, email, password, passwordConfirm);
    axios
      .post("/users/signUpShop", {
        data: {
          name,
          email,
          password,
          passwordConfirm,
        },
      })
      .then(() => {
        const obj = {
          type: "success",
          message: "Account Created Successfully",
          time: Date.now(),
        };
        setSnackbar({ ...obj });
        setShowInstructions(true);
        // history.push("/");
        // window.location.reload();
      })
      .catch((error) => {
        console.log({ error });
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
      });
  };
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} noValidate onSubmit={submitHandler}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete="Nname"
                name="Name"
                variant="outlined"
                inputRef={nameRef}
                required
                fullWidth
                id="Name"
                label="Name"
                autoFocus
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                inputRef={emailRef}
                label="Email Address"
                name="email"
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                inputRef={passwordRef}
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required={true}
                fullWidth
                inputRef={passwordConfirmRef}
                name="passwordConfirm"
                label="Confirm Password"
                type="password"
                id="passwordConfirm"
                autoComplete="current-password"
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link to="/login" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
            {showInstructions && (
              <Grid container justify="center">
                <Grid item>
                  <h3>Account created successfully</h3>
                </Grid>
                <Grid item>
                  <Link to="/addShopInstructions" variant="body2">
                    Click here to add Information about shop
                  </Link>
                </Grid>
              </Grid>
            )}
          </Grid>
        </form>
      </div>
    </Container>
  );
}
