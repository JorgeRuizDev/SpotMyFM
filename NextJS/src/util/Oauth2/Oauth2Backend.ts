import axios from "util/axios";
import qs from "query-string";
import b64 from "base-64";
import {
  AuthTokenJWTResponse,
  RefreshTokenJWTResponse,
} from "interfaces/oauth2Responses";

class Oauth2Backend {
  private privateToken: string;
  private publicToken: string;

  /**
   * Class Constructor that saves the current api credentials
   * @param privateToken Spotify private secret api token/key
   * @param publicToken Spotify public api token/key
   */
  constructor(privateToken: string, publicToken: string) {
    if (!privateToken || privateToken.length == 0) {
      throw "Empty Private Token";
    }

    if (!publicToken || publicToken.length == 0) {
      throw "Empty Public Token";
    }

    this.privateToken = privateToken;
    this.publicToken = publicToken;
  }

  /**
   *
   * @param grantCode Spotify Grant Code (url response)
   * @param endpoint Current Oauth Api Endpoint to ask fore the token
   * @param redirect_uri Current configured project uri
   * @param grantType Grant type data, defaults to "authorization_code"
   * @returns a AuthTokenJWTResponse or a null with an error as a second parameter.
   */
  public async authUser(
    grantCode: string,
    endpoint: string,
    redirect_uri: string,
    grantType = "authorization_code"
  ): Promise<[AuthTokenJWTResponse | null, any]> {
    const postData = {
      grant_type: grantType,
      code: grantCode,
      redirect_uri,
    };

    const config = this.header();

    try {
      const response = await axios.post(
        endpoint,
        qs.stringify(postData),
        config
      );

      const data = response.data;

      return [
        {
          access_token: data.access_token || "",
          expires_in: parseInt(data.expires_in) || 0,
          refresh_token: data.refresh_token,
          token_type: data.token_type,
          scope: data.scope,
          token: data.token,
        },
        null,
      ];
    } catch (e) {
      return [null, e];
    }
  }

  /**
   * Returns a new auth token from a refresh token
   * @param endpoint Api Endpoint to fetch the new Auth Token
   * @param refreshToken Current refresh Token
   * @returns A RefreshTokenJWTResponse or a null with an error
   */
  public async refreshToken(
    endpoint: string,
    refreshToken: string
  ): Promise<[RefreshTokenJWTResponse | null, any]> {
    const postData = {
      grant_type: "refresh_token",
      refresh_token: refreshToken,
    };

    const config = this.header();

    try {
      const response = await axios.post(
        endpoint,
        qs.stringify(postData),
        config
      );
      const data = response.data;

      return [
        {
          access_token: data.access_token,
          expires_in: data.expires_in,
          token: data.token,
        },
        null,
      ];
    } catch (e) {
      return [null, e];
    }
  }

  /**
   * Config builder
   * @returns a new config with the required header.
   */
  private header() {
    const auth = `Basic ${b64.encode(
      this.publicToken + ":" + this.privateToken
    )}`;

    return {
      headers: {
        Authorization: auth,
        "Content-Type": "application/x-www-form-urlencoded",
      },
    };
  }
}

export default Oauth2Backend;
