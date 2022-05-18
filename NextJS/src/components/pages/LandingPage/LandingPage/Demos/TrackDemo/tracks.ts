import { shuffle } from "lodash";

const trackBeat = {
  spotifyId: "1ITQbrueGLl581a25XXm9c",
  spotifyUri: "spotify:track:1ITQbrueGLl581a25XXm9c",
  spotifyAlbumId: "1klALx0u4AavZNEvC4LrTL",
  name: "Rocky Raccoon - Remastered 2009",
  spotifyArtistsIds: ["3WrFJ7ztbogyGnTHbHJFl2"],
  spotifyDurationMS: 213106,
  spotifyIsExplicit: false,
  spotifyIsPlayable: false,
  spotifyPreviewURL:
    "https://p.scdn.co/mp3-preview/d6a95247f513a0401906fa00ccae69a924dc912e?cid=7c4c757477e2485ea783355e72a900af",
  spotifyTrackAlbumPos: 13,
  spotifyDiscNumber: 1,
  spotifyUrl: "https://open.spotify.com/track/1ITQbrueGLl581a25XXm9c",
  album: {
    spotifyId: "1klALx0u4AavZNEvC4LrTL",
    name: "The Beatles (Remastered)",
    spotifyCoverUrl: [
      "https://i.scdn.co/image/ab67616d0000b2734ce8b4e42588bf18182a1ad2",
      "https://i.scdn.co/image/ab67616d00001e024ce8b4e42588bf18182a1ad2",
      "https://i.scdn.co/image/ab67616d000048514ce8b4e42588bf18182a1ad2",
    ],
    spotifyUrl: "https://open.spotify.com/album/1klALx0u4AavZNEvC4LrTL",
    spotifyReleaseDate: new Date(-34995600000),
    spotifyArtistsIds: ["3WrFJ7ztbogyGnTHbHJFl2"],
    spotifyPopularity: 75,
    spotifyGenres: [],
    spotifyUri: "spotify:album:1klALx0u4AavZNEvC4LrTL",
    lastfmTagsFull: [
      {
        name: "rock",
        url: "https://www.last.fm/tag/rock",
      },
      {
        name: "pop",
        url: "https://www.last.fm/tag/pop",
      },
      {
        name: "Psychedelic Rock",
        url: "https://www.last.fm/tag/Psychedelic+Rock",
      },
      {
        name: "1960s",
        url: "https://www.last.fm/tag/1960s",
      },
      {
        name: "1968",
        url: "https://www.last.fm/tag/1968",
      },
      {
        name: "60s",
        url: "https://www.last.fm/tag/60s",
      },
      {
        name: "pop rock",
        url: "https://www.last.fm/tag/pop+rock",
      },
      {
        name: "psychedelic",
        url: "https://www.last.fm/tag/psychedelic",
      },
      {
        name: "classic rock",
        url: "https://www.last.fm/tag/classic+rock",
      },
      {
        name: "british",
        url: "https://www.last.fm/tag/british",
      },
      {
        name: "experimental",
        url: "https://www.last.fm/tag/experimental",
      },
      {
        name: "hard rock",
        url: "https://www.last.fm/tag/hard+rock",
      },
    ],
    lastfmTagsNames: [
      "rock",
      "pop",
      "Psychedelic Rock",
      "1960s",
      "1968",
      "60s",
      "pop rock",
      "psychedelic",
      "classic rock",
      "british",
      "experimental",
      "hard rock",
    ],
    artists: [
      {
        name: "The Beatles",
        spotifyId: "3WrFJ7ztbogyGnTHbHJFl2",
        spotifyUri: "spotify:artist:3WrFJ7ztbogyGnTHbHJFl2",
        spotifyUrl: "https://open.spotify.com/artist/3WrFJ7ztbogyGnTHbHJFl2",
        spotifyGenres: [
          "beatlesque",
          "british invasion",
          "classic rock",
          "merseybeat",
          "psychedelic rock",
          "rock",
        ],
        spotifyPopularity: 89,
        spotifyImgs: [
          "https://i.scdn.co/image/ab6761610000e5ebe9348cc01ff5d55971b22433",
          "https://i.scdn.co/image/ab67616100005174e9348cc01ff5d55971b22433",
          "https://i.scdn.co/image/ab6761610000f178e9348cc01ff5d55971b22433",
        ],
        id: 311,
      },
    ],
    id: 700,
  },
  artists: [
    {
      name: "The Beatles",
      spotifyId: "3WrFJ7ztbogyGnTHbHJFl2",
      spotifyUri: "spotify:artist:3WrFJ7ztbogyGnTHbHJFl2",
      spotifyUrl: "https://open.spotify.com/artist/3WrFJ7ztbogyGnTHbHJFl2",
      spotifyGenres: [
        "beatlesque",
        "british invasion",
        "classic rock",
        "merseybeat",
        "psychedelic rock",
        "rock",
      ],
      spotifyPopularity: 89,
      spotifyImgs: [
        "https://i.scdn.co/image/ab6761610000e5ebe9348cc01ff5d55971b22433",
        "https://i.scdn.co/image/ab67616100005174e9348cc01ff5d55971b22433",
        "https://i.scdn.co/image/ab6761610000f178e9348cc01ff5d55971b22433",
      ],
      id: 311,
    },
  ],
  id: 836,
};

