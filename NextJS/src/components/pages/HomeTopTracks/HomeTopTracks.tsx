import ArtistView from "components/core/cards/views/ArtistView";
import TrackSelectorView from "components/core/cards/views/TrackSelectorView";
import GetMyTopSelector from "components/pages/HomeTopTracks/GetMyTopSelector";

import Head from "components/util/Head";
import { Artist } from "data/cacheDB/dexieDB/models/Artist";
import { Track } from "data/cacheDB/dexieDB/models/Track";
import Styled from "./HomeTopTracks.styles";
import React, { useEffect, useState } from "react";
import { useSessionStore } from "store/useSession";
import { ActivePage } from "enums/ActivePage";
import useTranslation from "next-translate/useTranslation";

export default function HomeTopTracks() {
  const { t } = useTranslation();
  const [trackList, setTrackList] = useState<Track[] | undefined>([]);

  const [artistList, setArtistList] = useState<Artist[] | undefined>([]);

  const [isLoading, setIsLoading] = useState(true);

  const [type, setType] = useState<string>(t("home:tracks") || "Tracks");

  const setActivePage = useSessionStore().setActivePage;

  useEffect(() => {
    setActivePage(ActivePage.LIBRARY_MGR);
  }, [setActivePage]);

  return (
    <>
      <Head subtitle={t("home:top-type", { 0: type })} />
      <Styled.Title>{t("home:users-top-type", { 0: type })}</Styled.Title>
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
