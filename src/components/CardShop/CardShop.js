import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import Ratings from "../ratings/Ratings";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
    margin: "auto",
    marginBottom: 20,
  },
  media: {
    height: 240,
  },
  para_info: {
    height: 120,
    width: "100%",
    textOverflow: "ellipsis",
    overflow: "hidden",
  },
  span_ratings: {
    transform: "translateY(-6px)",
    display: "inline-block",
    marginLeft: 5,
  },
  heading: {
    height: 64,
  },
});

export default function MediaCard({
  image,
  name,
  jobType,
  totalRatings,
  description,
  id,
  ratingsAverage,
}) {
  const classes = useStyles();
  // history  -  IT IS FROM REACT-ROUTER-DOM USED TO CHANGE URL OF PAGE ( KIND OF REDIRECT)
  const history = useHistory();
  return (
    <Card
      className={classes.root}
      elevation={5}
      onClick={() => history.push(`/shops/${id}/`)}
    >
      <CardActionArea>
        <CardMedia className={classes.media} image={image} />
        <CardContent align="left">
          <Typography
            gutterBottom
            variant="h5"
            component="h2"
            className={classes.heading}
          >
            {name}
          </Typography>
          <Typography gutterBottom variant="h6" component="h2">
            {jobType}
          </Typography>
          <Ratings rating={ratingsAverage} total={totalRatings} />

          <Typography
            variant="body2"
            color="textSecondary"
            component="p"
            gutterBottom
            className={classes.para_info}
          >
            {description}
          </Typography>

          <Typography gutterBottom variant="overline" component="h1">
            Estimate Waiting Time - 20 min
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
