import { Artist } from "data/cacheDB/dexieDB/models/Artist";
import ArtistAlbumsView from "../../views/ArtistAlbumsView";
import Styled from "./ArtistCompleteDetails.styles";
interface IArtistCompleteDetailsProps {
  artist: Artist;
  isNested?: boolean;
}

function ArtistCompleteDetails({
  artist,
  isNested,
}: IArtistCompleteDetailsProps): JSX.Element {
  return (
    <>
      <ArtistAlbumsView artist={artist} />
    </>
  );
}

export default ArtistCompleteDetails;
