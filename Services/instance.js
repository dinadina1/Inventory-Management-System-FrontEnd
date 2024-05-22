// import required packages
import axios from "axios";

// set base url
const baseUrl = "https://inventory-qxcd.onrender.com";
// const baseUrl = "http://localhost:3500";

// create instance object
const instance = axios.create({
  baseURL: baseUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

// create protected instance
const protectedInstance = axios.create({
  baseURL: baseUrl,
  headers: {
    "Content-Type": "application/json",
    Authorization: localStorage.getItem("authToken"),
  },
  withCredentials: true,
});

// export instances
export { instance, protectedInstance };
