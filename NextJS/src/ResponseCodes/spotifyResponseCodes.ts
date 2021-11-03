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
  SERVICE_UNAVAILABLE = 503
}

/**
 * Translates the error object to an specific object
 *
 * @param {*} e Spotify error code (catch)
 * @return {*}
 */
function parse(e: any) {
  try {
    const error = JSON.parse(e.response).error;

    // If the error is an AUTH error:
    if (error?.error_description !== undefined) {
      return {
        status: 0,
        message: error?.error?.toString() || "",
        description: error?.error_description
      };
    }

    // Normal Error:
    return {
      status: parseInt(error?.status) || 0,
      message: error?.message?.toString() || "",
      description: ""
    };
  } catch (e) {
    return {
      status: -1,
      message: "Not Found",
      description: (e as any)?.toString()
    };
  }
}

const spotifyResponseCodes = { Errors, parse };

export default spotifyResponseCodes;
