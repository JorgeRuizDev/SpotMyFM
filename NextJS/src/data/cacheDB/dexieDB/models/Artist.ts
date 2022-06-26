import SpotifyBaseObject, { SpotifyImage } from "./SpotifyObject";

export interface Artist extends SpotifyBaseObject {
  spotifyImgs?: string[];
  spotifyArtistImgs?: SpotifyImage[];
  spotifyGenres?: string[];

  spotifyPopularity?: number;
}
