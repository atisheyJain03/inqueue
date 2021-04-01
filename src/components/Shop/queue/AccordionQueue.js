import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { Button, Grid } from "@material-ui/core";
import momentTimezone from "../../../momentTimezone";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    "& .MuiGrid-container": {
      marginBottom: "1.5rem",
      textAlign: "start",
    },
  },
  heading: {
    fontSize: "1.2rem",
    fontWeight: 600,
  },
  container: {
    textAlign: "start",
    marginBottom: "20px",
  },
  grid_left: {
    fontSize: "1rem",
    fontWeight: "600",
    letterSpacing: 1,
    borderRight: "1px solid #c0c0c0",
  },
}));

export default function AccordionQueue({ ticket }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.heading}>
            {ticket.user ? ticket.user.name : ticket.userName}
            <span style={{ color: "#c0c0c0" }}> | </span>
            {ticket.number}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container alignContent="center" style={{ marginBottom: "0px" }}>
            <Grid container justify="space-between">
              <Grid item xs={3} className={classes.grid_left}>
                Number
              </Grid>
              <Grid item xs={8}>
                {ticket.number}
              </Grid>
            </Grid>
            <Grid container justify="space-between">
              <Grid item xs={3} className={classes.grid_left}>
                User Name
              </Grid>
              <Grid item xs={8} className={classes.grid_left}>
                {ticket.user ? ticket.user.name : ticket.userName}
              </Grid>
            </Grid>

            <Grid container justify="space-between">
              <Grid item xs={3} className={classes.grid_left}>
                User Email
              </Grid>
              <Grid item xs={8}>
                {ticket.user && ticket.user.email}
              </Grid>
            </Grid>

            <Grid container justify="space-between">
              <Grid item xs={3} className={classes.grid_left}>
                Description
              </Grid>
              <Grid item xs={8}>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Voluptas temporibus perspiciatis ipsa quibusdam odio iure
                  eaque ea? Distinctio illum debitis porro obcaecati repellat
                  eaque amet architecto cupiditate sed numquam sit, ducimus
                  commodi molestias aliquid a voluptatum quam quia? Quae debitis
                  ad labore ex cum facilis inventore fugit sit. Deleniti, magnam
                  a. Totam ea laboriosam veritatis non ipsum exercitationem
                  perspiciatis ullam!
                </p>
              </Grid>
            </Grid>
            <Grid container>
              <Grid item xs={12}>
                <Button variant="contained"> Cancel Ticket </Button>
              </Grid>
            </Grid>
            <Grid container>
              <Grid item xs={12}>
                <Typography variant="caption" align="right" display="block">
                  {momentTimezone(ticket.updatedAt)}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
