import axios from "axios";
import env from "env";

const instance = axios.create({
  baseURL: env.API_BASE_URL,
});

export default instance;
