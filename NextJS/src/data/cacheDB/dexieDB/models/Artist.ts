import SpotifyBaseObject from "./SpotifyObject";

export interface Artist extends SpotifyBaseObject {
  spotifyImgs?: string[];

  spotifyGenres?: string[];

  spotifyPopularity?: number;
}
