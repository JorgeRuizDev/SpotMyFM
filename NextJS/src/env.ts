const env = {
  SPOTIFY_PUBLIC: process.env.NEXT_PUBLIC_SPOTIFY_ID || "",
  SPOTIFY_SECRET: process.env.SPOTIFY_SECRET || "",
};

console.log(env);

export default env;
