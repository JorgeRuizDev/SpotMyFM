import { Artist } from "data/cacheDB/dexieDB/models/Artist";
import formatPopularity from "util/spotify/formatPopularity";
import Styled from "./SimpleArtistCard.styles";
interface ISimpleArtistCardProps {
  artist: Artist;
}

function SimpleArtistCard({ artist }: ISimpleArtistCardProps) {
  const pop = artist.spotifyPopularity || 0;

  return (
    <Styled.Layout>
      <Styled.Image src={artist.spotifyImgs?.[0]} alt={artist.name} />
      <h4>{artist.name}</h4>
      <p>Popularity: {formatPopularity(pop)}</p>
      <ArtistGenres />
    </Styled.Layout>
  );

  function ArtistGenres() {
    return artist.spotifyGenres !== undefined &&
      artist.spotifyGenres.length > 0 ? (
      <>
        <hr />
        <h5>Genres:</h5>
        <ul>
          {artist.spotifyGenres?.map((g, i) => (
            <li key={i}>
              <p>{g}</p>
            </li>
          ))}
        </ul>
      </>
    ) : (
      <h6>No Genres</h6>
    );
  }
}

export default SimpleArtistCard;