const trackMine = {
  spotifyId: "4NsPgRYUdHu2Q5JRNgXYU5",
  spotifyUri: "spotify:track:4NsPgRYUdHu2Q5JRNgXYU5",
  spotifyAlbumId: "3Gt7rOjcZQoHCfnKl5AkK7",
  name: "Sweden",
  spotifyArtistsIds: ["4uFZsG1vXrPcvnZ4iSQyrx"],
  spotifyDurationMS: 215500,
  spotifyIsExplicit: false,
  spotifyIsPlayable: false,
  spotifyPreviewURL:
    "https://p.scdn.co/mp3-preview/735edffafa9238c13afb421581374438065f85da?cid=7c4c757477e2485ea783355e72a900af",
  spotifyTrackAlbumPos: 18,
  spotifyDiscNumber: 1,
  spotifyUrl: "https://open.spotify.com/track/4NsPgRYUdHu2Q5JRNgXYU5",
  album: {
    spotifyId: "3Gt7rOjcZQoHCfnKl5AkK7",
    name: "Minecraft - Volume Alpha",
    spotifyCoverUrl: [
      "https://i.scdn.co/image/ab67616d0000b273aaeb5c9fb6131977995b7f0e",
      "https://i.scdn.co/image/ab67616d00001e02aaeb5c9fb6131977995b7f0e",
      "https://i.scdn.co/image/ab67616d00004851aaeb5c9fb6131977995b7f0e",
    ],
    spotifyUrl: "https://open.spotify.com/album/3Gt7rOjcZQoHCfnKl5AkK7",
    spotifyReleaseDate: new Date(1299193200000),
    spotifyArtistsIds: ["4uFZsG1vXrPcvnZ4iSQyrx"],
    spotifyPopularity: 72,
    spotifyGenres: [],
    spotifyUri: "spotify:album:3Gt7rOjcZQoHCfnKl5AkK7",
    lastfmTagsFull: [
      {
        name: "ambient",
        url: "https://www.last.fm/tag/ambient",
      },
      {
        name: "Soundtrack",
        url: "https://www.last.fm/tag/Soundtrack",
      },
      {
        name: "electronic",
        url: "https://www.last.fm/tag/electronic",
      },
      {
        name: "2011",
        url: "https://www.last.fm/tag/2011",
      },
      {
        name: "minecraft",
        url: "https://www.last.fm/tag/minecraft",
      },
      {
        name: "chillout",
        url: "https://www.last.fm/tag/chillout",
      },
      {
        name: "video game music",
        url: "https://www.last.fm/tag/video+game+music",
      },
      {
        name: "10s",
        url: "https://www.last.fm/tag/10s",
      },
      {
        name: "Impressionism",
        url: "https://www.last.fm/tag/Impressionism",
      },
      {
        name: "electronica",
        url: "https://www.last.fm/tag/electronica",
      },
      {
        name: "indie",
        url: "https://www.last.fm/tag/indie",
      },
      {
        name: "chill",
        url: "https://www.last.fm/tag/chill",
      },
    ],
    lastfmTagsNames: [
      "ambient",
      "Soundtrack",
      "electronic",
      "2011",
      "minecraft",
      "chillout",
      "video game music",
      "10s",
      "Impressionism",
      "electronica",
      "indie",
      "chill",
    ],
    artists: [
      {
        name: "C418",
        spotifyId: "4uFZsG1vXrPcvnZ4iSQyrx",
        spotifyUri: "spotify:artist:4uFZsG1vXrPcvnZ4iSQyrx",
        spotifyUrl: "https://open.spotify.com/artist/4uFZsG1vXrPcvnZ4iSQyrx",
        spotifyGenres: ["dream smp", "minecraft"],
        spotifyPopularity: 72,
        spotifyImgs: [
          "https://i.scdn.co/image/ab6761610000e5eba9b8234e3071836212561d19",
          "https://i.scdn.co/image/ab67616100005174a9b8234e3071836212561d19",
          "https://i.scdn.co/image/ab6761610000f178a9b8234e3071836212561d19",
        ],
        id: 23,
      },
    ],
    id: 33,
  },
  artists: [
    {
      name: "C418",
      spotifyId: "4uFZsG1vXrPcvnZ4iSQyrx",
      spotifyUri: "spotify:artist:4uFZsG1vXrPcvnZ4iSQyrx",
      spotifyUrl: "https://open.spotify.com/artist/4uFZsG1vXrPcvnZ4iSQyrx",
      spotifyGenres: ["dream smp", "minecraft"],
      spotifyPopularity: 72,
      spotifyImgs: [
        "https://i.scdn.co/image/ab6761610000e5eba9b8234e3071836212561d19",
        "https://i.scdn.co/image/ab67616100005174a9b8234e3071836212561d19",
        "https://i.scdn.co/image/ab6761610000f178a9b8234e3071836212561d19",
      ],
      id: 23,
    },
  ],
  id: 24,
};

