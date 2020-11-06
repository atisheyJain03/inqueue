import { Grid } from '@material-ui/core'
import React from 'react'

function Main() {
    return (
        <div>
            <Grid container >
                <Grid item sm={12} md ={3} >
                    <p>grid 1</p>
                </Grid>
                <Grid item sm={12} md ={6}  >
                <p>grid 1</p>
                </Grid>
                <Grid item sm={12} md ={3}  >
                <p>grid 1</p>
                </Grid>
            </Grid>    
        </div>
    )
}

export default Main
