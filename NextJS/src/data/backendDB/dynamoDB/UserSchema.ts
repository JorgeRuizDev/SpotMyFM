import * as dynamoose from "dynamoose";
import { Document } from "dynamoose/dist/Document";
export const UserSchema = new dynamoose.Schema(
  {
    id: String,
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

export class UserModel extends Document {
  id: string = "";
  lastLogin: Date = new Date();
  isAdmin: boolean = false;
}
