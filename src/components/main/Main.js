import {  Grid, makeStyles } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import axios from '../../axios';
import CardShop from "../CardShop/CardShop"

const useStyles = makeStyles((theme) => ({
  grid_container: {
      width:"85%",
      margin:"auto"
  },
  root:{
      marginTop:"50px"
  }
  }));
  

  

function Main() {
    const classes = useStyles();
    const [shops, setShops] = useState([])
    useEffect(() => {
       
      (
          async ()=> {
              try{
                  const shopRes = await axios.get('/shops/getShops');
                  setShops([...shopRes.data.data.shops])
                  
              } catch (err) {
                  console.log(err)
                  alert(err.message);
              }
          }
      )();
      console.log("..");
    },[])
    console.log(shops)
    return (
        <div className={classes.root}>
            <Grid container className={classes.grid_container}  justify="space-around"  >
             {
                 shops.map(el=> {
                     return(
                        <Grid item xs={12} sm={6} lg ={4} key = {el._id}  >
                            <CardShop  
                                image= {el.imageCover}
                                name = {el.name}
                                jobType = {el.shopType }
                                description = {el.description}
                                totalRatings = {el.ratingsQuantity}
                                id= {el._id}
                                ratingsAverage = {el.ratingsAverage}
                            />  
                        </Grid>
                     )
                 })
             }   
           
           
            </Grid>    
        </div>
    )
}

export default Main
