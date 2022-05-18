import { shuffle } from "lodash";
import { Album } from "models/Album";

const albumMantle = {
  spotifyId: "7hOOJDRbH3we1P0iT2z1Hg",
  name: "The Mantle",
  spotifyCoverUrl: [
    "https://i.scdn.co/image/ab67616d0000b273ac5a3d24a0d86ac8d838bd47",
    "https://i.scdn.co/image/ab67616d00001e02ac5a3d24a0d86ac8d838bd47",
    "https://i.scdn.co/image/ab67616d00004851ac5a3d24a0d86ac8d838bd47"
  ],
  spotifyUrl: "https://open.spotify.com/album/7hOOJDRbH3we1P0iT2z1Hg",
  spotifyReleaseDate: new Date(1009839600000),
  spotifyArtistsIds: ["3Meu28o8P5z9Zjm6NTGihT"],
  spotifyPopularity: 39,
  spotifyGenres: [],
  spotifyUri: "spotify:album:7hOOJDRbH3we1P0iT2z1Hg",
  lastfmTagsFull: [
    {
      name: "folk metal",
      url: "https://www.last.fm/tag/folk+metal"
    },
    {
      name: "doom metal",
      url: "https://www.last.fm/tag/doom+metal"
    },
    {
      name: "black metal",
      url: "https://www.last.fm/tag/black+metal"
    },
    {
      name: "2002",
      url: "https://www.last.fm/tag/2002"
    },
    {
      name: "albums I own",
      url: "https://www.last.fm/tag/albums+I+own"
    },
    {
      name: "Progressive metal",
      url: "https://www.last.fm/tag/Progressive+metal"
    },
    {
      name: "favourite albums",
      url: "https://www.last.fm/tag/favourite+albums"
    },
    {
      name: "favorite albums",
      url: "https://www.last.fm/tag/favorite+albums"
    },
    {
      name: "misanthropic gay romance nostalgia metal",
      url: "https://www.last.fm/tag/misanthropic+gay+romance+nostalgia+metal"
    },
    {
      name: "melodic diarrhea metal",
      url: "https://www.last.fm/tag/melodic+diarrhea+metal"
    },
    {
      name: "vomit-inducing homoerotic black metal",
      url: "https://www.last.fm/tag/vomit-inducing+homoerotic+black+metal"
    },
    {
      name:
        "progressive neo-erotic frottage metal influenced by pictures of gay elks having buttsecks in the snow",
      url:
        "https://www.last.fm/tag/progressive+neo-erotic+frottage+metal+influenced+by+pictures+of+gay+elks+having+buttsecks+in+the+snow"
    }
  ],
  lastfmTagsNames: [
    "folk metal",
    "doom metal",
    "black metal",
    "2002",
    "albums I own",
    "Progressive metal",
    "favourite albums",
    "favorite albums",
    "misanthropic gay romance nostalgia metal",
    "melodic diarrhea metal",
    "vomit-inducing homoerotic black metal",
    "progressive neo-erotic frottage metal influenced by pictures of gay elks having buttsecks in the snow"
  ],
  artists: [
    {
      name: "Agalloch",
      spotifyId: "3Meu28o8P5z9Zjm6NTGihT",
      spotifyUri: "spotify:artist:3Meu28o8P5z9Zjm6NTGihT",
      spotifyUrl: "https://open.spotify.com/artist/3Meu28o8P5z9Zjm6NTGihT",
      spotifyGenres: [
        "atmospheric black metal",
        "atmospheric doom",
        "black metal",
        "blackgaze",
        "cascadian black metal",
        "doom metal",
        "metal",
        "pagan black metal",
        "portland metal",
        "post-metal",
        "usbm",
        "voidgaze"
      ],
      spotifyPopularity: 44,
      spotifyImgs: [
        "https://i.scdn.co/image/ab6761610000e5ebea06e6637a861aba6cba7e58",
        "https://i.scdn.co/image/ab67616100005174ea06e6637a861aba6cba7e58",
        "https://i.scdn.co/image/ab6761610000f178ea06e6637a861aba6cba7e58"
      ],
      id: 27
    }
  ],
  id: 37
};

const albumDynamo = {
  spotifyId: "4bfwXuecOmNVlPM5RStAiQ",
  name: "Dynamo (Remastered)",
  spotifyCoverUrl: [
    "https://i.scdn.co/image/ab67616d0000b273b755f1b1b4410d404fe21167",
    "https://i.scdn.co/image/ab67616d00001e02b755f1b1b4410d404fe21167",
    "https://i.scdn.co/image/ab67616d00004851b755f1b1b4410d404fe21167"
  ],
  spotifyUrl: "https://open.spotify.com/album/4bfwXuecOmNVlPM5RStAiQ",
  spotifyReleaseDate: new Date(718585200000),
  spotifyArtistsIds: ["7An4yvF7hDYDolN4m5zKBp"],
  spotifyPopularity: 54,
  spotifyGenres: [],
  spotifyUri: "spotify:album:4bfwXuecOmNVlPM5RStAiQ",
  lastfmTagsFull: [
    {
      name: "shoegaze",
      url: "https://www.last.fm/tag/shoegaze"
    },
    {
      name: "1992",
      url: "https://www.last.fm/tag/1992"
    }
  ],
  lastfmTagsNames: ["shoegaze", "1992"],
  artists: [
    {
      name: "Soda Stereo",
      spotifyId: "7An4yvF7hDYDolN4m5zKBp",
      spotifyUri: "spotify:artist:7An4yvF7hDYDolN4m5zKBp",
      spotifyUrl: "https://open.spotify.com/artist/7An4yvF7hDYDolN4m5zKBp",
      spotifyGenres: [
        "argentine rock",
        "latin alternative",
        "latin rock",
        "post-punk argentina",
        "rock en espanol",
        "ska argentino"
      ],
      spotifyPopularity: 78,
      spotifyImgs: [
        "https://i.scdn.co/image/ab6761610000e5eb4a6d2f5e161c011cdb9cef69",
        "https://i.scdn.co/image/ab676161000051744a6d2f5e161c011cdb9cef69",
        "https://i.scdn.co/image/ab6761610000f1784a6d2f5e161c011cdb9cef69"
      ],
      id: 11
    }
  ],
  id: 2
};