const trackBowie = {
  spotifyId: "4F1V29ygbAKbKCQDgt4z9f",
  spotifyUri: "spotify:track:4F1V29ygbAKbKCQDgt4z9f",
  spotifyAlbumId: "4I5zzKYd2SKDgZ9DRf5LVk",
  name: "The Secret Life of Arabia - 2017 Remaster",
  spotifyArtistsIds: ["0oSGxfWSnnOXhD2fKuz2Gy"],
  spotifyDurationMS: 226906,
  spotifyIsExplicit: false,
  spotifyIsPlayable: false,
  spotifyPreviewURL:
    "https://p.scdn.co/mp3-preview/948622450498521e43fcbb42975db194d818fb8c?cid=7c4c757477e2485ea783355e72a900af",
  spotifyTrackAlbumPos: 10,
  spotifyDiscNumber: 1,
  spotifyUrl: "https://open.spotify.com/track/4F1V29ygbAKbKCQDgt4z9f",
  album: {
    spotifyId: "4I5zzKYd2SKDgZ9DRf5LVk",
    name: '"Heroes" (2017 Remaster)',
    spotifyCoverUrl: [
      "https://i.scdn.co/image/ab67616d0000b273bc1c63a5b66ab9ac3ea21672",
      "https://i.scdn.co/image/ab67616d00001e02bc1c63a5b66ab9ac3ea21672",
      "https://i.scdn.co/image/ab67616d00004851bc1c63a5b66ab9ac3ea21672",
    ],
    spotifyUrl: "https://open.spotify.com/album/4I5zzKYd2SKDgZ9DRf5LVk",
    spotifyReleaseDate: new Date(220921200000),
    spotifyArtistsIds: ["0oSGxfWSnnOXhD2fKuz2Gy"],
    spotifyPopularity: 66,
    spotifyGenres: [],
    spotifyUri: "spotify:album:4I5zzKYd2SKDgZ9DRf5LVk",
    lastfmTagsFull: [
      {
        name: "electronic",
        url: "https://www.last.fm/tag/electronic",
      },
      {
        name: "70s",
        url: "https://www.last.fm/tag/70s",
      },
      {
        name: "ambient",
        url: "https://www.last.fm/tag/ambient",
      },
      {
        name: "art rock",
        url: "https://www.last.fm/tag/art+rock",
      },
      {
        name: "1977",
        url: "https://www.last.fm/tag/1977",
      },
      {
        name: "art pop",
        url: "https://www.last.fm/tag/art+pop",
      },
    ],
    lastfmTagsNames: [
      "electronic",
      "70s",
      "ambient",
      "art rock",
      "1977",
      "art pop",
    ],
    artists: [
      {
        name: "David Bowie",
        spotifyId: "0oSGxfWSnnOXhD2fKuz2Gy",
        spotifyUri: "spotify:artist:0oSGxfWSnnOXhD2fKuz2Gy",
        spotifyUrl: "https://open.spotify.com/artist/0oSGxfWSnnOXhD2fKuz2Gy",
        spotifyGenres: [
          "art rock",
          "classic rock",
          "glam rock",
          "permanent wave",
          "rock",
        ],
        spotifyPopularity: 82,
        spotifyImgs: [
          "https://i.scdn.co/image/ab6761610000e5eb0db3b11972a84207f256769b",
          "https://i.scdn.co/image/ab676161000051740db3b11972a84207f256769b",
          "https://i.scdn.co/image/ab6761610000f1780db3b11972a84207f256769b",
        ],
        id: 50,
      },
    ],
    id: 13,
  },
  artists: [
    {
      name: "David Bowie",
      spotifyId: "0oSGxfWSnnOXhD2fKuz2Gy",
      spotifyUri: "spotify:artist:0oSGxfWSnnOXhD2fKuz2Gy",
      spotifyUrl: "https://open.spotify.com/artist/0oSGxfWSnnOXhD2fKuz2Gy",
      spotifyGenres: [
        "art rock",
        "classic rock",
        "glam rock",
        "permanent wave",
        "rock",
      ],
      spotifyPopularity: 82,
      spotifyImgs: [
        "https://i.scdn.co/image/ab6761610000e5eb0db3b11972a84207f256769b",
        "https://i.scdn.co/image/ab676161000051740db3b11972a84207f256769b",
        "https://i.scdn.co/image/ab6761610000f1780db3b11972a84207f256769b",
      ],
      id: 50,
    },
  ],
  id: 1037,
};

