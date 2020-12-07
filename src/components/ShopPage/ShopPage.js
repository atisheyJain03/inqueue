import { Button, Grid, makeStyles, Typography } from '@material-ui/core'
import React from 'react'
import faker from 'faker'
import { Rating } from '@material-ui/lab';
import Ratings from '../ratings/Ratings';

const useStyle = makeStyles((theme) => ({
    main_div: {
        width: '80%',
        margin: 'auto',
        marginTop:10
    },
    shopPage__img : {
        width: '100%',
        height: '35vh',
        objectFit: 'cover'
    },
    heading__div: {
        display: 'block',
        marginRight: 'auto'
    },
    heading__rating: {
        display: 'inline-block',
    },
    open_time: {
        marginTop: '-0.5rem'
    },
    waiting__time: {
        marginTop: '1rem',
        "& h2" : {
            lineHeight: 1.5,
            fontSize: '0.9rem'
        }
    },
    contact: {
        marginTop: '2rem',
       
        [theme.breakpoints.up('sm')] : {
            borderRight: '2px solid black',
        },
        "& h2" : {
            fontSize: '0.9rem',
            lineHeight: 1.5,
        }
    },
    info: {
        marginTop: '1.5rem',
        [theme.breakpoints.up('sm')] : {
            padding: '0 1.5rem'
        }
    }
}))


function ShopPage() {
    const classes = useStyle();
    console.log(faker.date.between())
    return (
        <div className={classes.main_div} align="left">
            <Grid container >
                <Grid item xs={12}  >
                <img src="https://www.w3schools.com/css/img_5terre_wide.jpg"  className={classes.shopPage__img}/>
                </Grid>
                <Grid item xs={12}  lg ={9}  >
                   <Grid container style={{ marginTop: '1rem' }} >
                       <Grid item xs={12} sm={9} >
                           <div  className={classes.heading__div} align="left">
                           <Typography  variant="h4" component="h2" className={classes.heading}>
                                {faker.company.companyName()}
                            </Typography>
                            <Typography gutterBottom variant="h6" component="h2">
                                {faker.name.jobType()}
                            </Typography>
                           </div>
                       </Grid>
                       <Grid item sm={3} xs={12} >
                       <Ratings rating={4} total={faker.random.number()} />
                       </Grid>
                   </Grid>
                   <Grid container justify="space-between" >
                       <Grid item sm={4} xs={12} >
                           <div className={classes.contact}>
                           <Typography  variant="overline" component="h2" style={{fontSize:'0.9rem' , fontWeight:'700' , marginBottom : '0.6rem'}} >
                                contact
                            </Typography>
                            <Typography  variant="overline" component="h2">
                               1798 sector-13 Urban Estate
                            </Typography>
                            <Typography  variant="overline" component="h2">
                               karnal - 13200
                            </Typography>
                            <Typography  variant="overline" component="h2">
                              Haryana
                            </Typography>
                            <div style={{marginTop : '0.5rem' }}>
                            <Typography  variant="overline" component="h2">
                              tel : {faker.phone.phoneNumber()}
                            </Typography>
                            </div>
                           </div>
                       </Grid>
                       <Grid item sm={8} xs={12} >
                           <div className={classes.info} >
                           <Typography  variant="overline" component="h2" style={{fontSize:'0.9rem' , fontWeight:'700' , marginBottom : '0.6rem' , lineHeight:'1.5'}} >
                                info
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p"  gutterBottom className={classes.para_info} align="justify" >
                                    {faker.lorem.paragraphs()}
                            </Typography>
                           </div>
                       </Grid>
                   </Grid>
                </Grid>
                <Grid item xs={12}  lg ={3}  >
                  <Grid container>
                      <Grid item xs={12}> 
                            <div align="left">
                            <Typography  variant="overline" component="h1" style={{fontWeight:'700'}}>
                                OPEN TODAY
                            </Typography>
                            <Typography  variant="h5" gutterBottom component="h2" className={classes.open_time}>
                                09:00 - 13:00
                            </Typography>
                            <Typography  variant="h5" component="h2" className={classes.open_time}>
                                14:00 - 18:00
                            </Typography>
                            </div>
                    </Grid>
                    <Grid item xs={12} >
                        <div className={classes.waiting__time}>
                            <Typography  variant="overline" component="h2">
                                Estimate waiting time - 20 min
                            </Typography>
                            <Typography  variant="overline" component="h2">
                               Current number - 10
                            </Typography>
                            <Typography  variant="overline" component="h2">
                               Total numbers - 14
                            </Typography>
                        </div>
                        <div style={{ marginTop: '2rem'}}>
                            <Button variant="contained" fullWidth size="large" > generate a ticket </Button>
                        </div>
                    </Grid>
                </Grid>
             </Grid>
            </Grid>
        </div>
    )
}

export default ShopPage
