import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import ConfirmationNumberTwoToneIcon from "@material-ui/icons/ConfirmationNumberTwoTone";
import PermIdentityTwoToneIcon from "@material-ui/icons/PermIdentityTwoTone";
import SettingsTwoToneIcon from "@material-ui/icons/SettingsTwoTone";
import MeetingRoomTwoToneIcon from "@material-ui/icons/MeetingRoomTwoTone";
import LogoutFunction from "./Logout";
import MenuRoundedIcon from "@material-ui/icons/MenuRounded";
import { IconButton } from "@material-ui/core";

const useStyles = makeStyles({
  list: {
    width: 250,
    maxWidth: "90vw",
  },
  fullList: {
    width: "auto",
  },
  menuIcon: {
    color: "black",
    padding: "10px",
    background: "lightgray",
    borderRadius: "50%",
  },
});

export default function DrawerNew({ setSelected, setSnackbar }) {
  const classes = useStyles();
  const [state, setState] = React.useState(false);

  const listOnClick = (text) => {
    if (text === "") return;
    if (text === "Logout") {
      LogoutFunction(setSnackbar);
    } else setSelected(text);
  };

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState(open);
  };

  const list = () => (
    <div
      className={classes.list}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        {["My Tickets", "User Info", "Settings", "Logout"].map(
          (text, index) => (
            <ListItem button key={text} onClick={() => listOnClick(text)}>
              <ListItemIcon>
                {text === "My Tickets" && <ConfirmationNumberTwoToneIcon />}
                {text === "User Info" && <PermIdentityTwoToneIcon />}
                {text === "Settings" && <SettingsTwoToneIcon />}
                {text === "Logout" && <MeetingRoomTwoToneIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          )
        )}
      </List>
    </div>
  );

  return (
    <div>
      <IconButton onClick={toggleDrawer(true)}>
        <MenuRoundedIcon className={classes.menuIcon} />
      </IconButton>
      <Drawer open={state} onClose={toggleDrawer(false)}>
        {list()}
      </Drawer>
    </div>
  );
}
