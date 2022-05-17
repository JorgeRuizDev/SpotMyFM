import * as dynamoose from "dynamoose";
import { Document } from "dynamoose/dist/Document";
import env from "env";
import { TrackSchema } from "./TrackSchema";
import {IMirResult} from "../../../interfaces/ludwig";




export class TrackModel extends Document {
  PK: string = "";
  similar_ids?: string[] = [];
  recommended_ids?: string[] = []
  genres?: IMirResult[] = []
  subgenres?: IMirResult[] = []
  happy?: IMirResult
  sad?: IMirResult
  electronic?: IMirResult
  acoustic?: IMirResult
  aggressive?: IMirResult
  relaxed?: IMirResult
  ludwig_version: number = -1;
}

export const Track = dynamoose.model<TrackModel>(
  env.DYNAMOOSE_TRACK_TABLE,
  TrackSchema,
  {
    create: true,
  }
);
