import yargs from "yargs";
import SpotifyWebApi from "spotify-web-api-node";

const argv = yargs
  .usage("Usage: $0 <command> [options]")
  .alias("t", "token")
  .nargs("t", 1)
  .describe("t", "Spotify Api Token")

  .alias("o", "out")
  .nargs("o", 1)
  .describe("o", "Output Directory Path")

  .alias("u", "uri")
  .nargs("uri", 1)
  .describe("uri", "Spotify Item URI to download all the tracks from")

  .demandOption(["t, uri"])
  .help("h")
  .alias("h", "help").argv;

function main(token: string, uri: string, outPath: string = "./previews") {
  const api = new SpotifyWebApi();
  console.log(typeof api);
}

if (require.main === module) {
  main(argv.token, argv.uri, argv.out);
}
