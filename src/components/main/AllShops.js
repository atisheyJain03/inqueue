import { Button, Grid, makeStyles, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import axios from "../../axios";
import CardShop from "../CardShop/CardShop";
import Loader from "../Loader/Loader";

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

  // to set loader on screen
  const [loading, setLoading] = useState(true);

  // for pagination
  const [page, setPage] = useState(1);

  // to check if component is not unmounted
  //
  const [isUnmounted, setIsUnmounted] = useState(false);
  const [noMore, setNoMore] = useState(false);
  // THIS USE EFFECT WILL RUN WHEN PAGE WILL LOAD

  const getShopsHandler = async () => {
    // IIFE FOR ASYNC REQUEST
    setLoading(true);
    try {
      const shopRes = await axios.get(`/shops/getShops?limit=6&page=${page}`);
      console.log(shopRes.data.data.shops);
      if (!isUnmounted) {
        if (shopRes.data.data.shops.length === 0) setNoMore(true);
        else {
          setShops([...shops, ...shopRes.data.data.shops]);
          setPage(page + 1);
        }
        setLoading(false);
      }
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
      if (!isUnmounted) {
        setSnackbar({ ...obj });
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    getShopsHandler();
    return () => {
      setIsUnmounted(true);
    };
  }, []);
  return (
    <div className={classes.root}>
      <Grid container className={classes.grid_container} justify="space-around">
        {shops.map((el) => {
          return (
            <Grid item xs={12} sm={6} lg={4} key={el._id}>
              <CardShop
                image={el.cardPhoto}
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
      {loading ? (
        <Loader />
      ) : noMore ? (
        <Typography variant="h6" gutterBottom>
          {" "}
          No more Results
        </Typography>
      ) : (
        <Button onClick={getShopsHandler}>Load more</Button>
      )}
    </div>
  );
}

export default AllShops;
