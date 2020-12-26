import { Grid, makeStyles } from "@material-ui/core";
import Axios from "axios";
import React, { useEffect, useState } from "react";
import axios from "../../axios";
import CardShop from "../CardShop/CardShop";

const useStyles = makeStyles((theme) => ({
  grid_container: {
    width: "85%",
    margin: "auto",
  },
  root: {
    marginTop: "50px",
  },
}));

// THIS IS THE PAGE WHICH SHOW ALL SHOPS

function AllShops({ setSnackbar }) {
  const classes = useStyles();
  // shops - THIS STORE ALL SHOPS DATA WHICH WILL COME FROM API
  const [shops, setShops] = useState([]);

  // THIS USE EFFECT WILL RUN WHEN PAGE WILL LOAD
  useEffect(() => {
    // THIS IS CANCEL TOKEN IN CASE IF COMPONENT UNMOUNT BEFORE GETTING RESPONSE FROM SERVER
    const source = Axios.CancelToken.source();

    // IIFE FOR ASYNC REQUEST
    (async () => {
      try {
        const shopRes = await axios.get("/shops/getShops", {
          cancelToken: source.token,
        });
        setShops([...shopRes.data.data.shops]);
      } catch (error) {
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
      }
    })();
    return () => {
      source.cancel();
    };
  }, []);
  return (
    <div className={classes.root}>
      <Grid container className={classes.grid_container} justify="space-around">
        {shops.map((el) => {
          return (
            <Grid item xs={12} sm={6} lg={4} key={el._id}>
              <CardShop
                image={el.imageCover}
                name={el.name}
                jobType={el.shopType}
                description={el.description}
                totalRatings={el.ratingsQuantity}
                id={el._id}
                ratingsAverage={el.ratingsAverage}
              />
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
}

export default AllShops;
