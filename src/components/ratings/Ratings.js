import { makeStyles, Typography } from '@material-ui/core'
import { Rating } from '@material-ui/lab'
import React from 'react'


const useStyles = makeStyles({
    span_ratings : {
        transform: 'translateY(-6px)',
        display: 'inline-block',
        marginLeft: 5
      }
    })

function Ratings({rating,total}) {
    const classes = useStyles()
    return (
        <div>
             <Typography gutterBottom variant="h6" component="h2">
                <Rating name="half-rating" value={rating || 0} precision={0.5} readOnly/>
                <span className={classes.span_ratings}>({total} Ratings)</span>
            </Typography>
        </div>
    )
}

export default Ratings
