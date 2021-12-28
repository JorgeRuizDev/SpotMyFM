const config = {
  // Cookie Names
  cookie_spotify_auth: "SPOTIFY_AUTH",
  cookie_spotify_refresh: "SPOTIFY_REFRESH",
  cookie_jwt: "JWT",

  // Static NextAPI endpoints
  api_spotify_auth: "api/spotify/oauth2/auth",
  api_spotify_refresh: "api/spotify/oauth2/refresh",
  last_bulk_tags: "api/lastFM/getBulkAlbumTags"
};

export default config;
