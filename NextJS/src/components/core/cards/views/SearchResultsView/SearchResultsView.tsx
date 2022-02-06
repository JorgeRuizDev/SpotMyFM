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
}

function SearchResultsView({
  tracks,
  artists,
  albums,
  playlists,
}: ISearchResultsViewProps): JSX.Element {
  return (
    <>
      {!!tracks.length && (
        <TrackView tracks={tracks} settings={{ defaultView: "LIST" }} />
      )}

      {!!albums.length && (
        <AlbumView albums={albums} settings={{ defaultView: "LIST" }} />
      )}

      {!!artists.length && (
        <ArtistView artists={artists} settings={{ defaultView: "LIST" }} />
      )}
      {!!playlists.length  && (
        <PlaylistView
          playlists={playlists}
          settings={{ defaultView: "LIST" }}
        />
      )}
    </>
  );
}

export default SearchResultsView;
