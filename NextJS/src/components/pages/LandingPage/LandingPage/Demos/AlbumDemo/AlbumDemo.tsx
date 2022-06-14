import AlbumView from "components/core/cards/views/AlbumView";
import Styled from "./AlbumDemo.styles";
import demoAlbums from "./demoAlbums";



interface IAlbumDemoProps {}

function AlbumDemo(props: IAlbumDemoProps) {
  return <AlbumView albums={demoAlbums} settings={{isLoading: false, isNested: true, pageSize: 4, isDemo: true}}/>
}


export default AlbumDemo;
