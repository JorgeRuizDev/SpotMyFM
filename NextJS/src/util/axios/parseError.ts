import { RestError } from "./../../interfaces/RestClient";
import axios from "axios";

/**
 * Parses an Axios Error
 * @param e
 * @returns
 */
export function parseAxiosError(e: any): RestError {
  try {
    if (axios.isAxiosError(e)) {
      return {
        status: e?.response?.status || -1,
        message: e.response?.data?.error || e.message,
      };
    } else if (!!e.status) {
      return { status: e.status, message: e?.response || e?.responseText };
    } else {
      return { status: 0, message: e };
    }  
  }catch(e){
    return {status: 0, message: "There was an error while parsing the error"}
  }

}
