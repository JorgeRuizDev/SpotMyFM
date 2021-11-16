import { AxiosError } from "axios";

export type RestError = { status: number; message: string } | null;

export interface IRestClient {
  /**
   * Parses an HTTP Error
   */
  parse: (e: any) => RestError;
}