const albumGlow = {
  spotifyId: "6QYoRO2sXThCORAifrP4Bl",
  name: "The Glow, Pt. 2",
  spotifyCoverUrl: [
    "https://i.scdn.co/image/ab67616d0000b27300c91ccec6800014b8513717",
    "https://i.scdn.co/image/ab67616d00001e0200c91ccec6800014b8513717",
    "https://i.scdn.co/image/ab67616d0000485100c91ccec6800014b8513717"
  ],
  spotifyUrl: "https://open.spotify.com/album/6QYoRO2sXThCORAifrP4Bl",
  spotifyReleaseDate: new Date(1000159200000),
  spotifyArtistsIds: ["7Ht57YadlBXcFJDK3plmhO"],
  spotifyPopularity: 54,
  spotifyGenres: [],
  spotifyUri: "spotify:album:6QYoRO2sXThCORAifrP4Bl",
  lastfmTagsFull: [
    {
      name: "indie folk",
      url: "https://www.last.fm/tag/indie+folk"
    },
    {
      name: "2001",
      url: "https://www.last.fm/tag/2001"
    },
    {
      name: "folk",
      url: "https://www.last.fm/tag/folk"
    },
    {
      name: "Lo-Fi",
      url: "https://www.last.fm/tag/Lo-Fi"
    },
    {
      name: "psychedelic folk",
      url: "https://www.last.fm/tag/psychedelic+folk"
    },
    {
      name: "favorite albums",
      url: "https://www.last.fm/tag/favorite+albums"
    },
    {
      name: "Lo-Fi Indie",
      url: "https://www.last.fm/tag/Lo-Fi+Indie"
    },
    {
      name: "experimental",
      url: "https://www.last.fm/tag/experimental"
    },
    {
      name: "indie rock",
      url: "https://www.last.fm/tag/indie+rock"
    },
    {
      name: "noise rock",
      url: "https://www.last.fm/tag/noise+rock"
    },
    {
      name: "indie",
      url: "https://www.last.fm/tag/indie"
    },
    {
      name: "pop",
      url: "https://www.last.fm/tag/pop"
    }
  ],
  lastfmTagsNames: [
    "indie folk",
    "2001",
    "folk",
    "Lo-Fi",
    "psychedelic folk",
    "favorite albums",
    "Lo-Fi Indie",
    "experimental",
    "indie rock",
    "noise rock",
    "indie",
    "pop"
  ],
  artists: [
    {
      name: "The Microphones",
      spotifyId: "7Ht57YadlBXcFJDK3plmhO",
      spotifyUri: "spotify:artist:7Ht57YadlBXcFJDK3plmhO",
      spotifyUrl: "https://open.spotify.com/artist/7Ht57YadlBXcFJDK3plmhO",
      spotifyGenres: [
        "alternative rock",
        "anti-folk",
        "art rock",
        "freak folk",
        "indie pop",
        "indie rock",
        "lo-fi",
        "noise pop",
        "olympia wa indie"
      ],
      spotifyPopularity: 52,
      spotifyImgs: [
        "https://i.scdn.co/image/866667893c025a6bc6ae4e6e9a79f57c54f65429",
        "https://i.scdn.co/image/1030acea742d47a7b12fc7da1d4e14328a9a4635",
        "https://i.scdn.co/image/5ebf004da94e4e82a21a295137d1f158469b56fb",
        "https://i.scdn.co/image/234d3be762aa318f1dfe14d875ca2c40e521a779"
      ],
      id: 41
    }
  ],
  id: 53
};

const albumBad = {
  spotifyId: "5lJqux7orBlA1QzyiBGti1",
  name: "YHLQMDLG",
  spotifyCoverUrl: [
    "https://i.scdn.co/image/ab67616d0000b273548f7ec52da7313de0c5e4a0",
    "https://i.scdn.co/image/ab67616d00001e02548f7ec52da7313de0c5e4a0",
    "https://i.scdn.co/image/ab67616d00004851548f7ec52da7313de0c5e4a0"
  ],
  spotifyUrl: "https://open.spotify.com/album/5lJqux7orBlA1QzyiBGti1",
  spotifyReleaseDate: new Date(1582930800000),
  spotifyArtistsIds: ["4q3ewBCX7sLwd24euuV69X"],
  spotifyPopularity: 88,
  spotifyGenres: [],
  spotifyUri: "spotify:album:5lJqux7orBlA1QzyiBGti1",
  lastfmTagsFull: [
    {
      name: "trap",
      url: "https://www.last.fm/tag/trap"
    },
    {
      name: "2020",
      url: "https://www.last.fm/tag/2020"
    },
    {
      name: "Reggaeton",
      url: "https://www.last.fm/tag/Reggaeton"
    },
    {
      name: "Latin Trap",
      url: "https://www.last.fm/tag/Latin+Trap"
    },
    {
      name: "indie",
      url: "https://www.last.fm/tag/indie"
    },
    {
      name: "latin",
      url: "https://www.last.fm/tag/latin"
    },
    {
      name: "rnb",
      url: "https://www.last.fm/tag/rnb"
    },
    {
      name: "latin pop",
      url: "https://www.last.fm/tag/latin+pop"
    },
    {
      name: "bad bunny",
      url: "https://www.last.fm/tag/bad+bunny"
    },
    {
      name: "trap latino",
      url: "https://www.last.fm/tag/trap+latino"
    }
  ],
  lastfmTagsNames: [
    "trap",
    "2020",
    "Reggaeton",
    "Latin Trap",
    "indie",
    "latin",
    "rnb",
    "latin pop",
    "bad bunny",
    "trap latino"
  ],
  artists: [
    {
      name: "Bad Bunny",
      spotifyId: "4q3ewBCX7sLwd24euuV69X",
      spotifyUri: "spotify:artist:4q3ewBCX7sLwd24euuV69X",
      spotifyUrl: "https://open.spotify.com/artist/4q3ewBCX7sLwd24euuV69X",
      spotifyGenres: ["latin", "reggaeton", "trap latino"],
      spotifyPopularity: 100,
      spotifyImgs: [
        "https://i.scdn.co/image/ab6761610000e5eb6ad57a3cb26ae3ffd0f28f22",
        "https://i.scdn.co/image/ab676161000051746ad57a3cb26ae3ffd0f28f22",
        "https://i.scdn.co/image/ab6761610000f1786ad57a3cb26ae3ffd0f28f22"
      ],
      id: 48
    }
  ],
  id: 11
};

