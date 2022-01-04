import { Artist } from "./Artist";
import { LastfmTag } from "interfaces/lastFM";
import SpotifyBaseObject, { SpotifyImage } from "./SpotifyObject";

export interface Album extends SpotifyBaseObject {
  // Spotify:

  spotifyCoverUrl: string[];

  spotifyCovers: SpotifyImage[];

  spotifyArtistsIds: string[];

  albumTags: string[];

  artists: Artist[];

  spotifyPopularity: number;

  spotifyReleaseDate?: Date;

  spotifyGenres: string[];

  saveDate?: Date;

  // LastFM:
  lastfmTagsFull?: LastfmTag[];

  lastfmTagsNames: string[];
}
