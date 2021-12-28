const env = {
  SPOTIFY_PUBLIC: process.env.NEXT_PUBLIC_SPOTIFY_ID || "",
  SPOTIFY_SECRET: process.env.SPOTIFY_SECRET || "",

  JWT_SIGN_KEY: process.env.JWT_SIGN_KEY || "",

  AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID_ || "",
  AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY_ || "",
  AWS_REGION: process.env.AWS_REGION_ || "",

  DYNAMOSE_USER_TABLE: process.env.DYNAMOOSE_USER_TABLE || "",

  LASTFM_KEY: process.env.NEXT_PUBLIC_LAST_KEY || "",
};

export const envtest = {
  SPOTIFY_REFRESH_TOKEN: process.env.TEST_SPOTIFY_REFRESH || "",
  SPOTIFY_REFRESH_ENDPOINT:
    "http://dev.spotmyfm.jorgeruizdev.com/api/spotify/oauth2/refresh",
};

export default env;
