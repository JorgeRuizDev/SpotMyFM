import { ITaggedAlbum } from "pages/api/database/albums/tagAlbums";
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

  dropUser(userId: string): Promise<boolean>;

  /**
   * Gets all the user album tags
   * @param userId
   */
  getAllAlbumTags(userId: string): Promise<[ITaggedAlbum[] | null, any]>;

  /**
   * Add / updates a list of album tags to a user.
   * @param userId
   * @param tags
   */
  putAlbumTags(
    userId: string,
    tags: ITaggedAlbum[]
  ): Promise<["ok" | null, any]>;
}

export const backendDB: IBackendDB = new DynamoDB();
