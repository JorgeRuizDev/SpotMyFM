import { Album } from "./Album";
import { Artist } from "./Artist";
import SpotifyBaseObject from "./SpotifyObject";

interface LudwigItem {
  label: string;
  confidence: number;
}
export interface Track extends SpotifyBaseObject {
  // Album:
  spotifyAlbumId: string;

  album?: Album;

  // Others:
  spotifyArtistsIds: string[];

  artists: Artist[];

  spotifyDurationMS: number;

  spotifyIsPlayable: boolean;

  spotifyPreviewURL: string | null;

  spotifyIsExplicit: boolean;

  spotifyPopularity: number;

  // Album Position
  spotifyDiscNumber: number;

  spotifyTrackAlbumPos: number;

  isSaved: boolean;

  genres?: string[];

  savedAt?: Date;

  genreVersion: number;

  ludwigGenres?: LudwigItem[];

  ludwigMoods?: LudwigItem[];

  ludwigSubgenres?: LudwigItem[];
}