const albumLateralus = {
  spotifyId: "5l5m1hnH4punS1GQXgEi3T",
  name: "Lateralus",
  spotifyCoverUrl: [
    "https://i.scdn.co/image/ab67616d0000b273ca41a947c13b78749c4953b1",
    "https://i.scdn.co/image/ab67616d00001e02ca41a947c13b78749c4953b1",
    "https://i.scdn.co/image/ab67616d00004851ca41a947c13b78749c4953b1"
  ],
  spotifyUrl: "https://open.spotify.com/album/5l5m1hnH4punS1GQXgEi3T",
  spotifyReleaseDate: new Date(989877600000),
  spotifyArtistsIds: ["2yEwvVSSSUkcLeSTNyHKh8"],
  spotifyPopularity: 68,
  spotifyGenres: [],
  spotifyUri: "spotify:album:5l5m1hnH4punS1GQXgEi3T",
  lastfmTagsFull: [
    {
      name: "albums I own",
      url: "https://www.last.fm/tag/albums+I+own"
    },
    {
      name: "Progressive metal",
      url: "https://www.last.fm/tag/Progressive+metal"
    },
    {
      name: "Progressive rock",
      url: "https://www.last.fm/tag/Progressive+rock"
    },
    {
      name: "favourite albums",
      url: "https://www.last.fm/tag/favourite+albums"
    },
    {
      name: "metal",
      url: "https://www.last.fm/tag/metal"
    },
    {
      name: "2001",
      url: "https://www.last.fm/tag/2001"
    },
    {
      name: "favorite albums",
      url: "https://www.last.fm/tag/favorite+albums"
    },
    {
      name: "tool",
      url: "https://www.last.fm/tag/tool"
    },
    {
      name: "alternative metal",
      url: "https://www.last.fm/tag/alternative+metal"
    },
    {
      name: "rock",
      url: "https://www.last.fm/tag/rock"
    },
    {
      name: "Masterpiece",
      url: "https://www.last.fm/tag/Masterpiece"
    },
    {
      name: "alternative",
      url: "https://www.last.fm/tag/alternative"
    }
  ],
  lastfmTagsNames: [
    "albums I own",
    "Progressive metal",
    "Progressive rock",
    "favourite albums",
    "metal",
    "2001",
    "favorite albums",
    "tool",
    "alternative metal",
    "rock",
    "Masterpiece",
    "alternative"
  ],
  artists: [
    {
      name: "TOOL",
      spotifyId: "2yEwvVSSSUkcLeSTNyHKh8",
      spotifyUri: "spotify:artist:2yEwvVSSSUkcLeSTNyHKh8",
      spotifyUrl: "https://open.spotify.com/artist/2yEwvVSSSUkcLeSTNyHKh8",
      spotifyGenres: [
        "alternative metal",
        "alternative rock",
        "art rock",
        "nu metal",
        "progressive metal",
        "progressive rock",
        "rock"
      ],
      spotifyPopularity: 74,
      spotifyImgs: [
        "https://i.scdn.co/image/ab6761610000e5eb13f5472b709101616c87cba3",
        "https://i.scdn.co/image/ab6761610000517413f5472b709101616c87cba3",
        "https://i.scdn.co/image/ab6761610000f17813f5472b709101616c87cba3"
      ],
      id: 20
    }
  ],
  id: 48
};

const albumBuena = {
  spotifyId: "6DPdEaZ0KDBCCgXyy4q8bi",
  name: "Buena Vista Social Club",
  spotifyCoverUrl: [
    "https://i.scdn.co/image/ab67616d0000b2732a896bf89ee1e87f1a774cb6",
    "https://i.scdn.co/image/ab67616d00001e022a896bf89ee1e87f1a774cb6",
    "https://i.scdn.co/image/ab67616d000048512a896bf89ee1e87f1a774cb6"
  ],
  spotifyUrl: "https://open.spotify.com/album/6DPdEaZ0KDBCCgXyy4q8bi",
  spotifyReleaseDate: new Date(867016800000),
  spotifyArtistsIds: ["11kBu957KTYoAltZHDm8gW"],
  spotifyPopularity: 68,
  spotifyGenres: [],
  spotifyUri: "spotify:album:6DPdEaZ0KDBCCgXyy4q8bi",
  lastfmTagsFull: [
    {
      name: "latin",
      url: "https://www.last.fm/tag/latin"
    },
    {
      name: "cuban",
      url: "https://www.last.fm/tag/cuban"
    },
    {
      name: "jazz",
      url: "https://www.last.fm/tag/jazz"
    },
    {
      name: "buena vista social club",
      url: "https://www.last.fm/tag/buena+vista+social+club"
    },
    {
      name: "cuba",
      url: "https://www.last.fm/tag/cuba"
    },
    {
      name: "albums I own",
      url: "https://www.last.fm/tag/albums+I+own"
    },
    {
      name: "latin jazz",
      url: "https://www.last.fm/tag/latin+jazz"
    },
    {
      name: "world",
      url: "https://www.last.fm/tag/world"
    },
    {
      name: "favorite albums",
      url: "https://www.last.fm/tag/favorite+albums"
    },
    {
      name: "1997",
      url: "https://www.last.fm/tag/1997"
    },
    {
      name: "90s",
      url: "https://www.last.fm/tag/90s"
    },
    {
      name: "son",
      url: "https://www.last.fm/tag/son"
    }
  ],
  lastfmTagsNames: [
    "latin",
    "cuban",
    "jazz",
    "buena vista social club",
    "cuba",
    "albums I own",
    "latin jazz",
    "world",
    "favorite albums",
    "1997",
    "90s",
    "son"
  ],
  artists: [
    {
      name: "Buena Vista Social Club",
      spotifyId: "11kBu957KTYoAltZHDm8gW",
      spotifyUri: "spotify:artist:11kBu957KTYoAltZHDm8gW",
      spotifyUrl: "https://open.spotify.com/artist/11kBu957KTYoAltZHDm8gW",
      spotifyGenres: ["latin jazz", "musica tradicional cubana", "world"],
      spotifyPopularity: 68,
      spotifyImgs: [
        "https://i.scdn.co/image/ab6772690000c46c844169c4a2aa598a878a8267",
        "https://i.scdn.co/image/ab6772690000dd22844169c4a2aa598a878a8267",
        "https://i.scdn.co/image/ab6772690000bac3844169c4a2aa598a878a8267",
        "https://i.scdn.co/image/ab67726900008f74844169c4a2aa598a878a8267"
      ],
      id: 76
    }
  ],
  id: 84
};

