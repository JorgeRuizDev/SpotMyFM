import SpotifyWebApi from "spotify-web-api-node";
import { Command } from "commander";
import { getPlaylist } from "./restQueries/getPlaylist";
import { downloadAndSave } from "./util/saveToFolder";
import {
  updatePlaylistTrack,
  isPreviewBroken,
  findTrackWithPreview,
} from "./util/fixPlaylistPreviews";
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
  .command("playlist-preview-fix")
  .description(
    "Updates the playlist so all the tracks have a preview attribute"
  )
  .requiredOption("-u, --uri <string>", "Spotify Playlist URI")
  .requiredOption("-t, --token <string>", "Spotify Token")
  .action((options) => {
    console.info("Fixing Playlist Previews");

    fixPlaylistPreviews(options.token, options.uri);
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
async function fixPlaylistPreviews(token: string, uri: string) {
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
    for (const t of tracks.body.items
      .map((t) => t.track)
      .filter((t) => !t.is_local && t.type === "track")) {

      if (isPreviewBroken(t)) {
        const alternative = await findTrackWithPreview(api, t);
        updatePlaylistTrack(api, playlist, t, alternative);

        if (!alternative) {
          console.info(
            `Track ${t.name} by ${t.artists[0].name} has no preview`
          );
        }
      }
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

if (require.main === module) {
}
