import TrackSelectorView from "components/core/cards/views/TrackSelectorView";
import { Track } from "data/cacheDB/dexieDB/models/Track";
import { trackSortingOptions } from "hooks/sorters/useTrackSorter";
import { useEffect, useState } from "react";
import { useClientsStore } from "store/useClients";
import Styled from "./LibraryManager.styles";
import LibraryManagerTopTab from "./LibraryManagerTopTab";
interface ILibraryManagerProps {}

function LibraryManager(props: ILibraryManagerProps): JSX.Element {
  const db = useClientsStore((s) => s.cacheClient);
  const [cachedTracks, setCachedTracks] = useState<Track[]>([]);
  const [selectedTracks, setSelectedTracks] = useState<Track[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fn = async () => {
      setIsLoading(true);
      const r = await db.getSavedTracks();
      setSelectedTracks(r);
      setCachedTracks(r);
      setIsLoading(false);
    };
    fn();
  }, [db]);

  return (
    <Styled.SpaceY>
      <Styled.Center>
        <h1>Library Manager</h1>
      </Styled.Center>
      <Styled.Center>
        <LibraryManagerTopTab
          cachedTracks={cachedTracks}
          setIsLoading={setIsLoading}
          setTracks={setSelectedTracks}
        />
      </Styled.Center>
      <TrackSelectorView
        tracks={selectedTracks}
        settings={{
          isLoading: isLoading,
          defaultTrackSort: trackSortingOptions.TRACK_NAME,
        }}
      />
    </Styled.SpaceY>
  );
}

export default LibraryManager;
