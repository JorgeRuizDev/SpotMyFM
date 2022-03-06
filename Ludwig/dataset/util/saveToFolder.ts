import fs from "fs";
import axios from "axios";

export async function downloadAndSave(
  tracks: SpotifyApi.TrackObjectSimplified[],
  path: string
) {
  // If the out folder does not exist, create it
  if (!fs.existsSync(path)) {
    fs.mkdirSync(path, { recursive: true });
  }

  for (const track of tracks) {
    if (!track || !track?.preview_url || !track.preview_url.length) {
      console.info(`${track?.name} missing preview`);
      continue;
    }
    const trackName = track.id;

    const dest = `${path}/${trackName}.mp3`;
    const file = fs.createWriteStream(dest);
    try {
      const sendReq = await axios({
        url: track.preview_url,
        method: "GET", // i
        responseType: "stream",
      });

      if (sendReq.status == 200) {
        sendReq.data.pipe(file);

        // close() is async, call cb after close completes
        file.on("finish", () => file.close());
      }
    } catch (e) {
      console.error(e);
      file.close();
    }
  }
  console.info("OK");
}
