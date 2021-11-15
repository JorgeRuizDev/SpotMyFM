export default interface SpotifyBaseObject {
  id?: number;
  spotifyId: string;
  name: string;
  spotifyUrl: string;
  spotifyUri: string;
  type: string;
  markets?: string[];
}
