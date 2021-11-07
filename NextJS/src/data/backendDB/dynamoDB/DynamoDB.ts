import { IBackendDB } from "data/backendDB/BackendDB";
import * as dynamoose from "dynamoose";
import env from "env";
import { User } from "data/backendDB/dynamoDB/UserModel";
export class DynamoDB implements IBackendDB {
  /**
   * Constructor
   */
  constructor() {
    dynamoose.aws.sdk.config.update({
      accessKeyId: env.AWS_ACCESS_KEY_ID,
      secretAccessKey: env.AWS_SECRET_ACCESS_KEY,
      region: env.AWS_REGION,
    });
  }
  updateLastLogin(userId: string): Promise<Date> {
    throw new Error("Method not implemented.");
  }

  async isUserAdmin(userId: string): Promise<boolean> {
    try {
      const res = await User.query("PK")
        .eq(userId)
        //.attributes(["isAdmin"])
        .exec();

      if (res.count != 1) {
        return false;
      }

      return res[0].isAdmin;
    } catch (e) {
      console.error(e);
      return false;
    }
  }
}
