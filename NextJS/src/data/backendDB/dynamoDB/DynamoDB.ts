import { IBackendDB } from "data/backendDB/BackendDB";
import * as dynamoose from "dynamoose";
import cfg from "config";
import env from "env";
import { User, UserModel } from "data/backendDB/dynamoDB/UserModel";
import { ITaggedAlbum } from "pages/api/database/albums/tagAlbums";
import * as DynamoErr from "./errors/errorHandler";
import { Track, TrackModel } from "./TrackModel";
import { IMirResult } from "../../../interfaces/ludwig";

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
    if (env.DYNAMOOSE_LOCAL) {
      dynamoose.aws.ddb.local(env.DYNAMOOSE_LOCAL);
    }
  }

  updateLastLogin(userId: string): Promise<Date> {
    throw new Error("Method not implemented.");
  }

  /**
   * Creates a new user and persists it
   * @param userId: User id / Document id
   * @param attr Extra attributes to add to the document
   * @returns [user if success], [null otherwise]
   */
  async _createUser(userId: string, attr?: { [k: string]: any }) {
    const usr = new User({ [cfg.dynamo.PK]: userId, ...attr });

    try {
      await usr.save();
      return usr;
    } catch (err) {
      return null;
    }
  }

  /**
   * Drops the given user
   * @param userId UserId
   */
  async dropUser(userId: string): Promise<boolean> {
    const [user, err] = await this.getFullUser(userId);

    if (err) {
      return false;
    }

    // If there is no document ,But the JWT is OK, return a successful drop,
    // even if there was no data
    if (!user) {
      return true;
    }

    await user.delete();

    return true;
  }

  /**
   *
   * Get's a full user document.
   *
   * @param userId user id / document / id
   * @returns [null, null] if the user does not exist, [null, err] if there was an error, [user, null] if the op was successful
   */
  async getFullUser(userId: string): Promise<[UserModel | null, any]> {
    try {
      if (!userId || userId.length === 0) {
        return [null, "Invalid user id"];
      }

      const res = await User.query(cfg.dynamo.PK).eq(userId).exec();

      if (res.count === 0) {
        return [null, null];
      } else if (res.count !== 1) {
        return [null, "The Number of read users seems inconsistent"];
      }

      return [res[0], null];
    } catch (e) {
      return [null, e];
    }
  }

  /**
   * Checks if a user has the admin role.
   * @param userId user id
   * @returns true / false.
   */
  async isUserAdmin(userId: string): Promise<boolean> {
    try {
      const res = await User.query(cfg.dynamo.PK)
        .eq(userId)
        .attributes(["isAdmin"])
        .exec();

      if (res.count != 1) {
        return false;
      }

      return res[0].isAdmin;
    } catch (e) {
      return false;
    }
  }

  /**
   * Get's all album tags of a user.
   * An album tag is identified by the prefix  "{dynamo.album_prefix}:" -> ex ALBM:{albumId}
   * @param userId User ID / Document ID
   * @returns [null, any] if error (Being any the error). [An array of tagged albums, null] if success
   */
  async getAllAlbumTags(userId: string): Promise<[ITaggedAlbum[] | null, any]> {
    try {
      const [res, err] = await this.getFullUser(userId);

      if (!res) {
        return [[], null];
      } else if (err) {
        return [null, err];
      }

      const usr = res.original() || {};

      const taggedAlbums: ITaggedAlbum[] = [];

      // For each attribute, find the ones corresponding to albums
      for (const [k, v] of Object.entries(usr)) {
        if (k.startsWith(cfg.dynamo.album_prefix + ":")) {
          // Push them into the list with the key identifier removed
          taggedAlbums.push({
            id: k.substring(cfg.dynamo.album_prefix.length + 1),
            tags: v,
          });
        }
      }

      return [taggedAlbums, null];
    } catch (e) {}
    return [null, null];
  }

  /**
   *
   * Updates the user with the new album tags, if the user does not exist creates it.
   *
   * @param userId: User ID / Document ID
   * @param tags: Current album tags
   * @returns [null, any] if error, ["ok", null] if the operation was successful
   */
  async putAlbumTags(
    userId: string,
    tags: ITaggedAlbum[]
  ): Promise<["ok" | null, any]> {
    const updateObj: { [k: string]: string[] } = {};
    for (const album of tags) {
      updateObj[`${cfg.dynamo.album_prefix}:${album.id}`] = album.tags;
    }
    try {
      await User.update({ PK: userId }, updateObj, {
        // Update only if the document exists
        condition: new dynamoose.Condition().attribute(cfg.dynamo.PK).exists(),
      });
      return ["ok", null];
    } catch (err) {
      // If the document does not exist, create it
      if (DynamoErr.isConditionalCheck(err)) {
        const user = await this._createUser(userId, updateObj);

        if (!user) {
          return [null, "There was a problem while creating the user"];
        }

        return ["ok", null];
      } else {
        return [null, err];
      }
    }
  }

  /**
   * It takes an array of trackIds, and returns an array of two arrays: the first array contains the full tracks (tracks
   * that have all the required attributes), and the second array contains the ids of the tracks that are missing some
   * attributes
   * @param {string[]} trackIds - an array of trackIds to get the details for.
   * @returns [[fullTracks.filter(t => t), missingTracks], null]
   */
  async getTracksDetails(
    trackIds: string[]
  ): Promise<[[TrackModel[], string[]] | null, any]> {
    // remove trackIds duplicates:
    trackIds = [...new Set(trackIds)];

    try {
      const tracks = await Track.batchGet(trackIds);
      console.log(tracks);
      const fullTracks = tracks.filter(
        (t) =>
          t.genres?.length &&
          t.subgenres?.length &&
          t.relaxed &&
          t.happy &&
          t.sad &&
          t.acoustic &&
          t.aggressive &&
          t.electronic
      );

      // get the ids of the tracks that are not in fullTracks
      const missingTracks = trackIds.filter(
        (t) => !fullTracks.find((ft) => ft.PK === t)
      );

      return [[fullTracks.filter((t) => t), missingTracks], null];
    } catch (err: any) {
      return [null, err];
    }
  }

  /**
   * It takes an array of tracks, and adds or updates them in the database
   * @param {{
   *         id: string;
   *         genres: IMirResult[];
   *         moods: IMirResult[];
   *         subgenres: IMirResult[];
   *     }[]} tracks - {
   * @returns An array of two elements. The first element is an array of track ids. The second element is an error
   * object.
   */
  async addTrackDetails(
    tracks: {
      id: string;
      genres: IMirResult[];
      moods: IMirResult[];
      subgenres: IMirResult[];
    }[]
  ): Promise<[string[] | null, any]> {
    //@ts-ignore
    const tracksRequest: TrackModel[] = tracks.map((t) => {
      return {
        PK: t.id,
        genres: t.genres,
        subgenres: t.subgenres,
        happy: t.moods.filter((m) => m.label === "happy")[0],
        relaxed: t.moods.filter((m) => m.label === "relaxed")?.[0],
        sad: t.moods.filter((m) => m.label === "sad")?.[0],
        acoustic: t.moods.filter((m) => m.label === "acoustic")?.[0],
        aggressive: t.moods.filter((m) => m.label === "aggressive")?.[0],
        electronic: t.moods.filter((m) => m.label === "electronic")?.[0],
      };
    });

    try {
      // add or update all the tracksRequest to the database
      const tracksResponse = await Track.batchPut(tracksRequest);

      return [tracks.map((t) => t.id), null];
    } catch (err) {
      return [null, err];
    }
  }
}
