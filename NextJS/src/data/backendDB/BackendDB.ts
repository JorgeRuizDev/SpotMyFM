import { DynamoDB } from "./dynamoDB/DynamoDB";

export interface IBackendDB {
  /**
   * Returns the last time a user has logged in.
   * @param {string} userId
   * @returns {Date}
   */
  getLastLogin(userId: string): Date;

  /**
   * Updates the lastLogin attribute with the current timestamp
   * @param {string} userId
   * @returns {boolean} if the update has been successful.
   */
  updateLastLogin(userId: string): boolean;

  /**
   * Checks if a user has the admin role.
   * @param userId
   * @returns {boolean} if the update has been successful.
   */
  isUserAdmin(userId: string): boolean;
}

export const backendDB: IBackendDB = new DynamoDB();
