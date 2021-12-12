import ArtistView from "components/core/cards/views/ArtistView";
import TrackSelectorView from "components/core/cards/views/TrackSelectorView";
import GetMyTopSelector from "components/pages/HomeTopTracks/GetMyTopSelector";

import Head from "components/util/Head";
import { Artist } from "data/cacheDB/dexieDB/models/Artist";
import { Track } from "data/cacheDB/dexieDB/models/Track";
import Styled from "./HomeTopTracks.styles";
import React, { useState } from "react";

export default function HomeTopTracks() {
  const [trackList, setTrackList] = useState<Track[] | undefined>([]);

  const [artistList, setArtistList] = useState<Artist[] | undefined>([]);

  const [isLoading, setIsLoading] = useState(true);

  const [type, setType] = useState<string>("Tracks");
  return (
    <>
      <Head subtitle={`Top ${type}`} />
      <Styled.Title>{`User's Top ${type}`}</Styled.Title>
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
        <ArtistView
          artists={artistList || []}
          settings={{ isLoading: isLoading }}
        />
      )}
    </>
  );
}
