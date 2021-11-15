import axios from "axios";

/**
 * Parses an Axios Error
 * @param e
 * @returns
 */
export function parseAxiosError(e: any): { status: number; message: string } {
  if (axios.isAxiosError(e)) {
    return { status: e?.response?.status || -1, message: e.message };
  } else {
    return { status: -1, message: e };
  }
}
