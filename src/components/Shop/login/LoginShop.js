import React, { useRef } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { Link, useHistory } from "react-router-dom";
import axios from "../../../axios";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  image: {
    backgroundImage: "url(https://source.unsplash.com/random)",
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  paper: {
    margin: theme.spacing(8, 4),
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
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function LoginShop({ setSnackbar }) {
  const classes = useStyles();
  const passwordRef = useRef(),
    emailRef = useRef();
  const history = useHistory();

  const loginHandler = (event) => {
    event.preventDefault();
    const email = emailRef.current.value.trim();
    const password = passwordRef.current.value;
    if (!password || !email) {
      const obj = {
        type: "warning",
        message: "Please enter a valid email and password",
        time: Date.now(),
      };
      setSnackbar({ ...obj });
      return;
    }

    axios
      .post("/users/loginShop", {
        data: {
          password,
          email,
        },
      })
      .then((res) => {
        const obj = {
          type: "success",
          message: "Logged in Successfully",
          time: Date.now(),
        };
        setSnackbar({ ...obj });
        emailRef.current.value = null;
        passwordRef.current.value = null;
        history.push("/");
        window.location.reload();
      })
      .catch((error) => {
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
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <h3>This is for login as admin</h3>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form className={classes.form} noValidate onSubmit={loginHandler}>
            <TextField
              inputRef={emailRef}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              inputRef={passwordRef}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link to="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link to="/signUp" variant="body2">
                  {"Want to register a new Shop/services"}
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}
