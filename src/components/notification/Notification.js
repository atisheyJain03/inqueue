import React, { useContext, useEffect, useState } from "react";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import BellIcon from "./BellIcon";
import { Button, ListItem, makeStyles, Typography } from "@material-ui/core";

import axios from "../../axios";
import momentTimezone from "../../momentTimezone";
import Loader from "../Loader/Loader";
import { UserContext } from "../../UserContext";

const ITEM_HEIGHT = 48;

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: "36ch",
    minHeight: "30px",
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: "inline",
  },
  listItem: {
    cursor: "pointer",
    display: "block",
  },
  btnAccept: {
    background: "#4caf50",
    fontSize: 10,
    // fontWeight: "bold",
    marginRight: "10%",
  },
  btnReject: {
    background: "#f44336",
    fontSize: 10,
    // fontWeight: "bold",
  },
}));

let number = 0;

export default function NotificationShop({ textAfterNotificationIcon }) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [totalNotifications, setTotalNotifications] = React.useState(0);
  const [list, setList] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  const [user, setUser] = useContext(UserContext);

  // for pagination
  const [page, setPage] = useState(1);

  // to check if component is not unmounted
  //
  const [isUnmounted, setIsUnmounted] = useState(false);
  const [noMore, setNoMore] = useState(false);
  // THIS USE EFFECT WILL RUN WHEN PAGE WILL LOAD

  // console.log(user);
  const handleClick = (event) => {
    // console.log(page);
    setNoMore(false);
    setAnchorEl(event.currentTarget);
    setTotalNotifications(0);
    handleClickNotification();
  };

  useEffect(() => {
    return () => {
      setIsUnmounted(true);
    };
  }, []);

  const handleClickNotification = () => {
    // console.log("...............");
    setLoading(true);
    axios
      .get(`/users/notifications/${user.id}?page=${page}&limit=10`)
      .then((res) => {
        if (!isUnmounted) {
          // console.log(res.data.data.notifications.notifications);
          if (res.data.data.notifications.notifications.length === 0)
            setNoMore(true);
          else {
            setList([...list, ...res.data.data.notifications.notifications]);
            setPage(page + 1);
          }
          setLoading(false);
        }
      })
      .catch((err) => console.log(err));
  };

  const open = Boolean(anchorEl);

  const handleClose = () => {
    setPage(1);
    setList([]);
    setAnchorEl(null);
  };

  return (
    <div style={{ alignSelf: "center" }}>
      <div onClick={handleClick} style={{ position: "relative" }}>
        <IconButton
          aria-label="more"
          aria-controls="long-menu"
          aria-haspopup="true"
        >
          <BellIcon
            totalNotifications={totalNotifications}
            setTotalNotifications={setTotalNotifications}
          />
        </IconButton>
        <p style={{ display: "inline-block" }}>{textAfterNotificationIcon}</p>
      </div>

      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: "100vh",
            maxWidth: "90vw",
            width: "50ch",
          },
        }}
      >
        {list.map((listItem, index) => (
          <ListItem
            key={listItem.id}
            className={classes.listItem}
            style={{ display: "block" }}
          >
            <Typography variant="h5">
              {listItem.shop} | {listItem.service}
            </Typography>
            <Typography variant="h6">
              Your request for ticket has been {listItem.status}{" "}
            </Typography>
            {listItem.status === "accepted" && (
              <Typography variant="h6">
                Your Ticket number is {listItem.number}{" "}
              </Typography>
            )}

            <Typography variant="caption" align="right" display="block">
              {momentTimezone(listItem.createdAt)}
            </Typography>
          </ListItem>
        ))}
        <ListItem
          key="button-list"
          className={classes.listItem}
          style={{ display: "block" }}
        >
          {loading ? (
            <Loader />
          ) : noMore ? (
            <Typography variant="h6" gutterBottom>
              No more Results
            </Typography>
          ) : (
            <Button onClick={handleClickNotification}>Load more</Button>
          )}
        </ListItem>
      </Menu>
    </div>
  );
}
