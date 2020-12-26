import { Grid, Typography } from "@material-ui/core";
import React, { useState } from "react";
import Drawer2 from "./DrawerCustom";
import DrawerCustom from "./DrawerCustom";
import DrawerNew from "./DrawerNew";
import MyTickets from "./My Tickets/MyTickets";
import Settings from "./Settings";
import UserInfo from "./UserInfo/UserInfo";

function User({ setSnackbar }) {
  const [selected, setSelected] = useState("My Tickets");
  return (
    <div>
      <div>
        <Grid container>
          <Grid item xs={2} sm={2}>
            <DrawerNew setSelected={setSelected} setSnackbar={setSnackbar} />
          </Grid>
          <Grid item xs={12} sm={12}>
            <Typography variant="h2">{selected}</Typography>
          </Grid>
        </Grid>

        {selected === "My Tickets" && <MyTickets />}
        {selected === "Settings" && <Settings />}
        {selected === "User Info" && <UserInfo setSnackbar={setSnackbar} />}
      </div>
    </div>
  );
}

export default User;