const albumCure = {
  spotifyId: "6DZNOsLXIU2zOQfQDwDpIS",
  name: "Disintegration (Remastered)",
  spotifyCoverUrl: [
    "https://i.scdn.co/image/ab67616d0000b273858ed9e2832801189187391a",
    "https://i.scdn.co/image/ab67616d00001e02858ed9e2832801189187391a",
    "https://i.scdn.co/image/ab67616d00004851858ed9e2832801189187391a"
  ],
  spotifyUrl: "https://open.spotify.com/album/6DZNOsLXIU2zOQfQDwDpIS",
  spotifyReleaseDate: new Date(610063200000),
  spotifyArtistsIds: ["7bu3H8JO7d0UbMoVzbo70s"],
  spotifyPopularity: 49,
  spotifyGenres: [],
  spotifyUri: "spotify:album:6DZNOsLXIU2zOQfQDwDpIS",
  lastfmTagsFull: [
    {
      name: "1989",
      url: "https://www.last.fm/tag/1989"
    },
    {
      name: "rock",
      url: "https://www.last.fm/tag/rock"
    },
    {
      name: "80s",
      url: "https://www.last.fm/tag/80s"
    },
    {
      name: "alternative",
      url: "https://www.last.fm/tag/alternative"
    },
    {
      name: "alternative rock",
      url: "https://www.last.fm/tag/alternative+rock"
    },
    {
      name: "new wave",
      url: "https://www.last.fm/tag/new+wave"
    },
    {
      name: "post-punk",
      url: "https://www.last.fm/tag/post-punk"
    },
    {
      name: "Gothic",
      url: "https://www.last.fm/tag/Gothic"
    },
    {
      name: "Gothic Rock",
      url: "https://www.last.fm/tag/Gothic+Rock"
    },
    {
      name: "1980s",
      url: "https://www.last.fm/tag/1980s"
    },
    {
      name: "1001 Albums You Must Hear Before You Die",
      url: "https://www.last.fm/tag/1001+Albums+You+Must+Hear+Before+You+Die"
    }
  ],
  lastfmTagsNames: [
    "1989",
    "rock",
    "80s",
    "alternative",
    "alternative rock",
    "new wave",
    "post-punk",
    "Gothic",
    "Gothic Rock",
    "1980s",
    "1001 Albums You Must Hear Before You Die"
  ],
  artists: [
    {
      name: "The Cure",
      spotifyId: "7bu3H8JO7d0UbMoVzbo70s",
      spotifyUri: "spotify:artist:7bu3H8JO7d0UbMoVzbo70s",
      spotifyUrl: "https://open.spotify.com/artist/7bu3H8JO7d0UbMoVzbo70s",
      spotifyGenres: ["new wave", "permanent wave", "rock", "uk post-punk"],
      spotifyPopularity: 78,
      spotifyImgs: [
        "https://i.scdn.co/image/7ca743e822b80133971ccf5c70fcbd77a4f4f508",
        "https://i.scdn.co/image/2cb2e14783685fd3d27006891aaaa35fc53cd82d",
        "https://i.scdn.co/image/9e1ed6613ac0ef103fbfca3c11ff35fec8d9c6b1"
      ],
      id: 72
    }
  ],
  id: 182
};

const albumViolator = {
  spotifyId: "0Tg76MY2wNK4j37iCb6qyH",
  name: "Violator (Deluxe)",
  spotifyCoverUrl: [
    "https://i.scdn.co/image/ab67616d0000b273234bbbad4dce31cd2950af3e",
    "https://i.scdn.co/image/ab67616d00001e02234bbbad4dce31cd2950af3e",
    "https://i.scdn.co/image/ab67616d00004851234bbbad4dce31cd2950af3e"
  ],
  spotifyUrl: "https://open.spotify.com/album/0Tg76MY2wNK4j37iCb6qyH",
  spotifyReleaseDate: new Date(637801200000),
  spotifyArtistsIds: ["762310PdDnwsDxAQxzQkfX"],
  spotifyPopularity: 61,
  spotifyGenres: [],
  spotifyUri: "spotify:album:0Tg76MY2wNK4j37iCb6qyH",
  lastfmTagsFull: [
    {
      name: "80s",
      url: "https://www.last.fm/tag/80s"
    },
    {
      name: "synth pop",
      url: "https://www.last.fm/tag/synth+pop"
    },
    {
      name: "1990",
      url: "https://www.last.fm/tag/1990"
    },
    {
      name: "electronic",
      url: "https://www.last.fm/tag/electronic"
    },
    {
      name: "new wave",
      url: "https://www.last.fm/tag/new+wave"
    },
    {
      name: "Gothic",
      url: "https://www.last.fm/tag/Gothic"
    },
    {
      name: "synthpop",
      url: "https://www.last.fm/tag/synthpop"
    },
    {
      name: "sensual",
      url: "https://www.last.fm/tag/sensual"
    },
    {
      name: "sexual",
      url: "https://www.last.fm/tag/sexual"
    },
    {
      name: "amor",
      url: "https://www.last.fm/tag/amor"
    },
    {
      name: "drogas",
      url: "https://www.last.fm/tag/drogas"
    },
    {
      name: "alegria",
      url: "https://www.last.fm/tag/alegria"
    }
  ],
  lastfmTagsNames: [
    "80s",
    "synth pop",
    "1990",
    "electronic",
    "new wave",
    "Gothic",
    "synthpop",
    "sensual",
    "sexual",
    "amor",
    "drogas",
    "alegria"
  ],
  artists: [
    {
      name: "Depeche Mode",
      spotifyId: "762310PdDnwsDxAQxzQkfX",
      spotifyUri: "spotify:artist:762310PdDnwsDxAQxzQkfX",
      spotifyUrl: "https://open.spotify.com/artist/762310PdDnwsDxAQxzQkfX",
      spotifyGenres: [
        "dance rock",
        "new romantic",
        "new wave",
        "permanent wave",
        "synthpop"
      ],
      spotifyPopularity: 77,
      spotifyImgs: [
        "https://i.scdn.co/image/ab6761610000e5eb8ada6bad4c9b276b7fd24874",
        "https://i.scdn.co/image/ab676161000051748ada6bad4c9b276b7fd24874",
        "https://i.scdn.co/image/ab6761610000f1788ada6bad4c9b276b7fd24874"
      ],
      id: 31
    }
  ],
  id: 106
};

