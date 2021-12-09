import { Album } from "data/cacheDB/dexieDB/models/Album";
import { Artist } from "data/cacheDB/dexieDB/models/Artist";
import { Track } from "data/cacheDB/dexieDB/models/Track";

export interface IInterval<generic> {
  low: generic;
  top: generic;
}

/**
 * Checks if a track's length is inside a given interval.
 * @param t: Track Object
 * @param interval Interval of numbers
 * @returns boolean
 */
export function trackLengthIntervalFilter(
  t: Track,
  interval: IInterval<number>
): boolean {
  const length = t.spotifyDurationMS;
  return interval.low <= length && interval.top >= length;
}

/**
 * Checks if an spotify object popularity is inside a given interval.
 * If the object has no popularity, the default popularity is 0.
 * @param {Track|Album|Artist} item
 * @param {IInterval<number>} interval
 * @returns boolean
 */
export function spotifyPopularityFilter(
  item: Track | Album | Artist,
  interval: IInterval<number>
): boolean {
  const pop = item.spotifyPopularity || 0;
  return interval.low <= pop && interval.top >= pop;
}

/**
 * Checks if an album release date is inside a given date interval.
 * @param {Album} album
 * @param {IInterval<Date>} interval
 * @returns boolean.
 */
export function albumReleaseDateFilter(
  album: Album,
  interval: IInterval<Date>
): boolean {
  const time = album.spotifyReleaseDate?.getTime() || 0;
  return interval.low.getTime() <= time && time <= interval.top.getTime();
}
