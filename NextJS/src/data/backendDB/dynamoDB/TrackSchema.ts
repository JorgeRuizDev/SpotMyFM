import * as dynamoose from "dynamoose";


const MIR_RES = {"type": Object, "schema": {"label": String, "confidence": Number}}

export const TrackSchema = new dynamoose.Schema(
  {
    PK: String,

  },
  {
    saveUnknown: true,
    timestamps: true,
  }
);
