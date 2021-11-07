import { DynamoDB } from "./dynamoDB/DynamoDB";

export interface IBackendDB {
  /**
   * Updates the lastLogin attribute with the current timestamp
   * @param {string} userId
   * @returns {boolean} if the update has been successful.
   */
  updateLastLogin(userId: string): Promise<Date>;

  /**
   * Checks if a user has the admin role.
   * @param userId
   * @returns {boolean} if the update has been successful.
   */
  isUserAdmin(userId: string): Promise<boolean>;
}

export const backendDB: IBackendDB = new DynamoDB();
