import { Album } from "data/cacheDB/dexieDB/models/Album";
import { Artist } from "data/cacheDB/dexieDB/models/Artist";
import { Track } from "data/cacheDB/dexieDB/models/Track";
import Styled from "./TrackIntervalFilters.styles";
interface ITrackIntervalFiltersProps {
  tracks: Track[];
  albums: Album[];
  artists: Artist[];
  setFilteredTracks: (tracks: Track[]) => void;
}

function TrackIntervalFilters({
  tracks,
  albums,
  artists,
  setFilteredTracks,
}: ITrackIntervalFiltersProps) {
  return <></>;
}

export default TrackIntervalFilters;
