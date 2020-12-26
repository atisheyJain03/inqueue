import {
  Grid,
  makeStyles,
  MenuItem,
  Select,
  Typography,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import Ratings from "../ratings/Ratings";
import axios from "../../axios";
import ButtonShopPage from "./ButtonShopPage";
import Axios from "axios";
import { showSnackbar } from "../snackbar/Snackbar";

const useStyle = makeStyles((theme) => ({
  main_div: {
    width: "80%",
    margin: "auto",
    marginTop: 10,
  },
  shopPage__img: {
    width: "100%",
    height: "35vh",
    objectFit: "cover",
  },
  heading__div: {
    display: "block",
    marginRight: "auto",
  },
  heading__rating: {
    display: "inline-block",
  },
  open_time: {
    marginTop: "-0.5rem",
  },
  waiting__time: {
    marginTop: "1rem",
    "& h2": {
      lineHeight: 1.5,
      fontSize: "0.9rem",
    },
  },
  contact: {
    marginTop: "2rem",

    [theme.breakpoints.up("sm")]: {
      borderRight: "2px solid black",
    },
    "& h2": {
      fontSize: "0.9rem",
      lineHeight: 1.5,
    },
  },
  info: {
    marginTop: "1.5rem",
    [theme.breakpoints.up("sm")]: {
      padding: "0 1.5rem",
    },
  },
  dropdownRoot: {
    "& .MuiInputBase-root": {
      display: "block",
    },
  },
}));

function ShopPage({ setSnackbar }) {
  const classes = useStyle();
  // pageData =  STORE ALL PAGE DATA WILL GET WHEN PAGE WILL RENDER / COMPONENT WILL MOUNT IN USE EFFECT
  const [pageData, setPageData] = useState({});

  // GET INFO ABOUT QUEUE LIKE TOTAL nUMBERS , CURRENT NUMBER , WAITING TIME
  const [queueInfo, setQueueInfo] = useState({});

  // THIS IS SELECT OPTION IN DROP DOWN THIS WILL STORE ID OF THE SERVICE SELLECTED
  const [selectOption, setSelectOption] = useState("");

  useEffect(() => {
    // THIS IS CANCEL TOKEN IN CASE IF COMPONENT UNMOUNT BEFORE GETTING RESPONSE FROM SERVER
    const source = Axios.CancelToken.source();

    // GET ID OF PAGE WHICH WILL COME IN URL
    // SP THAT WE CAN GET PAGE DATA
    const id = window.location.pathname.split("/")[2];
    // IIFE
    (async () => {
      try {
        const shopRes = await axios.get(`/shops/getShop/${id}`, {
          cancelToken: source.token,
        });
        setPageData(shopRes.data.data.shop);
      } catch (error) {
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

  // DROPDOWN ONCHANGE HANDLER
  const dropdownOnChange = (event) => {
    // VALUE FROM DROPDOWN (STORE ID)
    console.log(event.target.value);

    // SEARCH OBJECT WITH SELECTED ID IN DROPDOWN TO STORE QUEUE DATA
    for (let i = 0; i < pageData.serviceBy.length; i++) {
      if (pageData.serviceBy[i].id === event.target.value) {
        setSelectOption(event.target.value);
        setQueueInfo({ ...pageData.serviceBy[i] });
        break;
      }
    }
  };
  return (
    <div className={classes.main_div} align="left">
      <Grid container>
        <Grid item xs={12}>
          <img src={pageData.imageCover} className={classes.shopPage__img} />
        </Grid>
        <Grid item xs={12} lg={9}>
          <Grid container style={{ marginTop: "1rem" }}>
            <Grid item xs={12} sm={9}>
              <div className={classes.heading__div} align="left">
                <Typography
                  variant="h4"
                  component="h2"
                  className={classes.heading}
                >
                  {pageData.name}
                </Typography>
                <Typography gutterBottom variant="h6" component="h2">
                  {pageData.shopType}
                </Typography>
              </div>
            </Grid>
            <Grid item sm={3} xs={12}>
              <Ratings
                rating={pageData.ratingsAverage}
                total={pageData.ratingsQuantity}
              />
            </Grid>
          </Grid>
          <Grid container justify="space-between">
            <Grid item sm={4} xs={12}>
              <div className={classes.contact}>
                <Typography
                  variant="overline"
                  component="h2"
                  style={{
                    fontSize: "0.9rem",
                    fontWeight: "700",
                    marginBottom: "0.6rem",
                  }}
                >
                  contact
                </Typography>
                <Typography variant="overline" component="h2">
                  {pageData.address}
                </Typography>
                <Typography variant="overline" component="h2">
                  karnal - 13200
                </Typography>
                <Typography variant="overline" component="h2">
                  Haryana
                </Typography>
                <div style={{ marginTop: "0.5rem" }}>
                  <Typography variant="overline" component="h2">
                    tel : {pageData.phoneNumber}
                  </Typography>
                </div>
              </div>
            </Grid>
            <Grid item sm={8} xs={12}>
              <div className={classes.info}>
                <Typography
                  variant="overline"
                  component="h2"
                  style={{
                    fontSize: "0.9rem",
                    fontWeight: "700",
                    marginBottom: "0.6rem",
                    lineHeight: "1.5",
                  }}
                >
                  info
                </Typography>
                <Typography
                  variant="body2"
                  color="textSecondary"
                  component="p"
                  gutterBottom
                  className={classes.para_info}
                  align="justify"
                >
                  {pageData.info}
                </Typography>
              </div>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} lg={3}>
          <Grid container>
            <Grid item xs={12}>
              <div align="left">
                <Typography
                  variant="overline"
                  component="h1"
                  style={{ fontWeight: "700" }}
                >
                  OPEN TODAY
                </Typography>
                <Typography
                  variant="h5"
                  gutterBottom
                  component="h2"
                  className={classes.open_time}
                >
                  09:00 - 13:00
                </Typography>
                <Typography
                  variant="h5"
                  component="h2"
                  className={classes.open_time}
                >
                  14:00 - 18:00
                </Typography>
              </div>
            </Grid>
            <Grid item xs={12}>
              {selectOption ? (
                <div className={classes.waiting__time}>
                  <Typography variant="overline" component="h2">
                    Estimate waiting time - 20 min
                  </Typography>
                  <Typography variant="overline" component="h2">
                    Current number - {queueInfo.currentNumber}
                  </Typography>
                  <Typography variant="overline" component="h2">
                    Total numbers - {queueInfo.totalNumber}
                  </Typography>
                </div>
              ) : null}
              <div
                style={{ marginTop: "2rem", marginLeft: "auto" }}
                className={classes.dropdownRoot}
              >
                {/* DROPDOWN REFRENCES VIDEO */
                /* https://www.youtube.com/watch?v=FTVL36d1gXY&t=351s&ab_channel=phpstepbystep */}
                <Select
                  value={selectOption}
                  displayEmpty
                  autoWidth
                  onChange={dropdownOnChange}
                >
                  <MenuItem key={"empty"} disabled value="">
                    Select An Option
                  </MenuItem>
                  ({" "}
                  {pageData.serviceBy
                    ? pageData.serviceBy.map((service) => {
                        return (
                          <MenuItem key={service.id} value={service.id}>
                            {service.name}
                          </MenuItem>
                        );
                      })
                    : null}{" "}
                  )
                </Select>
              </div>
              <div style={{ marginTop: "2rem" }}>
                {selectOption ? (
                  <ButtonShopPage
                    serviceId={selectOption}
                    setQueueInfo={setQueueInfo}
                    setSnackbar={setSnackbar}
                  />
                ) : null}
              </div>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

export default ShopPage;
