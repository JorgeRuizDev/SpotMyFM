import SpotifyWebApi from "spotify-web-api-node";
import { Command } from "commander";
import { getPlaylist } from "./restQueries/getPlaylist";
import { downloadAndSave } from "./util/saveToFolder";
import {
  updatePlaylistTrack,
  isPreviewBroken,
  findTrackWithPreview,
} from "./util/normalizePlaylist";
import fs from "fs";
import { urlToUri } from "./util/uri";
import { parseDiscgosAndPersist, playlist2dynamodb } from "./util/discogs2db";

const program = new Command();

program
  .name("dataset-tools")
  .description("CLI tool that manages the Ludwig Dataset");

program
  .command("spotify-downloader")
  .description("Download a playlist as .mp3 given the Spotify URI")
  .requiredOption("-u, --uri <string>", "Spotify URI")
  .requiredOption("-t, --token <string>", "Spotify Token")
  .option("-o, --output <string>", "Output Directory Path", "./previews")
  .action((options) => {
    downloadUri(options.token, options.uri, options.output);
  });

program
  .command("normalize-playlist")
  .description(
    "Updates the playlist so all the tracks have a preview attribute"
  )
  .requiredOption("-u, --uri <string>", "Spotify Playlist URI")
  .requiredOption("-t, --token <string>", "Spotify Token")
  .action((options) => {
    console.info("Normalizing Playlist");

    normalizePlaylist(options.token, options.uri);
  });

program
  .command("dataset-json-extract-tracks")
  .description(
    "Extracts all the tracks of the current dataset (given as a .json) and saves them in a .json file"
  )
  .requiredOption("-j, --json <string>", "Dataset Path (.json)")
  .requiredOption("-t, --token <string>", "Spotify Token")
  .action((options) => {
    console.info("Normalizing Dataset");

    normalizeJson(options.token, options.json);
  });

program
  .command("normalize-dataset")
  .description("Normalizes all the playlists of the .json dataset.")
  .requiredOption("-j, --json <string>", "Dataset Path (.json)")
  .requiredOption("-t, --token <string>", "Spotify Token")
  .action((options) => {
    console.info("Normalizing Dataset");

    normalizeJson(options.token, options.json);
  });

program
  .command("parse-discogs")
  .description(
    "Parses the discogs tsv dataset from AccousticBrainz, fetches the api and saves the preview"
  )
  //.requiredOption("-u, --uri <string>", "Spotify Playlist URI")
  //.requiredOption("-t, --token <string>", "Spotify Token")
  .action(async (options) => {
    for (const f of [
      //"hip.csv",

      "blues.csv",
      "latin.csv",

      //"shoe.csv",
      //"triphop.csv",
      //"viking.csv",
      //"indie.csv",

      //"new.csv",
      //"opera.csv",
    ]) {
      console.info(f);
      await parseDiscgosAndPersist(f);
    }
  });

program
  .command("playlist2dynamo")
  .description("Saves a playlist into DynamoDB")
  //.requiredOption("-u, --uri <string>", "Spotify Playlist URI")
  //.requiredOption("-t, --token <string>", "Spotify Token")
  .action(async (options) => {
    playlist2dynamodb("3jiI0TIwxx4DqJP595GHcC", "hip hop-", ["hip hop---trap"])
  });

if (!process.argv.length) {
  program.help();
}
program.parse(process.argv);

/**
 * Given a playlist, updates all the tracks without a preview URL with a valid URL.
 * If no alternative was found, the track is removed from the playlist.
 * @param token A Valid Spotify Api Token
 * @param uri  Playlist URI to clean.
 */
async function normalizePlaylist(token: string, uri: string) {
  const api = new SpotifyWebApi();
  api.setAccessToken(token);
  const [_, type, id] = uri.split(":");
  const playlist = await (await api.getPlaylist(id)).body;

  const limit = 50;
  let offset = 0;
  const totalTracks = playlist.tracks.total;

  // Get {limit} playlist items per page / request
  while (offset < totalTracks) {
    const tracks = await api.getPlaylistTracks(id, { limit, offset });

    const replace: SpotifyApi.TrackObjectSimplified[] = [];
    const replacements: SpotifyApi.TrackObjectSimplified[] = [];

    for (const t of tracks.body.items
      .map((t) => t.track)
      .filter((t) => !t.is_local && t.type === "track")) {
      const alternative = await findTrackWithPreview(api, t);

      if (!alternative) {
        console.info(`Track ${t.name} by ${t.artists[0].name} has no preview`);
      } else if (alternative.id !== t.id) {
        replace.push(t);
        replacements.push(alternative);
      }
    }
    await new Promise((resolve) => setTimeout(resolve, 5000));

    if (replace.length > 0) {
      updatePlaylistTrack(api, playlist, replace, replacements);
    }

    offset += limit;
    console.info(`${Math.min(offset, totalTracks)}/${totalTracks}`);
  }
}

/**
 * This Function downloads all the tracks of a given URI into outPath
 * Requires a valid spotify token
 * @param token
 * @param uri
 * @param outPath
 */
async function downloadUri(
  token: string,
  uri: string,
  outPath: string = "./previews"
) {
  console.info("Out Dir: " + outPath);
  const api = new SpotifyWebApi();
  api.setAccessToken(token);

  const [_, type, id] = uri.split(":");

  let tracks: SpotifyApi.TrackObjectSimplified[] = [];

  switch (type) {
    case "playlist":
      tracks = await getPlaylist(api, id);
      break;
    default:
      console.info(type + "is not supported");
  }

  downloadAndSave(tracks, outPath);
}

async function normalizeJson(token: string, path: string) {
  const f = fs.readFileSync(path, "utf8");
  const json = JSON.parse(f);
  for (const genres of json["genres"]) {
    for (const playlist of genres["subgenres"]) {
      console.info(playlist["name"]);
      await normalizePlaylist(token, urlToUri(playlist["url"]));

      await new Promise((resolve) => setTimeout(resolve, 10000));
    }
  }
}
