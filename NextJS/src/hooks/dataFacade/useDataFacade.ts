import { CacheDb } from "data/cacheDB/CacheDB";
import { useState } from "react";
import { useClientsStore } from "store/useClients";
import { SpotifyClient as spotify } from "restClients/spotify/spotifyClient";
import _ from "lodash";

export function useDataFacade() {
  const getTracksByIds = (spotifyIds: string[]) => {};
  const { cacheClient: cache, spotifyApi } = useClientsStore();

  const getTracks = (
    tracks: SpotifyApi.TrackObjectFull,
    checkIfCached = false
  ) => {};

  const getArtists = async (artists: SpotifyApi.ArtistObjectFull[]) => {
    const missingIds = new Set(
      await cache.getMissingArtists(artists.map((a) => a.id))
    );
    const parsedArtists = spotify.spotifyArtists2Artists(artists);
    const missing = parsedArtists.filter((a) => missingIds.has(a.spotifyId));
    await cache.addArtists(missing);
    return parsedArtists;
  };

  const getArtistsById = async (spotifyIds: string[]) => {
    const missingArtists = await cache.getMissingArtists(spotifyIds);
    console.log(missingArtists);
    const missingArtistsObjects = await spotifyApi.getFullArtists(
      missingArtists
    );
    const parsedArtists = spotify.spotifyArtists2Artists(missingArtistsObjects);
    await cache.addArtists(parsedArtists);
    return await cache.getArtistsBySpotifyId(spotifyIds);
  };

  return { getArtists, getArtistsById };
}

function sortSpotifyObjects<E extends { id: string }>(
  collection: E[],
  order: string[]
) {
  return _.sortBy(collection, (item) => order.indexOf(item.id));
}
