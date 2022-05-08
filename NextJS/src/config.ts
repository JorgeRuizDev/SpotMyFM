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
      drop_user: "api/database/user/drop",
    },
    lastFM: {
      bulk_tags: "api/lastFM/getBulkAlbumTags",
      base_url: "https://ws.audioscrobbler.com/2.0/",
    },
    spotify: {
      auth: "api/spotify/oauth2/auth",
      refresh: "api/spotify/oauth2/refresh",
    },

    // Python Ludwig Server
    ludwig: {
      track_file: "ludwig/track/file",
      track_single: "ludwig/track",
      track_bulk: "ludwig/track/bulk",

      recommender: "ludwig/recommender",
    },

    // NextJS Ludwig Endpoints
    ludwig_mir: {
      track_file: "api/ludwig/track/file",
      track_single: "api/ludwig/track",
      track_bulk: "api/ludwig/track/bulk",

      recommender: "api/ludwig/recommender",
    },
  },

  //
  playlist_track_view_max_track_count: 600,

  dynamo: {
    album_prefix: "ALBM",
    PK: "PK",
  },
};

export default config;