const albumCourt = {
  spotifyId: "5wec5BciMpDMzlEFpYeHse",
  name:
    "In The Court Of The Crimson King (Expanded & Remastered Original Album Mix)",
  spotifyCoverUrl: [
    "https://i.scdn.co/image/ab67616d0000b2739f2179592d196f575b7a0ff5",
    "https://i.scdn.co/image/ab67616d00001e029f2179592d196f575b7a0ff5",
    "https://i.scdn.co/image/ab67616d000048519f2179592d196f575b7a0ff5"
  ],
  spotifyUrl: "https://open.spotify.com/album/5wec5BciMpDMzlEFpYeHse",
  spotifyReleaseDate: new Date(-7174800000),
  spotifyArtistsIds: ["7M1FPw29m5FbicYzS2xdpi"],
  spotifyPopularity: 40,
  spotifyGenres: [],
  spotifyUri: "spotify:album:5wec5BciMpDMzlEFpYeHse",
  lastfmTagsFull: [
    {
      name: "1969",
      url: "https://www.last.fm/tag/1969"
    },
    {
      name: "Listened to",
      url: "https://www.last.fm/tag/Listened+to"
    }
  ],
  lastfmTagsNames: ["1969", "Listened to"],
  artists: [
    {
      name: "King Crimson",
      spotifyId: "7M1FPw29m5FbicYzS2xdpi",
      spotifyUri: "spotify:artist:7M1FPw29m5FbicYzS2xdpi",
      spotifyUrl: "https://open.spotify.com/artist/7M1FPw29m5FbicYzS2xdpi",
      spotifyGenres: [
        "album rock",
        "art rock",
        "classic rock",
        "instrumental rock",
        "jazz fusion",
        "jazz rock",
        "progressive rock",
        "psychedelic rock",
        "rock",
        "symphonic rock",
        "zolo"
      ],
      spotifyPopularity: 60,
      spotifyImgs: [
        "https://i.scdn.co/image/ab6761610000e5eb7c1c2fcf5a73dbfa60a40a18",
        "https://i.scdn.co/image/ab676161000051747c1c2fcf5a73dbfa60a40a18",
        "https://i.scdn.co/image/ab6761610000f1787c1c2fcf5a73dbfa60a40a18"
      ],
      id: 145
    }
  ],
  id: 187
};

const albumMad = {
  spotifyId: "01FCoGEQ3NFWF4fHJzdiax",
  name: "Madvillainy",
  spotifyCoverUrl: [
    "https://i.scdn.co/image/ab67616d0000b27302abe1eaf9da931f42629b4a",
    "https://i.scdn.co/image/ab67616d00001e0202abe1eaf9da931f42629b4a",
    "https://i.scdn.co/image/ab67616d0000485102abe1eaf9da931f42629b4a"
  ],
  spotifyUrl: "https://open.spotify.com/album/01FCoGEQ3NFWF4fHJzdiax",
  spotifyReleaseDate: new Date(1080082800000),
  spotifyArtistsIds: [
    "2aoFQUeHD1U7pL098lRsDU",
    "5LhTec3c7dcqBvpLRWbMcf",
    "2pAWfrd7WFF3XhVt9GooDL"
  ],
  spotifyPopularity: 41,
  spotifyGenres: [],
  spotifyUri: "spotify:album:01FCoGEQ3NFWF4fHJzdiax",
  lastfmTagsFull: [
    {
      name: "Hip-Hop",
      url: "https://www.last.fm/tag/Hip-Hop"
    },
    {
      name: "2004",
      url: "https://www.last.fm/tag/2004"
    },
    {
      name: "hip hop",
      url: "https://www.last.fm/tag/hip+hop"
    },
    {
      name: "rap",
      url: "https://www.last.fm/tag/rap"
    },
    {
      name: "albums I own",
      url: "https://www.last.fm/tag/albums+I+own"
    },
    {
      name: "Stones throw",
      url: "https://www.last.fm/tag/Stones+throw"
    },
    {
      name: "favourite albums",
      url: "https://www.last.fm/tag/favourite+albums"
    },
    {
      name: "abstract hip hop",
      url: "https://www.last.fm/tag/abstract+hip+hop"
    },
    {
      name: "underground hip-hop",
      url: "https://www.last.fm/tag/underground+hip-hop"
    },
    {
      name: "mf doom",
      url: "https://www.last.fm/tag/mf+doom"
    },
    {
      name: "Best of 2004",
      url: "https://www.last.fm/tag/Best+of+2004"
    },
    {
      name: "favorite albums",
      url: "https://www.last.fm/tag/favorite+albums"
    }
  ],
  lastfmTagsNames: [
    "Hip-Hop",
    "2004",
    "hip hop",
    "rap",
    "albums I own",
    "Stones throw",
    "favourite albums",
    "abstract hip hop",
    "underground hip-hop",
    "mf doom",
    "Best of 2004",
    "favorite albums"
  ],
  artists: [
    {
      name: "Madvillain",
      spotifyId: "2aoFQUeHD1U7pL098lRsDU",
      spotifyUri: "spotify:artist:2aoFQUeHD1U7pL098lRsDU",
      spotifyUrl: "https://open.spotify.com/artist/2aoFQUeHD1U7pL098lRsDU",
      spotifyGenres: [
        "alternative hip hop",
        "hip hop",
        "psychedelic hip hop",
        "rap"
      ],
      spotifyPopularity: 66,
      spotifyImgs: [
        "https://i.scdn.co/image/bc99e9cb1976fcecb929d819b3dfc6f6fabca500",
        "https://i.scdn.co/image/9d7ed68679a970b86faaea230d16334baba5ed4b",
        "https://i.scdn.co/image/3c14d3a5bf0dbc50595b6d5001633aae9d9e2b5f",
        "https://i.scdn.co/image/ad65acde29d51f7f62a9307815d5b9029be3bb64"
      ],
      id: 148
    },
    {
      name: "MF DOOM",
      spotifyId: "2pAWfrd7WFF3XhVt9GooDL",
      spotifyUri: "spotify:artist:2pAWfrd7WFF3XhVt9GooDL",
      spotifyUrl: "https://open.spotify.com/artist/2pAWfrd7WFF3XhVt9GooDL",
      spotifyGenres: [
        "alternative hip hop",
        "east coast hip hop",
        "hip hop",
        "rap"
      ],
      spotifyPopularity: 75,
      spotifyImgs: [
        "https://i.scdn.co/image/ab6761610000e5eb3e9a6caa41a80b9238a49784",
        "https://i.scdn.co/image/ab676161000051743e9a6caa41a80b9238a49784",
        "https://i.scdn.co/image/ab6761610000f1783e9a6caa41a80b9238a49784"
      ],
      id: 109
    },
    {
      name: "Madlib",
      spotifyId: "5LhTec3c7dcqBvpLRWbMcf",
      spotifyUri: "spotify:artist:5LhTec3c7dcqBvpLRWbMcf",
      spotifyUrl: "https://open.spotify.com/artist/5LhTec3c7dcqBvpLRWbMcf",
      spotifyGenres: [
        "alternative hip hop",
        "funk",
        "hip hop",
        "indie soul",
        "psychedelic hip hop"
      ],
      spotifyPopularity: 71,
      spotifyImgs: [
        "https://i.scdn.co/image/ab6761610000e5ebdb860c843b90fdea28f670d6",
        "https://i.scdn.co/image/ab67616100005174db860c843b90fdea28f670d6",
        "https://i.scdn.co/image/ab6761610000f178db860c843b90fdea28f670d6"
      ],
      id: 149
    }
  ],
  id: 190
};

