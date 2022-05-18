const env = {
  SPOTIFY_PUBLIC: process.env.NEXT_PUBLIC_SPOTIFY_ID || "",
  SPOTIFY_SECRET: process.env.SPOTIFY_SECRET || "",

  JWT_SIGN_KEY: process.env.JWT_SIGN_KEY || "",

  AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID_ || "",
  AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY_ || "",
  AWS_REGION: process.env.AWS_REGION_ || "",

  DYNAMOSE_USER_TABLE: process.env.DYNAMOOSE_USER_TABLE || "TEST_TABLE",
  DYNAMOOSE_TRACK_TABLE: process.env.DYNAMOOSE_TRACK_TABLE || "TEST_TABLE",

  LASTFM_KEY: process.env.NEXT_PUBLIC_LAST_KEY || "",

  API_BASE_URL: process.env.API_BASE_URL || "/",

  LUDWIG_BASE_URL: process.env.NEXT_PUBLIC_LUDWIG_URL || "",
  LUDWIG_SECRET: process.env.LUDWIG_SECRET || "",
};

export const envtest = {
  SPOTIFY_REFRESH_TOKEN: process.env.TEST_SPOTIFY_REFRESH || "",
  SPOTIFY_REFRESH_ENDPOINT: `${
    process.env.TEST_BASE_URL || "https://dev.spotmyfm.jorgeruizdev.com"
  }api/spotify/oauth2/refresh`,
  TEST_BASE_URL: process.env.TEST_BASE_URL,
};

export default env;
