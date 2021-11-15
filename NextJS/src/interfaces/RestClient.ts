import { AxiosError } from "axios";


export type RestError = [code: number, message: string]

export interface IRestClient {
  /**
   * Parses an HTTP Error
   */
  parse: (e: any) =>  RestError;
}