const albumApe = {
  spotifyId: "4YzYXXM2GSzsp0hsgVBBrU",
  name: "The Ape Of Naples",
  spotifyCoverUrl: [
    "https://i.scdn.co/image/ab67616d0000b273b9b111f3e3cd5ebbd1628d9f",
    "https://i.scdn.co/image/ab67616d00001e02b9b111f3e3cd5ebbd1628d9f",
    "https://i.scdn.co/image/ab67616d00004851b9b111f3e3cd5ebbd1628d9f"
  ],
  spotifyUrl: "https://open.spotify.com/album/4YzYXXM2GSzsp0hsgVBBrU",
  spotifyReleaseDate: new Date(1475186400000),
  spotifyArtistsIds: ["37KB5e6cGsN1AQAB9Omm1U"],
  spotifyPopularity: 37,
  spotifyGenres: [],
  spotifyUri: "spotify:album:4YzYXXM2GSzsp0hsgVBBrU",
  lastfmTagsFull: [
    {
      name: "experimental",
      url: "https://www.last.fm/tag/experimental"
    },
    {
      name: "electronic",
      url: "https://www.last.fm/tag/electronic"
    },
    {
      name: "ambient",
      url: "https://www.last.fm/tag/ambient"
    },
    {
      name: "dark ambient",
      url: "https://www.last.fm/tag/dark+ambient"
    },
    {
      name: "2005",
      url: "https://www.last.fm/tag/2005"
    },
    {
      name: "industrial",
      url: "https://www.last.fm/tag/industrial"
    },
    {
      name: "Avant-Garde",
      url: "https://www.last.fm/tag/Avant-Garde"
    },
    {
      name: "clinically romantic",
      url: "https://www.last.fm/tag/clinically+romantic"
    },
    {
      name: "Post-Industrial",
      url: "https://www.last.fm/tag/Post-Industrial"
    },
    {
      name: "experimental industrial",
      url: "https://www.last.fm/tag/experimental+industrial"
    },
    {
      name: "achingly intelligent",
      url: "https://www.last.fm/tag/achingly+intelligent"
    },
    {
      name: "ambient industrial",
      url: "https://www.last.fm/tag/ambient+industrial"
    }
  ],
  lastfmTagsNames: [
    "experimental",
    "electronic",
    "ambient",
    "dark ambient",
    "2005",
    "industrial",
    "Avant-Garde",
    "clinically romantic",
    "Post-Industrial",
    "experimental industrial",
    "achingly intelligent",
    "ambient industrial"
  ],
  artists: [
    {
      name: "Coil",
      spotifyId: "37KB5e6cGsN1AQAB9Omm1U",
      spotifyUri: "spotify:artist:37KB5e6cGsN1AQAB9Omm1U",
      spotifyUrl: "https://open.spotify.com/artist/37KB5e6cGsN1AQAB9Omm1U",
      spotifyGenres: [
        "british experimental",
        "british industrial",
        "dark jazz",
        "drone",
        "dub metal",
        "experimental",
        "experimental rock",
        "industrial",
        "new isolationism",
        "post-punk",
        "ritual ambient",
        "uk experimental electronic"
      ],
      spotifyPopularity: 40,
      spotifyImgs: [
        "https://i.scdn.co/image/8f10b786e295476593860cb018b112a8b9f264f1",
        "https://i.scdn.co/image/7aa4d01666902444c7733bf77024e38273f3aac7",
        "https://i.scdn.co/image/463df724958da98aeded23be0baec8f864b028d6"
      ],
      id: 121
    }
  ],
  id: 135
};

const albumMassive = {
  spotifyId: "49MNmJhZQewjt06rpwp6QR",
  name: "Mezzanine",
  spotifyCoverUrl: [
    "https://i.scdn.co/image/ab67616d0000b2732fcb0a3c7a66e516b11cd26e",
    "https://i.scdn.co/image/ab67616d00001e022fcb0a3c7a66e516b11cd26e",
    "https://i.scdn.co/image/ab67616d000048512fcb0a3c7a66e516b11cd26e"
  ],
  spotifyUrl: "https://open.spotify.com/album/49MNmJhZQewjt06rpwp6QR",
  spotifyReleaseDate: new Date(883609200000),
  spotifyArtistsIds: ["6FXMGgJwohJLUSr5nVlf9X"],
  spotifyPopularity: 64,
  spotifyGenres: [],
  spotifyUri: "spotify:album:49MNmJhZQewjt06rpwp6QR",
  lastfmTagsFull: [
    {
      name: "trip-hop",
      url: "https://www.last.fm/tag/trip-hop"
    },
    {
      name: "electronic",
      url: "https://www.last.fm/tag/electronic"
    },
    {
      name: "albums I own",
      url: "https://www.last.fm/tag/albums+I+own"
    },
    {
      name: "chillout",
      url: "https://www.last.fm/tag/chillout"
    },
    {
      name: "electronica",
      url: "https://www.last.fm/tag/electronica"
    },
    {
      name: "1998",
      url: "https://www.last.fm/tag/1998"
    },
    {
      name: "trip hop",
      url: "https://www.last.fm/tag/trip+hop"
    },
    {
      name: "favorite albums",
      url: "https://www.last.fm/tag/favorite+albums"
    },
    {
      name: "downtempo",
      url: "https://www.last.fm/tag/downtempo"
    },
    {
      name: "favourite albums",
      url: "https://www.last.fm/tag/favourite+albums"
    },
    {
      name: "90s",
      url: "https://www.last.fm/tag/90s"
    },
    {
      name: "alternative",
      url: "https://www.last.fm/tag/alternative"
    }
  ],
  lastfmTagsNames: [
    "trip-hop",
    "electronic",
    "albums I own",
    "chillout",
    "electronica",
    "1998",
    "trip hop",
    "favorite albums",
    "downtempo",
    "favourite albums",
    "90s",
    "alternative"
  ],
  artists: [
    {
      name: "Massive Attack",
      spotifyId: "6FXMGgJwohJLUSr5nVlf9X",
      spotifyUri: "spotify:artist:6FXMGgJwohJLUSr5nVlf9X",
      spotifyUrl: "https://open.spotify.com/artist/6FXMGgJwohJLUSr5nVlf9X",
      spotifyGenres: ["big beat", "downtempo", "electronica", "trip hop"],
      spotifyPopularity: 68,
      spotifyImgs: [
        "https://i.scdn.co/image/c8bbeedb05f38ae5cb982a7daf4bf7129cca892c",
        "https://i.scdn.co/image/52c2a824e84f4e8adf0b12418f9f8306b4b5b77a",
        "https://i.scdn.co/image/0d6b7677f8291c5158bdace8a6e027880c527c2a",
        "https://i.scdn.co/image/c055290bb6e97a589d8ca659cd452a8e9831c2c4"
      ],
      id: 89
    }
  ],
  id: 99
};

