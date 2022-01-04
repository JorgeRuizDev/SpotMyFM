import { Album } from "data/cacheDB/dexieDB/models/Album";
import { albumViewSettings } from "interfaces/Album";
import SimpleAlbumCard from "../../simpleCards/SimpleAlbumCard";
import GenericCardView from "../GenericCardView";
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
  return (
    <>
      <GenericCardView isLoading={settings.isLoading}>
        {albums.map((a, i) => (
          <SimpleAlbumCard album={a} key={i} />
        ))}
      </GenericCardView>
    </>
  );
}

export default AlbumView;
