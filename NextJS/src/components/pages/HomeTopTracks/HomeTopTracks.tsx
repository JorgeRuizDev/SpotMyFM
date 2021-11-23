import SkelletonList from "components/core/cards/listCards/SkeletonList";
import TrackSelectorView from "components/core/cards/views/TrackSelectorView";
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
  console.log(isLoading);
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
        <TrackSelectorView
          tracks={trackList || []}
          settings={{ isLoading: isLoading }}
        />
      ) : (
        ""
      )}
    </>
  );
}
