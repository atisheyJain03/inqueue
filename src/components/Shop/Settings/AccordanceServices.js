import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { Button, FormControlLabel, Grid, Switch } from "@material-ui/core";
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

export default function AccordanceServices({ services, setServices }) {
  const classes = useStyles();

  // const [showService, setShowService] = useState([...services]);

  const handleChangeSwitch = (id, status, index) => {
    // console.log(id, status);
    axios
      .patch(`/service/updateService/${id}`, {
        data: {
          isAvailable: !status,
        },
      })
      .then((res) => {
        // console.log(res);
        const newShowService = [...services];
        newShowService[index].isAvailable = !status;
        // console.log(newShowService[index]);
        setServices([...newShowService]);
      })
      .catch((err) => console.log(err));
  };

  const handleRemove = (id, index) => {
    axios
      .delete(`/service/deleteService/${id}`)
      .then((res) => {
        // console.log(res);
        const newShowService = [...services];
        newShowService.splice(index, 1);

        setServices([...newShowService]);
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
          <Typography className={classes.heading}>Services</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container>
            {services.map((service, index) => {
              return (
                <Grid container justify="space-between" key={service.id}>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="subtitle1">{service.name}</Typography>
                  </Grid>
                  <Grid item xs={6} sm={3}>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={service.isAvailable}
                          onChange={() =>
                            handleChangeSwitch(
                              service.id,
                              service.isAvailable,
                              index
                            )
                          }
                          name="gilad"
                        />
                      }
                      label={
                        service.isAvailable ? "Available" : "Not Available"
                      }
                    />
                  </Grid>
                  <Grid item xs={6} sm={3}>
                    <Button
                      variant="outlined"
                      onClick={() => handleRemove(service.id, index)}
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
