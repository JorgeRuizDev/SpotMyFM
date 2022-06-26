import { AxiosError } from "axios";
import { parseAxiosError } from "util/axios/parseError";

enum Errors {
  AUTH = 0,
  OK = 200,
  CREATED = 201,
  ACCEPTED = 202,
  NO_CONTENT = 204,
  NOT_MODIFIED = 304,
  BAD_REQ = 400,
  UNAUTH = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  TOO_MANY_REQUEST = 429,
  INTERNAL_SERVER_ERROR = 500,
  BAD_GATEWAY = 502,
  SERVICE_UNAVAILABLE = 503,
}

/**
 * Translates the error object to an specific object
 *
 * @param {*} e Spotify error code (catch)
 * @return {*}
 */
function parse(e: any) {
  const error = parseAxiosError(e);
  return error;
}

const spotifyResponseCodes = { Errors, parse };

export default spotifyResponseCodes;
