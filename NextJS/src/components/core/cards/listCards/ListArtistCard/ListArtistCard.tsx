import { Artist } from "data/cacheDB/dexieDB/models/Artist";
import formatPopularity from "util/spotify/formatPopularity";
import { IGenericCardViewSortProps } from "../../views/GenericCardView/GenericCardView";
import Styled from "./ListArtistCard.styles";
interface IListArtistCardProps {
  artist: Artist;
  pos?: number;
}

function ListArtistCard({ artist, pos }: IListArtistCardProps): JSX.Element {
  return (
    <>
      <Styled.ListItem>
        <Styled.LeftSide>
          <Styled.FirstTwoCols>
            <Styled.Pos>{pos != undefined && <p>{pos}</p>}</Styled.Pos>
            {artist.spotifyArtistImgs?.[artist.spotifyArtistImgs.length - 1]
              .url && (
              <Styled.Cover
                src={
                  artist.spotifyArtistImgs[artist.spotifyArtistImgs.length - 1]
                    .url
                }
                alt={"Artist Image"}
              ></Styled.Cover>
            )}
          </Styled.FirstTwoCols>
          <Styled.E1>
            <a href={artist.spotifyUrl}>{artist.name}</a>
          </Styled.E1>
          <Styled.E2>
            <p>{formatPopularity(artist.spotifyPopularity || 0)}</p>
          </Styled.E2>
          <Styled.E3>
            <Styled.TrucateP>
              {artist.spotifyGenres?.slice(0, 3).join(", ") || "No Genres"}
            </Styled.TrucateP>
          </Styled.E3>
        </Styled.LeftSide>
      </Styled.ListItem>
    </>
  );
}

function ListArtistCardHeader({
  pos,
  sorting,
}: {
  pos?: boolean;
  sorting?: IGenericCardViewSortProps;
}): JSX.Element {
  return (
    <Styled.Header>
      <Styled.LeftSide>
        <Styled.FirstTwoCols>
          <Styled.Pos>{pos && <p>#</p>}</Styled.Pos>
        </Styled.FirstTwoCols>

        <Styled.E1>
          <Styled.GreenP>Name</Styled.GreenP>
        </Styled.E1>

        <Styled.E2>
          <Styled.GreenP>Popularity</Styled.GreenP>
        </Styled.E2>

        <Styled.E3>
          <Styled.GreenP>Genres</Styled.GreenP>
        </Styled.E3>
      </Styled.LeftSide>
    </Styled.Header>
  );
}
export { ListArtistCard, ListArtistCardHeader };
