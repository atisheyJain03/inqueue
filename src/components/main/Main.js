import {  Grid, makeStyles } from '@material-ui/core'
import React from 'react'
import CardShop from "../CardShop/CardShop"

const useStyles = makeStyles((theme) => ({
  grid_container: {
      width:"95%",
      margin:"auto"
  },
  root:{
      marginTop:"50px"
  }
  }));

function Main() {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <Grid container className={classes.grid_container}  >
                <Grid item sm={12} md ={3}  >
                    <p>grid 1</p>
                </Grid>
                <Grid item sm={12} md ={9}  >
                  <CardShop />  
                  <CardShop />
                  <CardShop />
                  <CardShop />
                  <CardShop />  
                </Grid>
            </Grid>    
        </div>
    )
}

export default Main
