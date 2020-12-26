import React, { useEffect, useState } from "react";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { makeStyles } from "@material-ui/core/styles";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
}));

const snackbarData = { type: "", message: "", time: null };

export default function SnackbarCustom({ snackbar }) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  if (
    snackbar.type !== snackbarData.type ||
    snackbar.message !== snackbarData.message ||
    snackbar.time !== snackbarData.time
  ) {
    snackbarData.type = snackbar.type;
    snackbarData.message = snackbar.message;
    snackbarData.time = snackbar.time;
    setOpen(true);
  }

  //   useEffect(() => {
  //     console.log({ ...snackbar });
  //     setSnackbarData({ ...snackbar });
  //     setOpen(true);
  //   });

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
  const { type, message } = snackbar;
  return (
    <div>
      {type && message ? (
        <div className={classes.root}>
          <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity={snackbar.type}>
              {snackbar.message}
            </Alert>
          </Snackbar>
        </div>
      ) : null}
    </div>
  );
}
