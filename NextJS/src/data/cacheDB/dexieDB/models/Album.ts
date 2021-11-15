import { Artist } from "./Artist";
import { LastfmTag } from "interfaces/lastFM";
export interface Album {
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
