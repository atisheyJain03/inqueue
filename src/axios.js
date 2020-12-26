import Axios from "axios";

const axios = Axios.create({
  baseURL: "http://localhost:8000/api/v1/",
  // timeout: 10000,
  withCredentials: true,
});

export default axios;
