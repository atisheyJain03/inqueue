import {
  Button,
  FormControlLabel,
  Grid,
  makeStyles,
  Switch,
  Typography,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import axios from "../../../axios";
import Loader from "../../Loader/Loader";
import AccordanceServices from "./AccordanceServices";
import AccordionTiming from "./AccordionTiming";
import Address from "./Address";
import AddService from "./AddService";
import AddTiming from "./AddTiming";
import CardDescription from "./CardDescription";
import CardImage from "./CardImage";
import CoverImage from "./CoverImage";
import PageInfo from "./PageInfo";
import PhoneNumber from "./PhoneNumber";
import ShopName from "./ShopName";
import ShopType from "./ShopType";
import Website from "./website";

const useStyles = makeStyles({
  root: {
    width: "80%",
    margin: "auto",
    "& .MuiGrid-container": {
      marginBottom: 20,
    },
    "& .MuiGrid-item": {
      alignSelf: "center",
    },
  },
  shop: {
    fontWeight: "700",
    textTransform: "uppercase",
  },
});

let shopId = null;

function SettingsShop() {
  const classes = useStyles();
  const [shopStatus, setShopStatus] = useState(true);
  const [showAddTiming, setShowAddTiming] = useState(false);
  const [showAddService, setShowAddService] = useState(false);

  const [shop, setShop] = useState(null);
  const [loading, setLoading] = useState(true);
  const [services, setServices] = useState([]);
  const [time, setTime] = useState([]);
  const [cardImage, setCardImage] = useState(null);
  const [coverImage, setCoverImage] = useState(null);
  console.log(time);

  console.log(shopId);
  useEffect(() => {
    axios
      .get("/shops/getShopByAdmin")
      .then((res) => {
        console.log(res.data.data.shop);
        setShop(res.data.data.shop);
        setServices(res.data.data.shop.serviceBy);
        setTime(res.data.data.shop.openingHours);
        setCoverImage(res.data.data.shop.coverPhoto);
        setCardImage(res.data.data.shop.cardPhoto);
        shopId = res.data.data.shop._id;
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className={classes.root}>
          <Grid container>
            <Grid container justify="space-between">
              <Grid item xs={2}>
                Shop
              </Grid>
              <Grid item xs={7}>
                <FormControlLabel
                  control={
                    <Switch
                      onChange={() => setShopStatus(!shopStatus)}
                      name="gilad"
                    />
                  }
                  label={shopStatus ? "open" : "closed"}
                />
              </Grid>
              <Grid item xs={2}>
                <Typography
                  variant="h5"
                  color="primary"
                  className={classes.shop}
                >
                  {shopStatus ? "open" : "closed"}
                </Typography>
              </Grid>
            </Grid>
            <Grid container justify="space-between">
              <Grid item xs={12} sm={9}>
                <AccordionTiming
                  time={time}
                  setTime={setTime}
                  shopId={shopId}
                />
              </Grid>
              <Grid item xs={12} sm={2}>
                <Button
                  variant="contained"
                  fullWidth
                  onClick={() => setShowAddTiming(!showAddTiming)}
                >
                  Add Opening Timing
                </Button>
              </Grid>
            </Grid>
            <Grid container>
              {showAddTiming && (
                <AddTiming time={time} setTime={setTime} shopId={shopId} />
              )}
            </Grid>
            <Grid container justify="space-between">
              <Grid item xs={12} sm={9}>
                <AccordanceServices
                  setShop={setShop}
                  services={services}
                  setServices={setServices}
                />
              </Grid>
              <Grid item xs={12} sm={2}>
                <Button
                  variant="contained"
                  fullWidth
                  onClick={() => setShowAddService(!showAddService)}
                >
                  Add Service
                </Button>
              </Grid>
            </Grid>
            <Grid container>
              {showAddService && (
                <AddService services={services} setServices={setServices} />
              )}
            </Grid>
            <CardImage
              cardImage={cardImage}
              setCardImage={setCardImage}
              shopId={shopId}
            />
            <CoverImage
              coverImage={coverImage}
              setCoverImage={setCoverImage}
              shopId={shopId}
            />
            <Grid container>
              <Grid item xs={12}>
                <Address setShop={setShop} shopId={shopId} />
              </Grid>
            </Grid>
            <Grid container>
              <Grid item xs={12}>
                <PhoneNumber setShop={setShop} shopId={shopId} />
              </Grid>
            </Grid>
            <Grid container>
              <Grid item xs={12}>
                <CardDescription setShop={setShop} shopId={shopId} />
              </Grid>
            </Grid>
            <Grid container>
              <Grid item xs={12}>
                <PageInfo setShop={setShop} shopId={shopId} />
              </Grid>
            </Grid>
            <Grid container>
              <Grid item xs={12}>
                <Website setShop={setShop} shopId={shopId} />
              </Grid>
            </Grid>
            <Grid container>
              <Grid item xs={12}>
                <ShopName setShop={setShop} shopId={shopId} />
              </Grid>
            </Grid>
            <Grid container>
              <Grid item xs={12}>
                <ShopType setShop={setShop} shopId={shopId} />
              </Grid>
            </Grid>
            <Grid container>
              <Grid item xs={12}>
                <Button variant="contained" color="primary">
                  Save
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </div>
      )}
    </>
  );
}

export default SettingsShop;
