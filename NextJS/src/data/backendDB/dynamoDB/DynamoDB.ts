import { IBackendDB } from "data/backendDB/BackendDB";
import * as dynamoose from "dynamoose";
import env from "env";
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

  updateLastLogin(userId: string): boolean {
    throw new Error("Method not implemented.");
  }
  isUserAdmin(userId: string): boolean {
    throw new Error("Method not implemented.");
  }
  getLastLogin(userId: string): Date {
    throw new Error("Method not implemented.");
  }
}
