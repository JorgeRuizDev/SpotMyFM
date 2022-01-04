import { RestError } from "./../../interfaces/RestClient";
import axios from "axios";

/**
 * Parses an Axios Error
 * @param e
 * @returns
 */
export function parseAxiosError(e: any): RestError {
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
}
