import { Button } from "@material-ui/core";
import React, { useState } from "react";
import axios from "../../axios";
import Loader from "../Loader/Loader";

// THIS IS BUTTON FOR GENERATING TICKET
// THIS WILL MAKE A REQUEST TO SERVER WHICH WILL GET PLACE IN QUEUE FOR GIVEN SERVICE WITH THE LOGGED IN USER
function ButtonShopPage({ serviceId, setQueueInfo, setSnackbar, shopId }) {
  const [isLoading, setIsLoading] = useState(false);
  // console.log(shopId);
  const clickHandler = (event) => {
    event.preventDefault();
    setIsLoading(true);
    (async () => {
      try {
        const ticket = await axios.post("/queue/createQueue", {
          data: {
            serviceId,
            shopId,
          },
        });
        // console.log(ticket.data.data.queue);
        setIsLoading(false);
        const obj = {
          type: "success",
          message: `Request For Ticket has been Sent `,
          time: Date.now(),
        };
        setSnackbar({ ...obj });
      } catch (error) {
        setIsLoading(false);
        let obj = {
          type: "error",
          time: Date.now(),
        };
        if (
          error.response &&
          error.response.data &&
          error.response.data.message
        ) {
          obj.message = error.response.data.message;
        } else {
          obj.message = "Something went wrong Please Reload";
        }
        setSnackbar({ ...obj });
      }
    })();
  };

  return (
    <div>
      <div style={{ marginBottom: "40px", marginTop: "-10px" }}>
        {isLoading ? <Loader /> : null}
      </div>

      <Button variant="contained" fullWidth size="large" onClick={clickHandler}>
        {" "}
        generate a ticket{" "}
      </Button>
    </div>
  );
}

export default ButtonShopPage;
