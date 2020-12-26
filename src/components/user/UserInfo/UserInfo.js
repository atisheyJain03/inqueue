import { Button, Grid, makeStyles, TextField } from "@material-ui/core";
import React, { useContext, useRef, useState } from "react";
import axios from "../../../axios";
import { UserContext } from "../../../UserContext";
import UserAvatar from "../../Avatar/UserAvatar";

const useStyles = makeStyles({
  root: {
    maxWidth: "500px",
    margin: "auto",
    width: "80%",
  },
  buttonImage: {
    marginRight: "1rem",
  },
  buttonSubmit: {
    marginTop: "2rem",
  },
});

function UserInfo({ setSnackbar }) {
  const [image, setImage] = useState(null);
  const [imageName, setImageName] = useState(null);
  const [user, setUser] = useContext(UserContext);
  const nameRef = useRef(user.name);
  const classes = useStyles();

  const handleImage = (event) => {
    console.log(event.target.files[0]);
    setImage(event.target.files[0]);
    setImageName(event.target.files[0].name);
  };

  const handleSubmit = (event) => {
    const name = nameRef.current.value.trim();
    if (!image && !name) return;
    const fd = new FormData();
    if (image) fd.append("photo", image);
    if (name) fd.append("name", name);
    axios
      .patch("/users/updateMe", fd)
      .then((res) => {
        const obj = {
          type: "success",
          message: "User Information updated successfully",
          time: Date.now(),
        };
        setSnackbar({ ...obj });
        console.log(res.data.data.user);
        setUser({ ...res.data.data.user });
        setImageName(null);
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
    <div className={classes.root}>
      <Grid container alignItems="center">
        <Grid item xs={12} sm={4}>
          <div style={{ display: "inline-block", marginTop: "20px" }}>
            <UserAvatar size="large" src={user.photo} />
          </div>
        </Grid>
        <Grid item xs={12} sm={8}>
          <input
            accept="image/*"
            className={classes.input}
            style={{ display: "none" }}
            id="raised-button-file"
            multiple
            type="file"
            onChange={handleImage}
          ></input>
          <label htmlFor="raised-button-file">
            <Button
              variant="outlined"
              component="span"
              className={classes.buttonImage}
            >
              Upload A new Photo
            </Button>
          </label>
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            id="standard-basic"
            label="Name"
            inputRef={nameRef}
            placeholder={user.name}
          />
        </Grid>
        <Grid item xs={12}>
          <Button
            variant="contained"
            fullWidth
            className={classes.buttonSubmit}
            onClick={handleSubmit}
          >
            submit
          </Button>
          {imageName && <h5>{imageName}</h5>}
        </Grid>
      </Grid>
    </div>
  );
}

export default UserInfo;
