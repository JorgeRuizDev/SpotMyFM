import SpotifyWebApi from "spotify-web-api-node";
import { Command } from "commander";
import { getPlaylist } from "./restQueries/getPlaylist";
import { downloadAndSave } from "./util/saveToFolder";
const program = new Command();

program
  .name("dataset-tools")
  .description(
    "CLI tool that manages "
  );

program
  .command("spotify-downloader")
  .description("Download a playlist as .mp3 given the Spotify URI")
  .requiredOption("-u, --uri <string>", "Spotify URI")
  .requiredOption("-t, --token <string>", "Spotify Token")
  .option("-o, --output <string>", "Output Directory Path", "./previews")
  .action((options) => {
    main(options.token, options.uri, options.output)
  }).parse()


async function main(
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
