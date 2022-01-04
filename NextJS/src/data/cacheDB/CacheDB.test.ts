import { CacheDb } from "./CacheDB";

export default describe("CacheDB Test", () => {
  const db = CacheDb;

  // Reset the DB
  beforeEach(async () => {
    await db.resetDB();
    await db.addAlbums([
      {
        albumTags: [],
        artists: [],
        lastfmTagsNames: [],
        name: "album",
        spotifyArtistsIds: ["1"],
        spotifyCoverUrl: [],
        spotifyGenres: [],
        spotifyId: "0",
        spotifyPopularity: 100,
        spotifyUri: "",
        spotifyUrl: "",
        type: "",
        spotifyCovers: [],
      },
      {
        albumTags: [],
        artists: [],
        lastfmTagsNames: [],
        name: "album",
        spotifyArtistsIds: ["1"],
        spotifyCoverUrl: [],
        spotifyGenres: [],
        spotifyId: "2",
        spotifyPopularity: 100,
        spotifyUri: "",
        spotifyUrl: "",
        type: "",
        spotifyCovers: [],
      },
    ]);

    await db.addArtists([
      {
        name: "artist",
        spotifyId: "1",
        spotifyUri: "",
        spotifyGenres: [],
        type: "",
        spotifyUrl: "",
      },
      {
        name: "artist",
        spotifyId: "2",
        spotifyUri: "",
        spotifyGenres: [],
        type: "",
        spotifyUrl: "",
      },
    ]);

    await db.addTracks([
      {
        artists: [],
        genreVersion: 0,
        isSaved: true,
        name: "",
        spotifyAlbumId: "0",
        spotifyArtistsIds: ["1"],
        spotifyDiscNumber: 0,
        spotifyDurationMS: 0,
        spotifyId: "10",
        spotifyIsExplicit: false,
        spotifyIsPlayable: true,
        spotifyPopularity: 0,
        spotifyPreviewURL: "10",
        spotifyTrackAlbumPos: 0,
        spotifyUri: "",
        spotifyUrl: "",
        type: "",
      },
      {
        artists: [],
        genreVersion: 0,
        isSaved: true,
        name: "",
        spotifyAlbumId: "0",
        spotifyArtistsIds: ["1"],
        spotifyDiscNumber: 0,
        spotifyDurationMS: 0,
        spotifyId: "10",
        spotifyIsExplicit: false,
        spotifyIsPlayable: true,
        spotifyPopularity: 0,
        spotifyPreviewURL: "11",
        spotifyTrackAlbumPos: 0,
        spotifyUri: "",
        spotifyUrl: "",
        type: "",
      },
    ]);
  });

  test("Test Album", async () => {
    const res = await db.getAllAlbums();
    expect(res.length).toBe(2);
    const byid = await db.getAlbumsBySpotifyId(["0"]);
    expect(byid.length).toBe(1);
    expect(byid[0].spotifyPopularity).toBe(100);
    const emptyIds = await db.getAlbumsBySpotifyId([]);
    expect(emptyIds.length).toBe(0);

    const missing = await db.getMissingAlbums(["0", "1", "2"]);
    expect(missing.length).toBe(1);
  });

  test("Join Album", async () => {
    const albums = await db.getAllAlbums();
    expect(albums[0].artists.length).toBe(0);
    const res = await db.joinAlbums(albums);
    expect(res[0].artists.length).toBeGreaterThan(0);

    // Check if join persists the data
    const cached = await db.getAllAlbums();
    expect(cached[0].artists[0]?.spotifyId).toBe("1");
  });

  test("Test Artists", async () => {
    const res = await db.getAllArtists();
    expect(res.length).toBe(2);
    const byId = await db.getArtistsBySpotifyId(["1"]);
    expect(byId.length).toBe(1);

    const missing = await db.getMissingArtists(["1", "-1", "asdfasdf"]);
    expect(missing.length).toBe(2);
  });

  test("Test Track", async () => {
    const res = await db.getAllTracks();
    expect(res.length).toBe(2);

    const byId = await db.getTracksBySpotifyId(["10"]);
    expect(byId.length).toBe(1);

    const missing = await db.getMissingTracks(["1", "10", "asdfasdf"]);
    expect(missing.length).toBe(2);
  });

  test("Test Join Track", async () => {
    const res = await db.getAllTracks();
    expect(res[0].album).toBeUndefined();

    const joined = await db.joinTracks(res);
    expect(joined[0].album?.spotifyId).toBe("0");
    expect(joined[0].artists[0].spotifyId).toBe("1");

    // Check if join persists the data
    const cached = await db.getAllTracks();
    expect(cached[0].album?.spotifyId).toBe("0");
  });
});
