import Axios from "axios";
import Cookies from "js-cookie";
// console.log(Cookies.get());
const axios = Axios.create({
  // baseURL: "http://localhost:8000/api/v1/",
  baseURL: "https://immense-headland-27496.herokuapp.com/api/v1/",
  // timeout: 10000,
  // withCredentials: true,
  headers: {
    cks: Cookies.get("jwt"),
  },
});

export default axios;
