import React, { useEffect, useState } from 'react'
import AccordionCustom from './Accordance/AccordionCustom'

import { makeStyles } from '@material-ui/core/styles';
import axios from '../../../axios';
import Axios from 'axios';


const useStyles = makeStyles((theme) => ({
    root: {
      width: '80%',
      margin: 'auto',
      marginTop: '20px'
    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
      fontWeight: theme.typography.fontWeightRegular,
    },
    
  }));


function MyTickets() {
    const classes = useStyles()
    
    const [tickets,setTickets] = useState([]);
    useEffect(() => {
      // THIS IS CANCEL TOKEN IN CASE IF COMPONENT UNMOUNT BEFORE GETTING RESPONSE FROM SERVER
      const source = Axios.CancelToken.source();
        
      // IIFE FOR ASYNC REQUEST
     (
         async ()=> {
             try{
                 const getTickets = await axios.get('/users/getQueue',{
                     cancelToken: source.token
                 });
                 console.log(getTickets.data.data.queue)
                 setTickets(getTickets.data.data.queue)
                 
             } catch (err){
               if(err == 'Cancel') alert('Cancel Ticket')
                console.log(err)
                 alert(err);
             }
         }
     )();
     return () => {
       source.cancel();
     } 
   }, [])
    
    return (
        <div className={classes.root} >
          {
            tickets.map(ticket => {
              return(
                <div style={{marginBottom: '10px'}}>
                <AccordionCustom key={ticket.id}  ticket={ticket} />
                </div>
              )
            })
          }
           
        </div>
    )
}

export default MyTickets
