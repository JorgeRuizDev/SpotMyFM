import TrackView from "components/core/cards/views/TrackView";
import GetMyTopSelector from "components/pages/HomeTopTracks/GetMyTopSelector";

import Head from "components/util/Head";
import { Artist } from "data/cacheDB/dexieDB/models/Artist";
import { Track } from "data/cacheDB/dexieDB/models/Track";

import React, { useState } from "react";

export default function HomeTopTracks() {
  const [trackList, setTrackList] = useState<Track[] | undefined>([]);

  const [artistList, setArtistList] = useState<Artist[] | undefined>([]);

  const [isLoading, setIsLoading] = useState(true);

  const [type, setType] = useState<string>("Tracks");
  console.log();
  return (
    <>
      <Head subtitle={`Top ${type}`} />
      <h1>{`User's Top ${type}`}</h1>
      <GetMyTopSelector
        setTracks={setTrackList}
        setArtists={setArtistList}
        setHeaderType={setType}
        setIsLoading={setIsLoading}
      />

      {trackList !== undefined ? (
        <TrackView tracks={trackList || []} isLoading={isLoading} />
      ) : (
        ""
      )}
    </>
  );
}
