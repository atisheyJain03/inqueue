import { Button, Grid, makeStyles, Typography } from "@material-ui/core";
import React from "react";
import axios from "../../../axios";

const useStyles = makeStyles({
  image: {
    width: 240,
    height: "auto",
  },
});

function CoverImage({ coverImage, setCoverImage, shopId }) {
  const classes = useStyles();

  const handleCoverPhoto = (event) => {
    const fd = new FormData();
    fd.append("photo", event.target.files[0]);

    axios
      .patch(`/shops/updateShop/coverPhoto/${shopId}`, fd)
      .then((res) => {
        setCoverImage(res.data.data.shop.coverPhoto);
        console.log({ res });
      })
      .catch((err) => console.log({ err }));
  };

  return (
    <Grid container justify="center">
      <Grid item xs={12} sm={2}>
        <Typography variant="subtitle1">Cover Image</Typography>
      </Grid>
      <Grid item xs={12} sm={8}>
        <img src={coverImage} className={classes.image} />
      </Grid>
      <Grid item xs={12} sm={2}>
        <input
          accept="image/*"
          style={{ display: "none" }}
          id="coverPhoto"
          multiple
          type="file"
          onChange={handleCoverPhoto}
        ></input>
        <label htmlFor="coverPhoto">
          <Button variant="contained" fullWidth component="span">
            Change Photo
          </Button>
        </label>
      </Grid>
    </Grid>
  );
}

export default CoverImage;
