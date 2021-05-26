import { useHistory } from "react-router-dom";
import axios from "../../axios";
import Cookies from "js-cookie";

function LogoutFunction(setSnackbar) {
  (async () => {
    try {
      // await axios.get("/users/logout");
      Cookies.remove("jwt");
      // console.log("Logged out");
      let obj = {
        type: "success",
        time: Date.now(),
        message: "Logged out successfully",
      };
      setSnackbar({ ...obj });
      window.location.replace(`${window.location.origin}`);
    } catch (err) {
      // console.log(err);
    }
  })();
}

export default LogoutFunction;
