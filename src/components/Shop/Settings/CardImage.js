import { Button, Grid, makeStyles, Typography } from "@material-ui/core";
import React from "react";
import axios from "../../../axios";

const useStyles = makeStyles({
  image: {
    width: 240,
    height: "auto",
  },
});

function CardImage({ cardImage, setCardImage, shopId }) {
  const classes = useStyles();

  const handleCardPhoto = (event) => {
    const fd = new FormData();
    fd.append("photo", event.target.files[0]);
    axios
      .patch(`/shops/updateShop/cardPhoto/${shopId}`, fd)
      .then((res) => {
        console.log({ res });
        setCardImage(res.data.data.shop.cardPhoto);
      })
      .catch((err) => console.log({ err }));
  };

  return (
    <Grid container justify="center">
      <Grid item xs={12} sm={2}>
        <Typography variant="subtitle1">Card Image</Typography>
      </Grid>
      <Grid item xs={12} sm={8}>
        <img src={cardImage} className={classes.image} />
      </Grid>
      <Grid item xs={12} sm={2}>
        <input
          accept="image/*"
          style={{ display: "none" }}
          id="cardPhoto"
          multiple
          type="file"
          onChange={handleCardPhoto}
        ></input>
        <label htmlFor="cardPhoto">
          <Button variant="contained" fullWidth component="span">
            Change Photo
          </Button>
        </label>
      </Grid>
    </Grid>
  );
}

export default CardImage;
