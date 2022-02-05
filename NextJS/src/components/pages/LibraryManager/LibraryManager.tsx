import TrackSelectorView from "components/core/cards/views/TrackSelectorView";
import { Track } from "data/cacheDB/dexieDB/models/Track";
import { useDataFacade } from "hooks/dataFacade/useDataFacade";
import { trackSortingOptions } from "hooks/sorters/useTrackSorter";
import { useEffect, useState } from "react";
import { useClientsStore } from "store/useClients";
import { sortByName } from "util/sorters/commonSoters";
import Styled from "./LibraryManager.styles";
import LibraryManagerTopTab from "./LibraryManagerTopTab";
interface ILibraryManagerProps {}

function LibraryManager(props: ILibraryManagerProps): JSX.Element {
  const db = useClientsStore((s) => s.cacheClient);
  const { getTracksByIds } = useDataFacade();
  const [cachedTracks, setCachedTracks] = useState<Track[]>([]);
  const [selectedTracks, setSelectedTracks] = useState<Track[]>([]);
  const [selTracksBack, setSelTracksBack] = useState<Track[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fn = async () => {
      setIsLoading(true);
      const cached = await db.getSavedTracks();
      const r = await getTracksByIds(cached.map((t) => t.spotifyId));
      setSelectedTracks(r);
      const t = r.sort(sortByName);
      setCachedTracks(t);
      setSelTracksBack([...t]);
      setIsLoading(false);
    };
    fn();
  }, [db, getTracksByIds]);

  return (
    <Styled.SpaceY>
      <Styled.Center>
        <h1>Library Manager</h1>
      </Styled.Center>
      <Styled.Center>
        <LibraryManagerTopTab
          resetTrackSel={() => {
            setSelectedTracks([...selTracksBack]);
          }}
          cachedTracks={cachedTracks}
          setIsLoading={setIsLoading}
          setTracks={setSelectedTracks}
        />
      </Styled.Center>
      <TrackSelectorView
        tracks={selectedTracks}
        settings={{
          isLoading: isLoading,
          defaultTrackSort: trackSortingOptions.DEFAULT,
        }}
      />
    </Styled.SpaceY>
  );
}

export default LibraryManager;