const albumPleasures = {
  spotifyId: "0cbpcdI4UySacPh5RCpDfo",
  name: "Unknown Pleasures",
  spotifyCoverUrl: [
    "https://i.scdn.co/image/ab67616d0000b2733fb6bc46c932ca1ab168526a",
    "https://i.scdn.co/image/ab67616d00001e023fb6bc46c932ca1ab168526a",
    "https://i.scdn.co/image/ab67616d000048513fb6bc46c932ca1ab168526a"
  ],
  spotifyUrl: "https://open.spotify.com/album/0cbpcdI4UySacPh5RCpDfo",
  spotifyReleaseDate: new Date(297036000000),
  spotifyArtistsIds: ["432R46LaYsJZV2Gmc4jUV5"],
  spotifyPopularity: 50,
  spotifyGenres: [],
  spotifyUri: "spotify:album:0cbpcdI4UySacPh5RCpDfo",
  lastfmTagsFull: [
    {
      name: "post-punk",
      url: "https://www.last.fm/tag/post-punk"
    },
    {
      name: "albums I own",
      url: "https://www.last.fm/tag/albums+I+own"
    },
    {
      name: "new wave",
      url: "https://www.last.fm/tag/new+wave"
    },
    {
      name: "1979",
      url: "https://www.last.fm/tag/1979"
    },
    {
      name: "favorite albums",
      url: "https://www.last.fm/tag/favorite+albums"
    },
    {
      name: "favourite albums",
      url: "https://www.last.fm/tag/favourite+albums"
    },
    {
      name: "70s",
      url: "https://www.last.fm/tag/70s"
    },
    {
      name: "alternative",
      url: "https://www.last.fm/tag/alternative"
    },
    {
      name: "british",
      url: "https://www.last.fm/tag/british"
    },
    {
      name: "rock",
      url: "https://www.last.fm/tag/rock"
    },
    {
      name: "Gothic Rock",
      url: "https://www.last.fm/tag/Gothic+Rock"
    },
    {
      name: "dark",
      url: "https://www.last.fm/tag/dark"
    }
  ],
  lastfmTagsNames: [
    "post-punk",
    "albums I own",
    "new wave",
    "1979",
    "favorite albums",
    "favourite albums",
    "70s",
    "alternative",
    "british",
    "rock",
    "Gothic Rock",
    "dark"
  ],
  artists: [
    {
      name: "Joy Division",
      spotifyId: "432R46LaYsJZV2Gmc4jUV5",
      spotifyUri: "spotify:artist:432R46LaYsJZV2Gmc4jUV5",
      spotifyUrl: "https://open.spotify.com/artist/432R46LaYsJZV2Gmc4jUV5",
      spotifyGenres: [
        "alternative rock",
        "art rock",
        "madchester",
        "new wave",
        "post-punk",
        "rock",
        "uk post-punk"
      ],
      spotifyPopularity: 68,
      spotifyImgs: [
        "https://i.scdn.co/image/5eeddd733170399db794d2c430a8d2cde7ae1425",
        "https://i.scdn.co/image/d3c6bcb07a5ecddf86e791fa901bf3792fe6e6c7",
        "https://i.scdn.co/image/d384ebd3d3fda0ad219fed6b9014a59e65fbb385",
        "https://i.scdn.co/image/1b5195d5e9b5aac07fb0c801deb1926138222036"
      ],
      id: 119
    }
  ],
  id: 141
};

