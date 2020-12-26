import { Button, Grid, TextField } from "@material-ui/core";
import React, { useRef, useState } from "react";
import axios from "../../../axios";

function AddService({ services, setServices }) {
  const nameRef = useRef(null);
  const priceRef = useRef(null);

  const handleAdd = () => {
    const serviceName = nameRef.current.value.trim();
    const servicePrice = priceRef.current.value.trim();
    if (!serviceName || !servicePrice)
      alert("no service name or service price");
    axios
      .post("/service/createService", {
        data: {
          name: serviceName,
          price: servicePrice,
        },
      })
      .then((res) => {
        console.log({ res });
        setServices([...services, res.data.data.service]);
        nameRef.current.value = "";
        priceRef.current.value = "";
      })
      .catch((err) => console.log({ err }));
  };

  return (
    <Grid container justify="space-between">
      <Grid item xs={12} sm={3}>
        <TextField
          variant="filled"
          // onChange={(event) => setName(event.target.value)}
          inputRef={nameRef}
          fullWidth
          label="Service Name"
          placeholder="Egs  1000"
        />
      </Grid>
      <Grid item xs={12} sm={3}>
        <TextField
          variant="filled"
          placeholder="Egs 1300"
          inputRef={priceRef}
          fullWidth
          label="Service Price"
          // onChange={(event) => setPrice(event.target.value)}
        />
      </Grid>
      <Grid item xs={12} sm={3}>
        <Button
          variant="contained"
          fullWidth
          color="primary"
          onClick={handleAdd}
        >
          {" "}
          add
        </Button>
      </Grid>
    </Grid>
  );
}

export default AddService;
