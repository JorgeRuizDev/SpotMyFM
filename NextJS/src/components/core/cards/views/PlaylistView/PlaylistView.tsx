import { IPlaylistViewSettings } from "interfaces/Playlist";
import SimplePlaylistCard from "../../simpleCards/SimplePlaylistCard";
import GenericCardView from "../GenericCardView";
import Styled from "./PlaylistView.styles";
interface IPlaylistViewProps {
  playlists: SpotifyApi.PlaylistObjectSimplified[];
  settings?: IPlaylistViewSettings;
}

/**
 * Renders an array of playlists
 * @returns
 */
function PlaylistView({
  playlists,
  settings = { isNested: false, defaultTrackSort: "" },
}: IPlaylistViewProps) {
  return (
    <>
      <GenericCardView isLoading={settings.isLoading}>
        {playlists.map((p, i) => (
          <SimplePlaylistCard playlist={p} key={i} onDetailsClick={() => {}} />
        ))}
      </GenericCardView>
    </>
  );
}

export default PlaylistView;
