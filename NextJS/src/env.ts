const env = {
  SPOTIFY_PUBLIC: process.env.NEXT_PUBLIC_SPOTIFY_ID || "",
  SPOTIFY_SECRET: process.env.SPOTIFY_SECRET || "",

  AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID || "",
  AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY || "",
  AWS_REGION: process.env.AWS_REGION || "",

  DYNAMOSE_USER_TABLE: process.env.DYNAMOOSE_USER_TABLE || "",

  LASTFM_KEY: process.env.NEXT_PUBLIC_LAST_KEY || "",
};

export default env;
