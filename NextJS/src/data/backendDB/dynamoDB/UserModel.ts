import * as dynamoose from "dynamoose";
import { Document } from "dynamoose/dist/Document";
import env from "env";

import { UserSchema } from "data/backendDB/dynamoDB/UserSchema";

class UserModel extends Document {
  PK: string = "";
  spotifyId = "";
  lastLogin: Date = new Date();
  isAdmin: boolean = false;
}

export const User = dynamoose.model<UserModel>(
  env.DYNAMOSE_USER_TABLE,
  UserSchema,
  {
    create: true,
  }
);
