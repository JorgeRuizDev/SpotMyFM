import * as dynamoose from "dynamoose";
import env from "env";

import { UserModel, UserSchema } from "data/backendDB/dynamoDB/UserSchema";

export const User = dynamoose.model<UserModel>(
  env.DYNAMOSE_USER_TABLE,
  UserSchema,
  {
    create: true,
  }
);

User.get("").then((x) => x.model);
