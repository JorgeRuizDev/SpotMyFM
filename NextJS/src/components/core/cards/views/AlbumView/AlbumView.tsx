import { Album } from "data/cacheDB/dexieDB/models/Album";
import { albumViewSettings } from "interfaces/Album";
import Styled from "./AlbumView.styles";
interface IAlbumViewProps {
  albums: Album[];
  settings?: albumViewSettings;
}

function AlbumView({
  albums,
  settings = {
    defaultTrackSort: "",
    isLoading: false,
    isNested: false,
  },
}: IAlbumViewProps): JSX.Element {
  return <></>;
}

export default AlbumView;
