import { RestError } from "./../../interfaces/RestClient";
import axios from "axios";

/**
 * Parses an Axios Error
 * @param e
 * @returns
 */
export function parseAxiosError(e: any): RestError {
  console.error(e);
  if (axios.isAxiosError(e)) {
    return { status: e?.response?.status || -1, message: e.message };
  } else if (!!e.status) {
    console.error(e?.response);
    return { status: e.status, message: e?.response || e?.responseText };
  } else {
    return { status: 0, message: e };
  }
}
