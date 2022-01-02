import * as dynamoose from "dynamoose";
import { Document } from "dynamoose/dist/Document";
export const UserSchema = new dynamoose.Schema(
  {
    PK: String,
    spotifyId: String,
    lastLogin: Date,
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  {
    saveUnknown: true,
    timestamps: true,
  }
);
