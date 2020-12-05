import {  Grid, makeStyles } from '@material-ui/core'
import React from 'react'
import CardShop from "../CardShop/CardShop"

const useStyles = makeStyles((theme) => ({
  grid_container: {
      width:"80%",
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
            <Grid container className={classes.grid_container}  justify="space-around"  >
                
            <Grid item xs={12} sm={6} lg ={4}  >
                  <CardShop />  
                  </Grid>
                  <Grid item xs={12} sm={6} lg ={4}  >
                  <CardShop />  
                  </Grid>
                  <Grid item xs={12} sm={6} lg ={4}  >
                  <CardShop />  
                  </Grid>
                  <Grid item xs={12} sm={6} lg ={4}  >
                  <CardShop />  
                  </Grid>
                  <Grid item xs={12} sm={6} lg ={4}  >
                  <CardShop />  
                  </Grid>
                  <Grid item xs={12} sm={6} lg ={4}  >
                  <CardShop />  
                  </Grid>   
            </Grid>    
        </div>
    )
}

export default Main
