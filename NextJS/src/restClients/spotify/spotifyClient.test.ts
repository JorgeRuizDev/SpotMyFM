import { SpotifyClient } from "./spotifyClient";

export default describe("SpotifyClient Test", () => {
  let api = new SpotifyClient();

  jest.mock("axios");

  beforeAll(async () => {
    api.setAccessToken("AAaaAAdfasdf.9888373sadf");
  });
});
