import React, { useContext, useEffect } from "react";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import BellIcon from "./BellIcon";
import { Button, ListItem, makeStyles, Typography } from "@material-ui/core";

import { UserContext } from "../../../UserContext";
import axios from "../../../axios";
import Loader from "../../Loader/Loader";
import momentTimezone from "../../../momentTimezone";
import { socket } from "../../../socket";

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
    background: "red",
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

  // console.log(user);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    setTotalNotifications(0);
    handleClickNotification();
  };
  const handleClickNotification = () => {
    // console.log("...............");
    setLoading(true);
    axios
      .get(`/shops/waitingQueue/${user.shop}`)
      .then((res) => {
        console.log(res.data.data.queue.waitingQueue);
        setList([...res.data.data.queue.waitingQueue]);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  };

  // useEffect(() => {
  //   console.log("entered");
  //   socket.on("notification", () =>
  //     setTotalNotifications(totalNotifications + 1)
  //   );
  //   return () => {
  //     console.log("exited");
  //     socket.off("notification");
  //   };
  // });

  const handleDecide = (queueId, serviceId, type, index) => {
    // console.log(index);
    axios
      .post("/queue/changeQueueStatus", {
        data: {
          type,
          queueId,
          serviceId,
          shopId: user.shop,
        },
      })
      .then((res) => {
        const newList = [...list];
        newList[index].status = type;
        console.log(newList);
        setList([...newList]);
      })
      .catch((err) => console.log(err));
  };

  const open = Boolean(anchorEl);

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div style={{ alignSelf: "center" }}>
      <div onClick={handleClick}>
        <IconButton
          aria-label="more"
          aria-controls="long-menu"
          aria-haspopup="true"
          // onClick={handleClickNotification}
        >
          <BellIcon
            totalNotifications={totalNotifications}
            setTotalNotifications={setTotalNotifications}
          />
        </IconButton>
        <p style={{ display: "inline-block" }}>{textAfterNotificationIcon}</p>
      </div>
      {loading ? (
        <Loader />
      ) : (
        <Menu
          id="long-menu"
          anchorEl={anchorEl}
          keepMounted
          open={open}
          onClose={handleClose}
          PaperProps={{
            style: {
              maxHeight: ITEM_HEIGHT * 4.5,
              width: "50ch",
            },
          }}
        >
          {" "}
          {list.length ? (
            list.map((listItem, index) => (
              <ListItem
                key={listItem.id}
                className={classes.listItem}
                style={{ display: "block" }}
              >
                <Typography variant="h5">{listItem.service.name}</Typography>
                <Typography variant="h6">
                  {" "}
                  A new Request for Ticket By {listItem.user.name}{" "}
                </Typography>
                {!listItem.status ? (
                  <div>
                    <Button
                      variant="contained"
                      className={classes.btnAccept}
                      onClick={() =>
                        handleDecide(
                          listItem.id,
                          listItem.service.id,
                          "accepted",
                          index
                        )
                      }
                    >
                      Accept
                    </Button>
                    <Button
                      variant="contained"
                      className={classes.btnReject}
                      onClick={() =>
                        handleDecide(
                          listItem.id,
                          listItem.service.id,
                          "rejected",
                          index
                        )
                      }
                    >
                      Reject
                    </Button>
                  </div>
                ) : (
                  <Typography
                    variant="caption"
                    align="right"
                    display="block"
                    style={{
                      color: listItem.status === "accepted" ? "#4caf50" : "red",
                    }}
                  >
                    {listItem.status}
                  </Typography>
                )}
                <Typography variant="caption" align="right" display="block">
                  {momentTimezone(listItem.updatedAt)}
                </Typography>
              </ListItem>
            ))
          ) : (
            <Typography variant="h6" gutterBottom align="center">
              No pending Request
            </Typography>
          )}
        </Menu>
      )}
    </div>
  );
}