const trackCash = {
  spotifyId: "3I1vEQhGwRK7URrTq4BqNl",
  spotifyUri: "spotify:track:3I1vEQhGwRK7URrTq4BqNl",
  spotifyAlbumId: "5LWsHgqyGqhd6HNBYLb6W7",
  name: "(Ghost) Riders in the Sky",
  spotifyArtistsIds: ["6kACVPfCOnqzgfEF5ryl0x"],
  spotifyDurationMS: 224813,
  spotifyIsExplicit: false,
  spotifyIsPlayable: false,
  spotifyPreviewURL:
    "https://p.scdn.co/mp3-preview/0363b42ac19771443fd880a40181051e15760476?cid=7c4c757477e2485ea783355e72a900af",
  spotifyTrackAlbumPos: 5,
  spotifyDiscNumber: 1,
  spotifyUrl: "https://open.spotify.com/track/3I1vEQhGwRK7URrTq4BqNl",
  album: {
    spotifyId: "5LWsHgqyGqhd6HNBYLb6W7",
    name: "Silver",
    spotifyCoverUrl: [
      "https://i.scdn.co/image/ab67616d0000b27379d1be381026d9bbd0de591b",
      "https://i.scdn.co/image/ab67616d00001e0279d1be381026d9bbd0de591b",
      "https://i.scdn.co/image/ab67616d0000485179d1be381026d9bbd0de591b",
    ],
    spotifyUrl: "https://open.spotify.com/album/5LWsHgqyGqhd6HNBYLb6W7",
    spotifyReleaseDate: new Date(294357600000),
    spotifyArtistsIds: ["6kACVPfCOnqzgfEF5ryl0x"],
    spotifyPopularity: 55,
    spotifyGenres: [],
    spotifyUri: "spotify:album:5LWsHgqyGqhd6HNBYLb6W7",
    lastfmTagsFull: [
      {
        name: "vinyl",
        url: "https://www.last.fm/tag/vinyl",
      },
      {
        name: "dads vinyl",
        url: "https://www.last.fm/tag/dads+vinyl",
      },
    ],
    lastfmTagsNames: ["vinyl", "dads vinyl"],
    artists: [
      {
        name: "Johnny Cash",
        spotifyId: "6kACVPfCOnqzgfEF5ryl0x",
        spotifyUri: "spotify:artist:6kACVPfCOnqzgfEF5ryl0x",
        spotifyUrl: "https://open.spotify.com/artist/6kACVPfCOnqzgfEF5ryl0x",
        spotifyGenres: ["arkansas country", "outlaw country"],
        spotifyPopularity: 80,
        spotifyImgs: [
          "https://i.scdn.co/image/ab6761610000e5eb152cf48cf9541c7061570857",
          "https://i.scdn.co/image/ab67616100005174152cf48cf9541c7061570857",
          "https://i.scdn.co/image/ab6761610000f178152cf48cf9541c7061570857",
        ],
        id: 323,
      },
    ],
    id: 442,
  },
  artists: [
    {
      name: "Johnny Cash",
      spotifyId: "6kACVPfCOnqzgfEF5ryl0x",
      spotifyUri: "spotify:artist:6kACVPfCOnqzgfEF5ryl0x",
      spotifyUrl: "https://open.spotify.com/artist/6kACVPfCOnqzgfEF5ryl0x",
      spotifyGenres: ["arkansas country", "outlaw country"],
      spotifyPopularity: 80,
      spotifyImgs: [
        "https://i.scdn.co/image/ab6761610000e5eb152cf48cf9541c7061570857",
        "https://i.scdn.co/image/ab67616100005174152cf48cf9541c7061570857",
        "https://i.scdn.co/image/ab6761610000f178152cf48cf9541c7061570857",
      ],
      id: 323,
    },
  ],
  id: 419,
};

