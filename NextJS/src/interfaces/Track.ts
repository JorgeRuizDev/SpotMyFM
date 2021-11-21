import { Track } from "data/cacheDB/dexieDB/models/Track";

export interface selectManager {
  isSelected: (t: Track) => boolean;
  toggleSelected: (t: Track) => void;
}

export interface trackViewSettings {
  defaultTrackSort?: string;
  isLoading?: boolean;
  isNested?: boolean;
}