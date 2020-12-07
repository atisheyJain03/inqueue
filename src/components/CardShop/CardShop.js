
import faker from 'faker'

import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Rating } from '@material-ui/lab';
import Ratings from '../ratings/Ratings';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
    // margin:'auto !important',
    marginBottom: 20,
  },
  media: {
    height: 240,
  },
  para_info: {
    height: 120,
    width:'100%',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
  },
  span_ratings : {
    transform: 'translateY(-6px)',
    display: 'inline-block',
    marginLeft: 5
  },
  heading : {
    height: 64
  }
  
});

export default function MediaCard() {
  const classes = useStyles();
  const history = useHistory();
  return (
    <Card className={classes.root} elevation={5} onClick={() => history.push(`/shops/${faker.random.number()}`)}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image="https://images.unsplash.com/photo-1490730141103-6cac27aaab94?ixid=MXwxMjA3fDB8MHxzZWFyY2h8Mnx8ZnJlZXxlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60"
        />
        <CardContent align="left" >
          <Typography gutterBottom variant="h5" component="h2" className={classes.heading}>
            {faker.company.companyName()}
          </Typography>
          <Typography gutterBottom variant="h6" component="h2">
            {faker.name.jobType()}
          </Typography>
          <Ratings rating={4} total={faker.random.number()} />
          
          <Typography variant="body2" color="textSecondary" component="p"  gutterBottom className={classes.para_info} >
           {faker.lorem.paragraphs()}
          </Typography>
         
          <Typography gutterBottom variant="overline" component="h1">
           Estimate Waiting Time - 20 min
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