const trackFleet = {
  spotifyId: "07GvNcU1WdyZJq3XxP0kZa",
  spotifyUri: "spotify:track:07GvNcU1WdyZJq3XxP0kZa",
  spotifyAlbumId: "1bt6q2SruMsBtcerNVtpZB",
  name: "Go Your Own Way - 2004 Remaster",
  spotifyArtistsIds: ["08GQAI4eElDnROBrJRGE0X"],
  spotifyDurationMS: 223613,
  spotifyIsExplicit: false,
  spotifyIsPlayable: false,
  spotifyPreviewURL:
    "https://p.scdn.co/mp3-preview/b4b050fb5f906aba4e08064c453d3344ea68e583?cid=7c4c757477e2485ea783355e72a900af",
  spotifyTrackAlbumPos: 5,
  spotifyDiscNumber: 1,
  spotifyUrl: "https://open.spotify.com/track/07GvNcU1WdyZJq3XxP0kZa",
  album: {
    spotifyId: "1bt6q2SruMsBtcerNVtpZB",
    name: "Rumours",
    spotifyCoverUrl: [
      "https://i.scdn.co/image/ab67616d0000b2730001af4f80be77069fc8fd41",
      "https://i.scdn.co/image/ab67616d00001e020001af4f80be77069fc8fd41",
      "https://i.scdn.co/image/ab67616d000048510001af4f80be77069fc8fd41",
    ],
    spotifyUrl: "https://open.spotify.com/album/1bt6q2SruMsBtcerNVtpZB",
    spotifyReleaseDate: new Date(223858800000),
    spotifyArtistsIds: ["08GQAI4eElDnROBrJRGE0X"],
    spotifyPopularity: 72,
    spotifyGenres: [],
    spotifyUri: "spotify:album:1bt6q2SruMsBtcerNVtpZB",
    lastfmTagsFull: [
      {
        name: "classic rock",
        url: "https://www.last.fm/tag/classic+rock",
      },
      {
        name: "70s",
        url: "https://www.last.fm/tag/70s",
      },
      {
        name: "rock",
        url: "https://www.last.fm/tag/rock",
      },
      {
        name: "albums I own",
        url: "https://www.last.fm/tag/albums+I+own",
      },
      {
        name: "1977",
        url: "https://www.last.fm/tag/1977",
      },
      {
        name: "Fleetwood Mac",
        url: "https://www.last.fm/tag/Fleetwood+Mac",
      },
      {
        name: "soft rock",
        url: "https://www.last.fm/tag/soft+rock",
      },
      {
        name: "favourite albums",
        url: "https://www.last.fm/tag/favourite+albums",
      },
      {
        name: "pop",
        url: "https://www.last.fm/tag/pop",
      },
      {
        name: "pop rock",
        url: "https://www.last.fm/tag/pop+rock",
      },
      {
        name: "favorite albums",
        url: "https://www.last.fm/tag/favorite+albums",
      },
      {
        name: "1001 Albums You Must Hear Before You Die",
        url: "https://www.last.fm/tag/1001+Albums+You+Must+Hear+Before+You+Die",
      },
    ],
    lastfmTagsNames: [
      "classic rock",
      "70s",
      "rock",
      "albums I own",
      "1977",
      "Fleetwood Mac",
      "soft rock",
      "favourite albums",
      "pop",
      "pop rock",
      "favorite albums",
      "1001 Albums You Must Hear Before You Die",
    ],
    artists: [
      {
        name: "Fleetwood Mac",
        spotifyId: "08GQAI4eElDnROBrJRGE0X",
        spotifyUri: "spotify:artist:08GQAI4eElDnROBrJRGE0X",
        spotifyUrl: "https://open.spotify.com/artist/08GQAI4eElDnROBrJRGE0X",
        spotifyGenres: [
          "album rock",
          "classic rock",
          "mellow gold",
          "rock",
          "soft rock",
          "yacht rock",
        ],
        spotifyPopularity: 85,
        spotifyImgs: [
          "https://i.scdn.co/image/ab6761610000e5eb249d55f2d68a44637905c57e",
          "https://i.scdn.co/image/ab67616100005174249d55f2d68a44637905c57e",
          "https://i.scdn.co/image/ab6761610000f178249d55f2d68a44637905c57e",
        ],
        id: 370,
      },
    ],
    id: 506,
  },
  artists: [
    {
      name: "Fleetwood Mac",
      spotifyId: "08GQAI4eElDnROBrJRGE0X",
      spotifyUri: "spotify:artist:08GQAI4eElDnROBrJRGE0X",
      spotifyUrl: "https://open.spotify.com/artist/08GQAI4eElDnROBrJRGE0X",
      spotifyGenres: [
        "album rock",
        "classic rock",
        "mellow gold",
        "rock",
        "soft rock",
        "yacht rock",
      ],
      spotifyPopularity: 85,
      spotifyImgs: [
        "https://i.scdn.co/image/ab6761610000e5eb249d55f2d68a44637905c57e",
        "https://i.scdn.co/image/ab67616100005174249d55f2d68a44637905c57e",
        "https://i.scdn.co/image/ab6761610000f178249d55f2d68a44637905c57e",
      ],
      id: 370,
    },
  ],
  id: 528,
};