const albumRainbows = {
  spotifyId: "7eyQXxuf2nGj9d2367Gi5f",
  name: "In Rainbows",
  spotifyCoverUrl: [
    "https://i.scdn.co/image/ab67616d0000b27334733f87148c2fbe0176abdb",
    "https://i.scdn.co/image/ab67616d00001e0234733f87148c2fbe0176abdb",
    "https://i.scdn.co/image/ab67616d0000485134733f87148c2fbe0176abdb"
  ],
  spotifyUrl: "https://open.spotify.com/album/7eyQXxuf2nGj9d2367Gi5f",
  spotifyReleaseDate: new Date(1198796400000),
  spotifyArtistsIds: ["4Z8W4fKeB5YxbusRsdQVPb"],
  spotifyPopularity: 70,
  spotifyGenres: [],
  spotifyUri: "spotify:album:7eyQXxuf2nGj9d2367Gi5f",
  lastfmTagsFull: [
    {
      name: "albums I own",
      url: "https://www.last.fm/tag/albums+I+own"
    },
    {
      name: "alternative",
      url: "https://www.last.fm/tag/alternative"
    },
    {
      name: "alternative rock",
      url: "https://www.last.fm/tag/alternative+rock"
    },
    {
      name: "2007",
      url: "https://www.last.fm/tag/2007"
    },
    {
      name: "best of 2007",
      url: "https://www.last.fm/tag/best+of+2007"
    },
    {
      name: "rock",
      url: "https://www.last.fm/tag/rock"
    },
    {
      name: "favorite albums",
      url: "https://www.last.fm/tag/favorite+albums"
    },
    {
      name: "indie",
      url: "https://www.last.fm/tag/indie"
    },
    {
      name: "favourite albums",
      url: "https://www.last.fm/tag/favourite+albums"
    },
    {
      name: "radiohead",
      url: "https://www.last.fm/tag/radiohead"
    },
    {
      name: "british",
      url: "https://www.last.fm/tag/british"
    },
    {
      name: "00s",
      url: "https://www.last.fm/tag/00s"
    }
  ],
  lastfmTagsNames: [
    "albums I own",
    "alternative",
    "alternative rock",
    "2007",
    "best of 2007",
    "rock",
    "favorite albums",
    "indie",
    "favourite albums",
    "radiohead",
    "british",
    "00s"
  ],
  artists: [
    {
      name: "Radiohead",
      spotifyId: "4Z8W4fKeB5YxbusRsdQVPb",
      spotifyUri: "spotify:artist:4Z8W4fKeB5YxbusRsdQVPb",
      spotifyUrl: "https://open.spotify.com/artist/4Z8W4fKeB5YxbusRsdQVPb",
      spotifyGenres: [
        "alternative rock",
        "art rock",
        "melancholia",
        "oxford indie",
        "permanent wave",
        "rock"
      ],
      spotifyPopularity: 81,
      spotifyImgs: [
        "https://i.scdn.co/image/ab6761610000e5ebfb7ce8a6eac68896cc1471ac",
        "https://i.scdn.co/image/ab67616100005174fb7ce8a6eac68896cc1471ac",
        "https://i.scdn.co/image/ab6761610000f178fb7ce8a6eac68896cc1471ac"
      ],
      id: 143
    }
  ],
  id: 176
};

const albumAnimals = {
  spotifyId: "21jUB9RqplD6OqtsTjKBnO",
  name: "Animals (2011 Remastered Version)",
  spotifyCoverUrl: [
    "https://i.scdn.co/image/ab67616d0000b2734def59831af5dcc2a819de59",
    "https://i.scdn.co/image/ab67616d00001e024def59831af5dcc2a819de59",
    "https://i.scdn.co/image/ab67616d000048514def59831af5dcc2a819de59"
  ],
  spotifyUrl: "https://open.spotify.com/album/21jUB9RqplD6OqtsTjKBnO",
  spotifyReleaseDate: new Date(222649200000),
  spotifyArtistsIds: ["0k17h0D3J5VfsdmQ1iZtE9"],
  spotifyPopularity: 51,
  spotifyGenres: [],
  spotifyUri: "spotify:album:21jUB9RqplD6OqtsTjKBnO",
  lastfmTagsFull: [
    {
      name: "1977",
      url: "https://www.last.fm/tag/1977"
    },
    {
      name: "1970s",
      url: "https://www.last.fm/tag/1970s"
    },
    {
      name: "mistagged",
      url: "https://www.last.fm/tag/mistagged"
    }
  ],
  lastfmTagsNames: ["1977", "1970s", "mistagged"],
  artists: [
    {
      name: "Pink Floyd",
      spotifyId: "0k17h0D3J5VfsdmQ1iZtE9",
      spotifyUri: "spotify:artist:0k17h0D3J5VfsdmQ1iZtE9",
      spotifyUrl: "https://open.spotify.com/artist/0k17h0D3J5VfsdmQ1iZtE9",
      spotifyGenres: [
        "album rock",
        "art rock",
        "classic rock",
        "progressive rock",
        "psychedelic rock",
        "rock",
        "symphonic rock"
      ],
      spotifyPopularity: 83,
      spotifyImgs: [
        "https://i.scdn.co/image/e69f71e2be4b67b82af90fb8e9d805715e0684fa",
        "https://i.scdn.co/image/d011c95081cd9a329e506abd7ded47535d524a07",
        "https://i.scdn.co/image/f0a39a8a196a87a7236bdcf8a8708f6d5d3547cc",
        "https://i.scdn.co/image/ec1fb7127168dbaa962404031409c5a293b95ec6"
      ],
      id: 44
    }
  ],
  id: 184
};

const albumPatio = {
  spotifyId: "7oT1CbeyKlCJOsxmELnMMW",
  name: "El patio 40 Aniversario",
  spotifyCoverUrl: [
    "https://i.scdn.co/image/ab67616d0000b273a97a230cff27c947617b5a27",
    "https://i.scdn.co/image/ab67616d00001e02a97a230cff27c947617b5a27",
    "https://i.scdn.co/image/ab67616d00004851a97a230cff27c947617b5a27"
  ],
  spotifyUrl: "https://open.spotify.com/album/7oT1CbeyKlCJOsxmELnMMW",
  spotifyReleaseDate: new Date(1430172000000),
  spotifyArtistsIds: ["5hlBb5u8K5D8yrL8jwZ7N9"],
  spotifyPopularity: 32,
  spotifyGenres: [],
  spotifyUri: "spotify:album:7oT1CbeyKlCJOsxmELnMMW",
  lastfmTagsFull: [],
  lastfmTagsNames: [],
  artists: [
    {
      name: "Triana",
      spotifyId: "5hlBb5u8K5D8yrL8jwZ7N9",
      spotifyUri: "spotify:artist:5hlBb5u8K5D8yrL8jwZ7N9",
      spotifyUrl: "https://open.spotify.com/artist/5hlBb5u8K5D8yrL8jwZ7N9",
      spotifyGenres: [
        "cantautor",
        "flamenco",
        "rock andaluz",
        "rumba",
        "spanish new wave",
        "spanish prog"
      ],
      spotifyPopularity: 50,
      spotifyImgs: [
        "https://i.scdn.co/image/ab67616d0000b27339ef8bae7a9d8c89f12c7126",
        "https://i.scdn.co/image/ab67616d00001e0239ef8bae7a9d8c89f12c7126",
        "https://i.scdn.co/image/ab67616d0000485139ef8bae7a9d8c89f12c7126"
      ],
      id: 47
    }
  ],
  id: 10
};
const albums: Album[] = [
  albumMantle,
  albumDynamo,
  albumGlow,
  albumBad,
  albumLateralus,
  albumBuena,
  albumPatio,
  albumAnimals,
  albumApe,
  albumPleasures,
  albumMassive,
  albumRainbows,
  albumMad,
  albumCourt,
  albumCure,
  albumViolator
];

export default shuffle(albums);
