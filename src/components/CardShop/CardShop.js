import React, { useState } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import { Grid, Slide } from '@material-ui/core';
import faker from 'faker'

const useStyles = makeStyles((theme) => ({
  card: {
    width:"90%",
    marginBottom: "50px",
    height:"240px",
    transition: "all 0.5s cubic-bezier(0, 0, 0.2, 1) 0ms !important",
    pading:"10px",
    boxSizing:"border-box",
  },
  card_img: {
    width:"180px",
    height:"180px",
    padding: "10px"
  }
}));

export default function MediaControlCard() {
  const [elevation , setElevation] = useState(4)
  console.log(faker.helpers.createCard())
  const classes = useStyles();
  const theme = useTheme();

  return (
    <Slide direction="up" in="true"   mountOnEnter>
    <Card className={classes.card} elevation={elevation} onMouseOver={ () => setElevation(10) } onMouseOut={ () => setElevation(4)} >
     <Grid container >
       <Grid item xs={12} md={4} justify="center" >
         <img src={faker.image.business()} className={classes.card_img} ></img>
       </Grid>
       <Grid item xs={12} md={8} >
         <Typography variant="h4" align="center" > {faker.company.companyName()} </Typography>
       </Grid>
     </Grid>
    </Card>
    </Slide>
  );
}
