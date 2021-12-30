import TrackSelectorView from "components/core/cards/views/TrackSelectorView";
import { Track } from "data/cacheDB/dexieDB/models/Track";
import { trackSortingOptions } from "hooks/sorters/useTrackSorter";
import { useEffect, useState } from "react";
import { useClientsStore } from "store/useClients";
import Styled from "./LibraryManager.styles";
interface ILibraryManagerProps {}

function LibraryManager(props: ILibraryManagerProps) {
  const db = useClientsStore((s) => s.cacheClient);
  const [selectedTracks, setSelectedTracks] = useState<Track[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fn = async () => {
      setIsLoading(true);
      const r = await db.getSavedTracks();
      setSelectedTracks(r);
      setIsLoading(false);
    };
    fn();
  }, [db]);

  return (
    <>
      <TrackSelectorView
        tracks={selectedTracks}
        settings={{ isLoading: isLoading, defaultTrackSort: trackSortingOptions.ALBUM_NAME }}
      />
    </>
  );
}

export default LibraryManager;
