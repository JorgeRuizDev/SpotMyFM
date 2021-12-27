import LoadingSpinner from "components/core/display/atoms/LoadingSpinner";
import ProgressBar from "components/core/display/atoms/ProgressBar";
import { facadeStatus } from "hooks/dataFacade/useDataFacade";
import { useEffect, useState } from "react";

import Styled from "./CachingInProgress.styles";

type CachingStatus = facadeStatus | "loading";

interface ICachingInProgressProps {
  status: CachingStatus;
  progress: number;
}

function CachingInProgress({ status, progress }: ICachingInProgressProps) {
  const [showProgress, setShowProgress] = useState(false);
  const [title, setTitle] = useState("");
  // On status change: Hide the progress bar
  useEffect(() => setShowProgress(false), [status]);

  useEffect(() => {
    switch (status) {
      case "loading":
        setTitle("Loading your library from Spotify");
        break;
      case "gettingLastTags":
        setTitle("Getting Album Tags from LastFM.com");
        setShowProgress(true);
        break;
      case "fetchingMissTracks":
        setTitle("Getting your non cached tracks from Spotify");
        break;
      case "parsingTracks":
        setTitle("Processing your tracks");
        break;
      case "gettingTracks":
        setTitle("Getting your tracks");
        break;
      case "gettingAlbums":
        setTitle("Getting your albums");
        break;
      case "gettingArtists":
        setTitle("Getting your artists");
        break;
    }
  }, [status]);

  return (
    <Styled.FlexRow>
      <Styled.NotificationWrapper>
        <LoadingSpinner />

        <Styled.b>{title}</Styled.b>
      </Styled.NotificationWrapper>

      <Styled.ProgressWrapper>
        {showProgress && <ProgressBar percentage={progress} />}
      </Styled.ProgressWrapper>
    </Styled.FlexRow>
  );
}

export default CachingInProgress;
