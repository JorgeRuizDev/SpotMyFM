import { Track } from "data/cacheDB/dexieDB/models/Track";
import { useDataFacade } from "hooks/dataFacade/useDataFacade";
import useTrackToPlaylistSelector from "hooks/tracksToPlaylist/useTrackToPlaylistSelector";
import { useCallback, useEffect, useState } from "react";
import { isMobile } from "react-device-detect";
import { toast } from "react-toastify";
import { useClientsStore } from "store/useClients";
import {
  ListTrackCard,
  ListTrackCardHeader,
} from "../../listCards/ListTrackCard";
import SimpleTrackCard from "../../simpleCards/SimpleTrackCard";
import GenericCardView from "../GenericCardView";
import { ViewTypeOption } from "../GenericCardView/GenericCardView";
import TrackView from "../TrackView";
import Styled from "./RecommendationView.styles";
import useTranslation from "next-translate/useTranslation";
interface IRecommendationViewProps {
  tracks: Track[];
  selectedTracks: Track[];
  setRecommendations: (tracks: Track[]) => void;
}

/* A React component that is rendering a list of tracks. */
function RecommendationView({
  tracks,
  setRecommendations,
  selectedTracks,
}: IRecommendationViewProps): JSX.Element {
  const [recommended, setRecommended] = useState<Track[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [mute, setMute] = useState(false);
  const [hover, setHover] = useState(!isMobile);
  const { ludwigApi } = useClientsStore();
  const { getTracksByIds } = useDataFacade();
  const [currentView, setCurrentView] = useState<ViewTypeOption>(
    isMobile ? "LIST" : "GRID"
  );
  const { t } = useTranslation();

  useEffect(() => {
    toast.info("Add tracks to your playlist!");
  });

  useEffect(() => {
    const fn = async () => {
      setIsLoading(true);
      const [recommended, error] = await ludwigApi.getRecommendationsBulk(
        tracks
      );

      if (!recommended || error) {
        return toast.error("Error getting recommendations " + error?.message);
      }

      const ids: string[] = [];

      for (const [id, recommendations] of recommended) {
        ids.push(recommendations[0]);
        //ids.push(...recommendations.users.flatMap(r => r.spotify_ids))
      }

      if (ids.length === 0) {
        setIsLoading(false);
        toast.warn("No Recommendations Found");
        return;
      }
      const recTracks = await getTracksByIds(ids);
      setRecommended(recTracks);
      //setRecommended(recommended)
      setIsLoading(false);
    };

    fn();
  }, [getTracksByIds, ludwigApi, tracks]);

  const { addAll, contains, removeAll, toggleFromPlaylist, trackSet } =
    useTrackToPlaylistSelector();

  useEffect(() => {
    selectedTracks.forEach((t) => {
      !contains(t) && toggleFromPlaylist(t);
    });
  }, [selectedTracks, toggleFromPlaylist]);

  // on component unmount:
  useEffect(() => {
    return () => {
      setRecommendations(Array.from(trackSet.values()));
    };
  }, [setRecommendations, trackSet]);

  return (
    <Styled.Wrapper>
      <h1>{t("cards:recommended_tracks")}</h1>

      <h3>{t("cards:tracks_selected2", { "%size%": trackSet.size })}</h3>
      <GenericCardView
        setView={setCurrentView}
        view={
          currentView === "GRID"
            ? { type: currentView }
            : { type: currentView, ListHeader: <ListTrackCardHeader /> }
        }
        isLoading={isLoading}
      >
        {currentView === "GRID"
          ? recommended.map((t, i) => (
              <SimpleTrackCard
                track={t}
                key={i}
                inPlaylist={contains(t)}
                toggleFromPlaylist={() => toggleFromPlaylist(t)}
                isMuted={false}
                playOnHover={hover}
              />
            ))
          : recommended.map((t, i) => (
              <ListTrackCard
                track={t}
                pos={i + 1}
                key={i}
                inPlaylist={contains(t)}
                toggleFromPlaylist={() => toggleFromPlaylist(t)}
              />
            ))}
      </GenericCardView>
    </Styled.Wrapper>
  );
}

export default RecommendationView;
