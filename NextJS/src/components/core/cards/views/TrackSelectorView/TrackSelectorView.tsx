import useTrackToPlaylistSelector from "hooks/tracksToPlaylist/useTrackToPlaylistSelector";
import Styled from "./TrackSelectorView.styles";
interface ITrackSelectorViewProps {}

function TrackSelectorView(props: ITrackSelectorViewProps) {
  const {
    trackSet,
    toggleFromPlaylist,
    contains,
    addAll,
    removeAll,
  } = useTrackToPlaylistSelector();
  return <></>;
}

export default TrackSelectorView;
