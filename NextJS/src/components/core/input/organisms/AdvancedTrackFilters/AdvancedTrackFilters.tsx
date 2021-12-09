import { Album } from "data/cacheDB/dexieDB/models/Album";
import { Artist } from "data/cacheDB/dexieDB/models/Artist";
import { Track } from "data/cacheDB/dexieDB/models/Track";
import { useEffect, useState } from "react";
import { IInterval } from "util/filters/intervalFilters";
import Styled from "./AdvancedTrackFilters.styles";
interface IAdvancedTrackFiltersProps {
  tracks: Track[];
  setFilteredTracks(tracks: Track[]): void;
}

function AdvancedTrackFilters({
  tracks,
  setFilteredTracks,
}: IAdvancedTrackFiltersProps) {
  // Default non-filtered items used as source
  const [albums, setAlbums] = useState<Album[]>([]);
  const [artists, setArtists] = useState<Artist[]>([]);

  // Interval / Sliders

  // State that stores the
  const [dateInterval, setDateInterval] = useState<IInterval<Date>>({
    low: new Date(),
    top: new Date(),
  });

  // State that stores the track duration interval
  const [durationInterval, setDurationInterval] = useState<IInterval<number>>({
    low: 0,
    top: Number.MAX_SAFE_INTEGER,
  });

  // State that stores the Artist popularity interval [0 - 100]
  const [artistPopularityInterval, setArtistPopularityInterval] = useState<
    IInterval<number>
  >({ low: 0, top: 100 });

  // State that stores the album popularity interval [0 - 100]
  const [albumPopularityInterval, setAlbumPopularityInterval] = useState<
    IInterval<number>
  >({ low: 0, top: 100 });

  // Get the current artists and albums + track tags
  useEffect(() => {
    setAlbums(tracks.flatMap((t) => t.album || []));
    setArtists(tracks.flatMap((t) => t.artists));
  }, [tracks]);

  return <></>;
}

export default AdvancedTrackFilters;
