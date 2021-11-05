import b64 from "base-64";

class Oauth2Backend {
  private privateToken: string;
  private publicToken: string;

  constructor(privateToken: string, publicToken: string) {
    this.privateToken = privateToken;
    this.publicToken = publicToken;
  }

  public authUser(
    grantCode: string,
    endpoint: string,
    redirect_uri: string,
    granType = "authorization_code"
  ) {
    const auth = `Basic ${b64.encode(
      this.publicToken + ":" + this.privateToken
    )}`;

    const postData = {
      grant_type: granType,
      code: grantCode,
      redirect_uri,
    };

    const config = {
      headers: {
        Authorization: auth,
        "Content-Type": "application/x-www-form-urlencoded",
      },
    };
  }
}

export default Oauth2Backend;
