import { Artist } from "data/cacheDB/dexieDB/models/Artist";
import React from "react";
import formatPopularity from "util/spotify/formatPopularity";
import { OpenSpotifyButton } from "../../buttons/CardButtons";
import Styled from "./ArtistHorizontalCard.styles";
interface IArtistHorizontalCardProps {
  artist?: Artist;
}

function ArtistHorizontalCard({ artist }: IArtistHorizontalCardProps) {
  return (
    <Styled.HorizontalCard>
      <Styled.Image
        src={artist?.spotifyImgs?.[0]}
        width={"280px"}
        height={"280px"}
        alt={"Artist Picture"}
        whileHover={{
          scale: 2.5,
          transition: { ease: "easeInOut", duration: 0.3 },
        }}
      />

      <Styled.ColumnItems>
        <Styled.Inline>
          <h4>{artist?.name}</h4>
          <OpenSpotifyButton url={artist?.spotifyUrl || ""} />
        </Styled.Inline>
        <p>Popularity: {formatPopularity(artist?.spotifyPopularity || 0)}</p>
        {artist?.spotifyGenres?.length || 0 > 0 ? (
          <b>Artist Genres:</b>
        ) : (
          <b>No Genres</b>
        )}
        <Styled.GenrePillWrap>
          {artist?.spotifyGenres?.map((g) => (
            <Styled.GenrePill key={g}>{g}</Styled.GenrePill>
          ))}
        </Styled.GenrePillWrap>
      </Styled.ColumnItems>
    </Styled.HorizontalCard>
  );
}

export default ArtistHorizontalCard;
