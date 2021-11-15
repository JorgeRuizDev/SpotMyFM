import { AxiosError } from "axios";

export type RestError = { status: number; message: string };

export interface IRestClient {
  /**
   * Parses an HTTP Error
   */
  parse: (e: any) => RestError;
}
