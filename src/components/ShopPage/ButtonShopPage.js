import { Button } from '@material-ui/core'
import React, { useState } from 'react'
import axios from '../../axios';
import Loader from '../Loader/Loader';


// THIS IS BUTTON FOR GENERATING TICKET
// THIS WILL MAKE A REQUEST TO SERVER WHICH WILL GET PLACE IN QUEUE FOR GIVEN SERVICE WITH THE LOGGED IN USER
function ButtonShopPage({serviceId , setQueueInfo}) {
    const [isLoading,setIsLoading] = useState(false)
    
    const clickHandler = (event) => {
        event.preventDefault();
        setIsLoading(true);
        ( async () => {
            try{
            const ticket = await axios.post('/queue/createQueue', {
                data: {
                    serviceId
                }
            })
            console.log(ticket.data.data.queue)
            setIsLoading(false);
            // setQueueInfo( ticket.data.data.queue )
        } catch (err) {
            setIsLoading(false);
            console.log(err);
            alert("error")
        }
        }
            
        )();
    }
    
    return (
        <div>
            <div style={{marginBottom: "40px" , marginTop: "-10px"}}>
            {isLoading ? <Loader /> : null}    
            </div>
            
             <Button variant="contained" fullWidth size="large" onClick={ clickHandler }> generate a ticket </Button>
        </div>
    )
}

export default ButtonShopPage