const trackMich = {
  spotifyId: "5ChkMS8OtdzJeqyybCc9R5",
  spotifyUri: "spotify:track:5ChkMS8OtdzJeqyybCc9R5",
  spotifyAlbumId: "1C2h7mLntPSeVYciMRTF4a",
  name: "Billie Jean",
  spotifyArtistsIds: ["3fMbdgg4jU18AjLCKBhRSm"],
  spotifyDurationMS: 293826,
  spotifyIsExplicit: false,
  spotifyIsPlayable: false,
  spotifyPreviewURL:
    "https://p.scdn.co/mp3-preview/f504e6b8e037771318656394f532dede4f9bcaea?cid=7c4c757477e2485ea783355e72a900af",
  spotifyTrackAlbumPos: 6,
  spotifyDiscNumber: 1,
  spotifyUrl: "https://open.spotify.com/track/5ChkMS8OtdzJeqyybCc9R5",
  album: {
    spotifyId: "1C2h7mLntPSeVYciMRTF4a",
    name: "Thriller 25 Super Deluxe Edition",
    spotifyCoverUrl: [
      "https://i.scdn.co/image/ab67616d0000b2734121faee8df82c526cbab2be",
      "https://i.scdn.co/image/ab67616d00001e024121faee8df82c526cbab2be",
      "https://i.scdn.co/image/ab67616d000048514121faee8df82c526cbab2be",
    ],
    spotifyUrl: "https://open.spotify.com/album/1C2h7mLntPSeVYciMRTF4a",
    spotifyReleaseDate: new Date(407458800000),
    spotifyArtistsIds: ["3fMbdgg4jU18AjLCKBhRSm"],
    spotifyPopularity: 80,
    spotifyGenres: [],
    spotifyUri: "spotify:album:1C2h7mLntPSeVYciMRTF4a",
    lastfmTagsFull: [
      {
        name: "pop",
        url: "https://www.last.fm/tag/pop",
      },
      {
        name: "80s",
        url: "https://www.last.fm/tag/80s",
      },
      {
        name: "soul",
        url: "https://www.last.fm/tag/soul",
      },
      {
        name: "albums I own",
        url: "https://www.last.fm/tag/albums+I+own",
      },
      {
        name: "funk",
        url: "https://www.last.fm/tag/funk",
      },
      {
        name: "old school",
        url: "https://www.last.fm/tag/old+school",
      },
      {
        name: "michael jackson",
        url: "https://www.last.fm/tag/michael+jackson",
      },
      {
        name: "king of pop",
        url: "https://www.last.fm/tag/king+of+pop",
      },
      {
        name: "dance",
        url: "https://www.last.fm/tag/dance",
      },
      {
        name: "r&b",
        url: "https://www.last.fm/tag/r&b",
      },
      {
        name: "male vocalists",
        url: "https://www.last.fm/tag/male+vocalists",
      },
      {
        name: "d",
        url: "https://www.last.fm/tag/d",
      },
    ],
    lastfmTagsNames: [
      "pop",
      "80s",
      "soul",
      "albums I own",
      "funk",
      "old school",
      "michael jackson",
      "king of pop",
      "dance",
      "r&b",
      "male vocalists",
      "d",
    ],
    artists: [
      {
        name: "Michael Jackson",
        spotifyId: "3fMbdgg4jU18AjLCKBhRSm",
        spotifyUri: "spotify:artist:3fMbdgg4jU18AjLCKBhRSm",
        spotifyUrl: "https://open.spotify.com/artist/3fMbdgg4jU18AjLCKBhRSm",
        spotifyGenres: ["pop", "r&b", "soul"],
        spotifyPopularity: 86,
        spotifyImgs: [
          "https://i.scdn.co/image/ab6761610000e5eba2a0b9e3448c1e702de9dc90",
          "https://i.scdn.co/image/ab67616100005174a2a0b9e3448c1e702de9dc90",
          "https://i.scdn.co/image/ab6761610000f178a2a0b9e3448c1e702de9dc90",
        ],
        id: 596,
      },
    ],
    id: 929,
  },
  artists: [
    {
      name: "Michael Jackson",
      spotifyId: "3fMbdgg4jU18AjLCKBhRSm",
      spotifyUri: "spotify:artist:3fMbdgg4jU18AjLCKBhRSm",
      spotifyUrl: "https://open.spotify.com/artist/3fMbdgg4jU18AjLCKBhRSm",
      spotifyGenres: ["pop", "r&b", "soul"],
      spotifyPopularity: 86,
      spotifyImgs: [
        "https://i.scdn.co/image/ab6761610000e5eba2a0b9e3448c1e702de9dc90",
        "https://i.scdn.co/image/ab67616100005174a2a0b9e3448c1e702de9dc90",
        "https://i.scdn.co/image/ab6761610000f178a2a0b9e3448c1e702de9dc90",
      ],
      id: 596,
    },
  ],
  id: 1814,
};

