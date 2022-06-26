import fs from "fs";
import csv from "csv-parser";
import { getTrackDetails, ITrackMoods } from "../restQueries/accousticBrainz";
import _ from "lodash";
import dynamoose from "dynamoose";
import SpotifyWebApi from "spotify-web-api-node";
import { getPlaylist } from "../restQueries/getPlaylist";
const subgernres = [
  "blues---electric blues",
  "blues---country blues",

  "classical---opera",
  "classical---romantic",
  "classical---classical",
  "classical---baroque",
  "classical---modern",

  "electronic---ambient",
  "electronic---disco",
  "electronic---downtempo",
  "electronic---drum n bass",
  "electronic---synth-pop",
  "electronic---electro",
  "electronic---house",
  "electronic---new wave",
  "electronic---trip hop",

  "hip hop---gangsta",
  "hip hop---conscious",
  "hip hop---instrumental",
  "hip hop---trip hop",
  "hip hop---pop rap",
  "hip hop---trap",

  "jazz---swing",
  "jazz---soul-jazz",
  "jazz---contemporary jazz",
  "jazz---afro-cuban",

  "latin---reggaeton",
  "latin---flamenco",
  "latin---salsa",
  "latin---samba",
  "latin---cubano",
  "reggae",

  "pop---indie pop",
  "pop---europop",
  "pop---ballad",

  "rock---alternative rock",
  "rock---art rock",
  "rock---goth rock",
  "rock---pop rock",
  "rock---prog rock",
  "rock---hard rock",
  "rock---indie",

  "rock---post-punk",
  "rock---post rock",
  "rock---punk",
  "rock---shoegaze",

  "rock---death metal",
  "rock---heavy metal",
  "rock---nu metal",
  "rock---viking metal",

  "funk / soul---funk ",
  "funk / soul---disco",
  "funk / soul---rhythm & blues",
  "funk / soul---soul",
];

dynamoose.aws.sdk.config.update({
  accessKeyId: "",
  secretAccessKey: "",
  region: "",
});

const DatasetSchema = new dynamoose.Schema(
  {
    PK: String,
    mbid: String,
    subgenres: {
      type: Array,
      schema: [String],
    },
    otherSubgenres: {
      type: Array,
      schema: [String],
    },
    acoustic: Number,
    aggressive: Number,
    happy: Number,
    electronic: Number,
    party: Number,
    relaxed: Number,
    sad: Number,
    album: String,
    artist: String,
    Name: String,
    preview: String,
    popularity: Number,
    type: String,
  },
  { saveUnknown: true }
);
const DatasetDB = dynamoose.model("dataset", DatasetSchema, { create: true });
export interface IBaseTrack {
  mbid: string;

  genre: string;
  subgenres: string[];
  otherSubgenres: string[];
  preview?: string;
  PK?: string;
  popularity?: number;
  type?: "train";
}

const api = new SpotifyWebApi();
api.setAccessToken("");

export async function parseDiscgosAndPersist(path: string) {
  const rows = [];

  let tracks: IBaseTrack[] = [];

  return new Promise<void>((resolve, reject) => {
    fs.createReadStream(path)
      .pipe(csv())
      .on("data", async (data) => {
        rows.push(data);
      })
      .on("end", async () => {
        console.info("Parsing csv rows");
        for (const data of rows) {
          const subgenres = [];

          const otherSub = [];
          for (let i = 2; i <= 30; i++) {
            const genre = data["genre" + i];

            if (!genre || genre.length === 0) {
              break;
            } else if (subgernres.includes(genre)) {
              subgenres.push(genre);
            } else {
              otherSub.push(genre);
            }
          }
          const genre = _.head(
            _(subgenres.map((g) => g.split("--")[0]))
              .countBy()
              .entries()
              .maxBy(_.last)
          );

          if (subgenres.length > 0) {
            tracks.push({
              mbid: data["recordingmbid"],
              genre: genre,
              subgenres: subgenres,
              otherSubgenres: otherSub,
            });
          }

          if (tracks.length > 20) {
            const res = await getTrackDetails(tracks);
            for (const d of res) {
              await discogs2spotify(d);
            }
            const withPreview = res.filter((d) => d.preview && d.PK);
            console.log(withPreview);

            if (withPreview.length) {
              try {
                DatasetDB.batchPut(
                  Array.from(
                    new Map<string, ITrackMoods>(
                      withPreview.map((i) => [i.PK, i])
                    ).values()
                  )
                );
              } catch (e) {
                console.error(e);
              }
            }
            await setTimeout(() => 1000, 10000);
            tracks = [];
          }
        }
        resolve();
      });
  });
}

async function discogs2spotify(discog: ITrackMoods) {
  const name = discog.name;
  const artist = discog.artist;
  if (!name || !artist) {
    return;
  }
  const q = `track:${name} artist:${artist}`;
  try {
    const res = await api.searchTracks(q, { limit: 30 });
    const previews = res.body.tracks.items
      .filter((t) => t.preview_url && t.popularity > 5)
      .sort((a, b) => b.popularity - a.popularity);

    if (previews.length) {
      discog.preview = previews[0].preview_url;
      discog.PK = previews[0].id;
      discog.popularity = previews[0].popularity;
      discog.type = "train";
    }
  } catch (e) {
    console.error(e);
  }
}

export async function playlist2dynamodb(
  playlistId: string,
  genre: string,
  subgenres: string[]
) {
  const tracks = (await getPlaylist(api, playlistId)).filter(
    (t) => t.preview_url
  );
  console.log(tracks.length);
  for (const chunk of _.chunk(tracks, 25)) {
    try {
      console.log(chunk);
      await DatasetDB.batchPut(
        chunk.map((t) => ({
          PK: t.id,
          preview: t.preview,
          popularity: t.popularity,
          type: "train",
          genre: genre,
          subgenres: subgenres,
        }))
      );
    } catch (e) {
      console.error(e);
    }
  }
}
