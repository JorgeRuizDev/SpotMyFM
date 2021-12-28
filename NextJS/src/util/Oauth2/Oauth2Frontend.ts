import axios from "axios";
import {
  AuthTokenJWTResponse,
  RefreshTokenResponse,
} from "interfaces/oauth2Responses";
import { toast } from "react-toastify";

class Oauth2Frontend {
  private endpoint: string;
  private publicToken: string;
  private scopes: string[];
  private callbackUri: string;

  /**
   *
   * @param endpoint Endpoint, example https://accounts.spotify.com/authorize
   * @param publicToken: Public Oauth Token
   * @param scopes: list of strings that have the different scopes
   * @param callbackUri: window.location.origin + "/callback"
   */
  constructor(
    endpoint: string,
    publicToken: string,
    scopes: string[],
    callbackUri: string
  ) {
    this.endpoint = endpoint;
    this.publicToken = publicToken;
    this.scopes = scopes;
    this.callbackUri = callbackUri;
  }

  /**
   * Opens in a new window the Oauth2 Server login prompt
   */
  public promptCredentials() {
    window.location.replace(this.generateUrl());
  }

  /**
   * Get the Authorization Code Grant.
   * This function should be called inside de CALLBACK url (/login)
   *
   * @returns String with the Authorization Code Grant
   */
  private getGrantCode(): [string | null, any] {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);

    const code = urlParams.get("code");

    if (code === null) {
      return [null, "No Code Received"];
    }

    return [code, null];
  }

  /**
  * Gets the Auth Token and refresh token from the current URL

  * @param {string} apiEndpoint Safe api endpoint where to execute 
  * @returns {Promise<AuthTokenResponse | undefined>}
  */
  public async getAuthToken(
    apiEndpoint: string
  ): Promise<[AuthTokenJWTResponse | null, any]> {
    const [responseCode, err] = this.getGrantCode();

    if (err) {
      return [null, err];
    }

    try {
      const response = await axios.post(apiEndpoint, {
        responseCode,
        redirectUri: this.callbackUri,
      });

      const data = response.data;

      return [
        {
          access_token: data.access_token || "",
          expires_in: parseInt(data.expires_in) || 0,
          refresh_token: data.refresh_token,
          token_type: data.token_type,
          token: data.token,
          scope: data.scope,
        },
        null,
      ];
    } catch (e) {
      return [null, e];
    }
  }

  /**
   * Gets a new token
   * @param apiEndpoint
   * @param refreshToken
   * @returns
   */
  async refreshAuthToken(
    apiEndpoint: string,
    refreshToken: string
  ): Promise<[RefreshTokenResponse | null, any]> {
    try {
      const response = await axios.post(apiEndpoint, { refreshToken });
      const data = response.data;

      if (!data.access_token) {
        return [null, "No Access Token, response " + response.status];
      }

      return [
        {
          access_token: data.access_token,
          expires_in: data.expires_in,
        },
        null,
      ];
    } catch (e) {
      return [null, e];
    }
  }

  /**
   * Generates the URL for the Oauth2 Step 1 login.
   * @returns string with the uri
   */
  private generateUrl(): string {
    return `${this.endpoint}?client_id=${this.publicToken}&redirect_uri=${
      this.callbackUri
    }&scope=${this.scopes.join("%20")}&response_type=code&show_dialog=true`;
  }
}

export default Oauth2Frontend;
