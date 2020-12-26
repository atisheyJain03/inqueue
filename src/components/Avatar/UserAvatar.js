import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
  large: {
    width: theme.spacing(12),
    height: theme.spacing(12),
  },
}));

export default function UserAvatar({ size, src, alt }) {
  const classes = useStyles();
  let imgSize = classes.large;
  if (size === "small") imgSize = classes.small;
  if (size === "medium") imgSize = classes.medium;
  return (
    <div className={classes.root}>
      <Avatar alt={alt || "user image"} src={src || null} className={imgSize} />
    </div>
  );
}
