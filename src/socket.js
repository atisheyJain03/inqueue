import { io } from "socket.io-client";

// baseURL: "http://localhost:8000/api/v1/",
//  baseURL: "https://immense-headland-27496.herokuapp.com/api/v1/",
// export const socket = io.connect("http://localhost:8000");
export const socket = io.connect(
  "https://immense-headland-27496.herokuapp.com"
);
