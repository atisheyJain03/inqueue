import { makeStyles, Typography } from "@material-ui/core";
import { Rating } from "@material-ui/lab";
import React from "react";

const useStyles = makeStyles({
  span_ratings: {
    transform: "translateY(-6px)",
    display: "inline-block",
    marginLeft: 5,
  },
});

// HERE ratings  = TOTAL RATINGS OUT OF 5
// total  = TOTAL NUMBER OF RATINGS
function Ratings({ rating, total }) {
  const classes = useStyles();
  return (
    <div>
      <Typography gutterBottom variant="h6" component="h2">
        <Rating
          name="half-rating"
          value={rating || 0}
          precision={0.1}
          readOnly
        />
        <span className={classes.span_ratings}>({total || 0} Ratings)</span>
      </Typography>
    </div>
  );
}

export default Ratings;
