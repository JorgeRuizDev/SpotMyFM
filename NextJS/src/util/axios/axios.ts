import axios from "axios";
import env from "env";

const instance = axios.create({
  baseURL: "/",
});

export default instance;