const trackPearl = {
  spotifyId: "5Xak5fmy089t0FYmh3VJiY",
  spotifyUri: "spotify:track:5Xak5fmy089t0FYmh3VJiY",
  spotifyAlbumId: "5B4PYA7wNN4WdEXdIJu58a",
  name: "Black",
  spotifyArtistsIds: ["1w5Kfo2jwwIPruYS2UWh56"],
  spotifyDurationMS: 342653,
  spotifyIsExplicit: false,
  spotifyIsPlayable: false,
  spotifyPreviewURL:
    "https://p.scdn.co/mp3-preview/c6773a34d5fae11fb1c2b85b9c5efdac2aa693ec?cid=7c4c757477e2485ea783355e72a900af",
  spotifyTrackAlbumPos: 5,
  spotifyDiscNumber: 1,
  spotifyUrl: "https://open.spotify.com/track/5Xak5fmy089t0FYmh3VJiY",
  album: {
    spotifyId: "5B4PYA7wNN4WdEXdIJu58a",
    name: "Ten",
    spotifyCoverUrl: [
      "https://i.scdn.co/image/ab67616d0000b273d400d27cba05bb0545533864",
      "https://i.scdn.co/image/ab67616d00001e02d400d27cba05bb0545533864",
      "https://i.scdn.co/image/ab67616d00004851d400d27cba05bb0545533864",
    ],
    spotifyUrl: "https://open.spotify.com/album/5B4PYA7wNN4WdEXdIJu58a",
    spotifyReleaseDate: new Date(683244000000),
    spotifyArtistsIds: ["1w5Kfo2jwwIPruYS2UWh56"],
    spotifyPopularity: 76,
    spotifyGenres: [],
    spotifyUri: "spotify:album:5B4PYA7wNN4WdEXdIJu58a",
    lastfmTagsFull: [
      {
        name: "Grunge",
        url: "https://www.last.fm/tag/Grunge",
      },
      {
        name: "albums I own",
        url: "https://www.last.fm/tag/albums+I+own",
      },
      {
        name: "rock",
        url: "https://www.last.fm/tag/rock",
      },
      {
        name: "alternative rock",
        url: "https://www.last.fm/tag/alternative+rock",
      },
      {
        name: "90s",
        url: "https://www.last.fm/tag/90s",
      },
      {
        name: "favorite albums",
        url: "https://www.last.fm/tag/favorite+albums",
      },
      {
        name: "1991",
        url: "https://www.last.fm/tag/1991",
      },
      {
        name: "alternative",
        url: "https://www.last.fm/tag/alternative",
      },
      {
        name: "pearl jam",
        url: "https://www.last.fm/tag/pearl+jam",
      },
      {
        name: "favourite albums",
        url: "https://www.last.fm/tag/favourite+albums",
      },
      {
        name: "hard rock",
        url: "https://www.last.fm/tag/hard+rock",
      },
      {
        name: "seattle",
        url: "https://www.last.fm/tag/seattle",
      },
    ],
    lastfmTagsNames: [
      "Grunge",
      "albums I own",
      "rock",
      "alternative rock",
      "90s",
      "favorite albums",
      "1991",
      "alternative",
      "pearl jam",
      "favourite albums",
      "hard rock",
      "seattle",
    ],
    artists: [
      {
        name: "Pearl Jam",
        spotifyId: "1w5Kfo2jwwIPruYS2UWh56",
        spotifyUri: "spotify:artist:1w5Kfo2jwwIPruYS2UWh56",
        spotifyUrl: "https://open.spotify.com/artist/1w5Kfo2jwwIPruYS2UWh56",
        spotifyGenres: ["alternative rock", "grunge", "permanent wave", "rock"],
        spotifyPopularity: 80,
        spotifyImgs: [
          "https://i.scdn.co/image/ab6761610000e5eb122d1145d880736383742ebc",
          "https://i.scdn.co/image/ab67616100005174122d1145d880736383742ebc",
          "https://i.scdn.co/image/ab6761610000f178122d1145d880736383742ebc",
        ],
        id: 102,
      },
    ],
    id: 175,
  },
  artists: [
    {
      name: "Pearl Jam",
      spotifyId: "1w5Kfo2jwwIPruYS2UWh56",
      spotifyUri: "spotify:artist:1w5Kfo2jwwIPruYS2UWh56",
      spotifyUrl: "https://open.spotify.com/artist/1w5Kfo2jwwIPruYS2UWh56",
      spotifyGenres: ["alternative rock", "grunge", "permanent wave", "rock"],
      spotifyPopularity: 80,
      spotifyImgs: [
        "https://i.scdn.co/image/ab6761610000e5eb122d1145d880736383742ebc",
        "https://i.scdn.co/image/ab67616100005174122d1145d880736383742ebc",
        "https://i.scdn.co/image/ab6761610000f178122d1145d880736383742ebc",
      ],
      id: 102,
    },
  ],
  id: 1405,
};

