import { Button, Grid, TextField, Typography } from "@material-ui/core";
import React, { useRef } from "react";
import axios from "../../../axios";

function PhoneNumber({ shopId, setShop }) {
  const inputRef = useRef(null);

  const handleClick = () => {
    const input = inputRef.current.value.trim();

    if (!input) {
      alert("empty AddTiming.js");
      return;
    }
    axios
      .patch(`/shops/updateShop/${shopId}`, {
        data: {
          phoneNumber: input,
        },
      })
      .then((res) => {
        inputRef.current.value = "";
        // console.log(res);
        setShop(res.data.data.shop);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <Grid container justify="space-between">
        <Grid item xs={12} sm={2}>
          <Typography variant="subtitle1">Phone Number</Typography>
        </Grid>
        <Grid item xs={12} sm={7}>
          <TextField inputRef={inputRef} variant="filled" multiline fullWidth />
        </Grid>
        <Grid item xs={12} sm={2}>
          <Button variant="contained" fullWidth onClick={handleClick}>
            Submit Phone Number
          </Button>
        </Grid>
      </Grid>
    </div>
  );
}

export default PhoneNumber;
