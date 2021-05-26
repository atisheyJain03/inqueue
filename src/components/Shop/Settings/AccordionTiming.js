import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { Button, Grid } from "@material-ui/core";
import axios from "../../../axios";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));

export default function AccordionTiming({ time, setTime, shopId }) {
  const classes = useStyles();

  const handleRemove = (id, index) => {
    const newTime = [...time];
    newTime.splice(index, 1);

    axios
      .patch(`/shops/updateShop/${shopId}`, {
        data: {
          openingHours: newTime,
        },
      })
      .then((res) => {
        // console.log(res);
        setTime([...newTime]);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className={classes.root}>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.heading}>Opening Time</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container>
            {time.map((time, index) => {
              console.log(time);
              return (
                <Grid container key={index} justify="space-between">
                  <Grid item xs={4} key={index}>
                    <Typography variant="subtitle1">
                      {" "}
                      {time.open} - {time.close}{" "}
                    </Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Button
                      variant="outlined"
                      onClick={() => handleRemove(index)}
                    >
                      remove
                    </Button>
                  </Grid>
                </Grid>
              );
            })}
          </Grid>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
