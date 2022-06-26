import { Artist } from "./Artist";
import { LastfmTag } from "interfaces/lastFM";
import SpotifyBaseObject, { SpotifyImage } from "./SpotifyObject";

export interface Album extends SpotifyBaseObject {
  // Spotify:

  spotifyCoverUrl: string[];

  spotifyCovers: SpotifyImage[];

  spotifyArtistsIds: string[];

  // Current album album tags
  albumTags: string[];

  // All the album tags among all the albums
  allAlbumTags?: string[];

  artists: Artist[];

  spotifyPopularity: number;

  spotifyReleaseDate?: Date;

  spotifyGenres: string[];

  savedAt?: Date;

  // LastFM:
  lastfmTagsFull?: LastfmTag[];

  lastfmTagsNames: string[];
}
