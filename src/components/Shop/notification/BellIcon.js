import React, { useEffect } from "react";
import Badge from "@material-ui/core/Badge";
import { withStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import NotificationsActiveTwoToneIcon from "@material-ui/icons/NotificationsActiveTwoTone";
import { socket } from "../../../socket";

const StyledBadge = withStyles((theme) => ({
  badge: {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
    background: "#333",
  },
}))(Badge);
var x = 0;
export default function BellIcon({
  totalNotifications,
  setTotalNotifications,
}) {
  useEffect(() => {
    console.log("entered");
    socket.on("notification", () =>
      setTotalNotifications(totalNotifications + 1)
    );
    return () => {
      console.log("exited");
      socket.off("notification");
    };
  });

  return (
    // <IconButton aria-label="bell">
    <StyledBadge badgeContent={totalNotifications} color="secondary">
      <NotificationsActiveTwoToneIcon />
    </StyledBadge>
    // </IconButton>
  );
}
