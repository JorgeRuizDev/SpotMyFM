const config = {
  // Cookie Names
  cookie_spotify_auth: "SPOTIFY_AUTH",
  cookie_spotify_refresh: "SPOTIFY_REFRESH",
  cookie_jwt: "JWT",

  // Static NextAPI endpoints
  api_spotify_auth: "api/spotify/oauth2/auth",
  api_spotify_refresh: "api/spotify/oauth2/refresh",
  last_bulk_tags: "api/lastFM/getBulkAlbumTags",

  api_endpoints: {
    database: {
      get_album_tags: "api/database/albums/tagAlbums",
      post_album_tags: "api/database/albums/tagAlbums",
    },
    lastFM: {
      bulk_tags: "api/lastFM/getBulkAlbumTags",
      base_url: "https://ws.audioscrobbler.com/2.0/",
    },
    spotify: {
      auth: "api/spotify/oauth2/auth",
      refresh: "api/spotify/oauth2/refresh",
    },
  },

  //
  playlist_track_view_max_track_count: 200,

  dynamo: {
    album_prefix: "ALBM",
    PK: "PK",
  },
};

export default config;
