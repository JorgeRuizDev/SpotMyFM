import { Album } from "data/cacheDB/dexieDB/models/Album";
import { Artist } from "data/cacheDB/dexieDB/models/Artist";
import { Track } from "data/cacheDB/dexieDB/models/Track";
import React, { useEffect, useState } from "react";
import Styled from "./AdvancedTrackFilters.styles";
import TrackIntervalFilters from "./TrackIntervalFilters";
import TrackPillFilters from "./TrackPillFilters";
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

  const [abvIntervalAlbums, setAbvIntervalAlbums] = useState<Album[]>([]);

  const [filteredPills, setFilteredPills] = useState<Track[]>([]);
  const [filteredIntervals, setFilteredIntervals] = useState<Track[]>([]);

  // Interval / Sliders

  // Get the current artists and albums + track tags
  useEffect(() => {
    setAlbums(tracks.flatMap((t) => t.album || []));
    setArtists(tracks.flatMap((t) => t.artists));
  }, [tracks]);

  // Get the pill filtered result and set the tracks as the album filter
  useEffect(() => {
    setAbvIntervalAlbums(filteredPills.flatMap((t) => t.album || []));
  }, [filteredPills]);

  // Return the filtered interval as the filter results:
  useEffect(() => {
    setFilteredTracks(filteredIntervals);
  }, [filteredIntervals, setFilteredTracks]);

  return (
    <Styled.Spacing>
      <TrackPillFilters
        albums={albums}
        artists={artists}
        tracks={tracks}
        setFilteredTracks={setFilteredPills}
      />

      <TrackIntervalFilters
        tracks={filteredPills}
        albums={abvIntervalAlbums}
        artists={artists}
        setFilteredTracks={setFilteredIntervals}
      />
    </Styled.Spacing>
  );
}

export default AdvancedTrackFilters;
