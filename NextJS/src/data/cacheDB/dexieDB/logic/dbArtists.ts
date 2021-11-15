import _ from "lodash";
import { db } from "./db";


/**
 * Gets all the artists stored in the DB by their respective spotify Id.
 *
 * @export
 * @param {string[]} artistIds
 * @return {*} Artist array ordered in the same order as the id array.
 */
export async function getArtistsBySpotifyId(artistIds: string[]) {
  const artists = await db.artists
    .where("spotifyId")
    .anyOf(artistIds)
    .toArray();
	
		return _.sortBy(artists, (a) => artistIds?.indexOf(a.spotifyId));
}
