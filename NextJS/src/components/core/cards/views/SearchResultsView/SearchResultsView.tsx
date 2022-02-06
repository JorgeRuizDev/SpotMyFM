import { Album } from "data/cacheDB/dexieDB/models/Album";
import { Artist } from "data/cacheDB/dexieDB/models/Artist";
import { Track } from "data/cacheDB/dexieDB/models/Track";
import AlbumView from "../AlbumView";
import ArtistView from "../ArtistView";
import PlaylistView from "../PlaylistView";
import TrackView from "../TrackView";
import Styled from "./SearchResultsView.styles";
interface ISearchResultsViewProps {
  albums: Album[];
  artists: Artist[];
  tracks: Track[];
  playlists: SpotifyApi.PlaylistObjectSimplified[];
  searchType: string;
  isLoading: boolean;
}

function SearchResultsView({
  tracks,
  artists,
  albums,
  playlists,
  isLoading,
  searchType,
}: ISearchResultsViewProps): JSX.Element {
  return (
    <>
      {searchType == "tracks" && (
        <TrackView
          tracks={tracks}
          settings={{ defaultView: "LIST", isLoading: isLoading }}
        />
      )}

      {searchType == "albums" && (
        <AlbumView
          albums={albums}
          settings={{ defaultView: "LIST", isLoading: isLoading }}
        />
      )}

      {searchType == "artists" && (
        <ArtistView
          artists={artists}
          settings={{ defaultView: "LIST", isLoading: isLoading }}
        />
      )}
      {searchType == "playlists" && (
        <PlaylistView
          playlists={playlists}
          settings={{ defaultView: "LIST", isLoading: isLoading }}
        />
      )}
    </>
  );
}

export default SearchResultsView;
