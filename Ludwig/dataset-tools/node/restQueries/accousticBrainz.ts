import axios from "axios";
import { IBaseTrack } from "../util/discogs2db";

interface IMoodsProb {
  acoustic: number;
  electronic: number;
  happy: number;
  party: number;
  sad: number;
  relaxed: number;
  aggressive: number;
}

export interface ITrackMoods extends IBaseTrack, IMoodsProb {
  name: string;
  artist: string;
  album: string;
}

export async function getTrackDetails(brainzTracks: IBaseTrack[]) {
  const res = await axios.get(
    "https://acousticbrainz.org/api/v1/high-level?recording_ids=" +
      brainzTracks.map((t) => t.mbid).join(";"),
    { method: "GET" }
  );

  const trackAndMoods: ITrackMoods[] = [];

  for (const brainz of brainzTracks) {
    const d = res.data[brainz.mbid]?.["0"];
    const hl = d?.highlevel;
    const meta = d?.metadata?.tags;

    if (!d || !hl || !meta) {
      continue;
    }

    const moods: IMoodsProb = {
      acoustic: hl.mood_acoustic.all.acoustic,
      aggressive: hl.mood_aggressive.all.aggressive,
      electronic: hl.mood_electronic.all.electronic,
      happy: hl.mood_happy.all.happy,
      party: hl.mood_party.all.party,
      relaxed: hl.mood_relaxed.all.relaxed,
      sad: hl.mood_sad.all.sad,
    };

    trackAndMoods.push({
      ...brainz,
      ...moods,
      album: meta?.album?.[0],
      artist: meta?.artist?.[0],
      name: meta?.title?.[0],
    });
  }

  return trackAndMoods;
}
