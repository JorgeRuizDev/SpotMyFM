import { MdGroup, MdLock, MdPublic } from "react-icons/md";
import Text from "styles/Text";
interface IPlaylistPublicFormatProps {
  playlist?: SpotifyApi.PlaylistObjectSimplified;
}

function PlaylistPublicFormat({
  playlist,
}: IPlaylistPublicFormatProps): JSX.Element {
  return playlist ? (
    <Text.Inline>
      {playlist.collaborative ? (
        <>
          <span>Collaborative</span> <MdGroup />
        </>
      ) : playlist.public ? (
        <>
          <span>Public</span>
          <MdPublic />
        </>
      ) : (
        <>
          <span>Private</span>
          <MdLock />
        </>
      )}
    </Text.Inline>
  ) : (
    <></>
  );
}

export default PlaylistPublicFormat;