const trackDaft = {
  spotifyId: "2LD2gT7gwAurzdQDQtILds",
  spotifyUri: "spotify:track:2LD2gT7gwAurzdQDQtILds",
  spotifyAlbumId: "2noRn2Aes5aoNVsU6iWThc",
  name: "Veridis Quo",
  spotifyArtistsIds: ["4tZwfgrHOc3mvqYlEYSvVi"],
  spotifyDurationMS: 345186,
  spotifyIsExplicit: false,
  spotifyIsPlayable: false,
  spotifyPreviewURL:
    "https://p.scdn.co/mp3-preview/aca5701db1bec743d36215c7a8b4fc5a43699b77?cid=7c4c757477e2485ea783355e72a900af",
  spotifyTrackAlbumPos: 11,
  spotifyDiscNumber: 1,
  spotifyUrl: "https://open.spotify.com/track/2LD2gT7gwAurzdQDQtILds",
  album: {
    spotifyId: "2noRn2Aes5aoNVsU6iWThc",
    name: "Discovery",
    spotifyCoverUrl: [
      "https://i.scdn.co/image/ab67616d0000b273b33d46dfa2635a47eebf63b2",
      "https://i.scdn.co/image/ab67616d00001e02b33d46dfa2635a47eebf63b2",
      "https://i.scdn.co/image/ab67616d00004851b33d46dfa2635a47eebf63b2",
    ],
    spotifyUrl: "https://open.spotify.com/album/2noRn2Aes5aoNVsU6iWThc",
    spotifyReleaseDate: new Date(984351600000),
    spotifyArtistsIds: ["4tZwfgrHOc3mvqYlEYSvVi"],
    spotifyPopularity: 76,
    spotifyGenres: [],
    spotifyUri: "spotify:album:2noRn2Aes5aoNVsU6iWThc",
    lastfmTagsFull: [
      {
        name: "electronic",
        url: "https://www.last.fm/tag/electronic",
      },
      {
        name: "House",
        url: "https://www.last.fm/tag/House",
      },
      {
        name: "albums I own",
        url: "https://www.last.fm/tag/albums+I+own",
      },
      {
        name: "dance",
        url: "https://www.last.fm/tag/dance",
      },
      {
        name: "electronica",
        url: "https://www.last.fm/tag/electronica",
      },
      {
        name: "2001",
        url: "https://www.last.fm/tag/2001",
      },
      {
        name: "french",
        url: "https://www.last.fm/tag/french",
      },
      {
        name: "favourite albums",
        url: "https://www.last.fm/tag/favourite+albums",
      },
      {
        name: "Daft Punk",
        url: "https://www.last.fm/tag/Daft+Punk",
      },
      {
        name: "french house",
        url: "https://www.last.fm/tag/french+house",
      },
      {
        name: "techno",
        url: "https://www.last.fm/tag/techno",
      },
      {
        name: "favorite albums",
        url: "https://www.last.fm/tag/favorite+albums",
      },
    ],
    lastfmTagsNames: [
      "electronic",
      "House",
      "albums I own",
      "dance",
      "electronica",
      "2001",
      "french",
      "favourite albums",
      "Daft Punk",
      "french house",
      "techno",
      "favorite albums",
    ],
    artists: [
      {
        name: "Daft Punk",
        spotifyId: "4tZwfgrHOc3mvqYlEYSvVi",
        spotifyUri: "spotify:artist:4tZwfgrHOc3mvqYlEYSvVi",
        spotifyUrl: "https://open.spotify.com/artist/4tZwfgrHOc3mvqYlEYSvVi",
        spotifyGenres: ["electro", "filter house"],
        spotifyPopularity: 84,
        spotifyImgs: [
          "https://i.scdn.co/image/ab6761610000e5ebca77d763703a93930c363a39",
          "https://i.scdn.co/image/ab67616100005174ca77d763703a93930c363a39",
          "https://i.scdn.co/image/ab6761610000f178ca77d763703a93930c363a39",
        ],
        id: 79,
      },
    ],
    id: 87,
  },
  artists: [
    {
      name: "Daft Punk",
      spotifyId: "4tZwfgrHOc3mvqYlEYSvVi",
      spotifyUri: "spotify:artist:4tZwfgrHOc3mvqYlEYSvVi",
      spotifyUrl: "https://open.spotify.com/artist/4tZwfgrHOc3mvqYlEYSvVi",
      spotifyGenres: ["electro", "filter house"],
      spotifyPopularity: 84,
      spotifyImgs: [
        "https://i.scdn.co/image/ab6761610000e5ebca77d763703a93930c363a39",
        "https://i.scdn.co/image/ab67616100005174ca77d763703a93930c363a39",
        "https://i.scdn.co/image/ab6761610000f178ca77d763703a93930c363a39",
      ],
      id: 79,
    },
  ],
  id: 385,
};

// @ts-ignore
const demoTracks: Track[] = shuffle([
  trackBeat,
  trackBowie,
  trackCash,
  trackDaft,
  trackMich,
  trackMine,
  trackPearl,
  trackFleet,
]);

export default demoTracks;
