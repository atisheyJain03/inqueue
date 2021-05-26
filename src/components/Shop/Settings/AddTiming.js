import { Button, Grid, TextField } from "@material-ui/core";
import React, { useRef, useState } from "react";
import axios from "../../../axios";

function AddTiming({ time, setTime, shopId }) {
  const startTimeRef = useRef(null);
  const endTimeRef = useRef(null);
  // console.log(time);
  const handleClick = () => {
    const startTime = startTimeRef.current.value.trim();
    const endTime = endTimeRef.current.value.trim();
    if (!startTime || !endTime) {
      alert("empty AddTiming.js");
      return;
    }
    const newTime = [...time];
    newTime.push({ open: startTime, close: endTime });

    axios
      .patch(`/shops/updateShop/${shopId}`, {
        data: {
          openingHours: newTime,
        },
      })
      .then((res) => {
        startTimeRef.current.value = "";
        endTimeRef.current.value = "";
        setTime([...newTime]);
      })
      .catch((err) => console.log(err));
  };

  return (
    <Grid container justify="space-between">
      <Grid item xs={12} sm={3}>
        <TextField
          variant="filled"
          fullWidth
          label="Start Time"
          inputRef={startTimeRef}
          placeholder="Egs  1000"
        />
      </Grid>
      <Grid item xs={12} sm={3}>
        <TextField
          variant="filled"
          placeholder="Egs 1300"
          fullWidth
          label="End Time"
          inputRef={endTimeRef}
        />
      </Grid>
      <Grid item xs={12} sm={3}>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleClick}
        >
          {" "}
          add
        </Button>
      </Grid>
    </Grid>
  );
}

export default AddTiming;
