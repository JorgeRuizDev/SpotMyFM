import { Artist } from "./Artist";
import { LastfmTag } from "interfaces/lastFM";
import SpotifyBaseObject from "./SpotifyObject";

export interface Album extends SpotifyBaseObject {
  // Spotify:

  spotifyCoverUrl: string[];

  spotifyArtistsIds: string[];

  albumTags: string[];

  artists: Artist[];

  spotifyPopularity: number;

  spotifyReleaseDate?: Date;

  spotifyGenres: string[];

  // LastFM:
  lastfmTagsFull?: LastfmTag[];

  lastfmTagsNames: string[];
}
