import { Artist } from "data/cacheDB/dexieDB/models/Artist";
import React, { useState } from "react";
import formatPopularity from "util/spotify/formatPopularity";
import { OpenSpotifyButton } from "../../buttons/CardButtons";
import Buttons from "styles/Buttons";
import Styled from "./ArtistHorizontalCard.styles";
import { FaPlus } from "react-icons/fa";
import Modal from "components/core/display/molecules/Modal";
import ArtistCompleteDetails from "../../detailedCards/ArtistCompleteDetails";
import useTranslation from "next-translate/useTranslation";
interface IArtistHorizontalCardProps {
  artist: Artist;
}

function ArtistHorizontalCard({
  artist,
}: IArtistHorizontalCardProps): JSX.Element {
  const [showDet, setShowDet] = useState(false);
  const {t} = useTranslation();

  return (
    <>
      <Modal isOpen={showDet} onClose={() => setShowDet(false)}>
        <ArtistCompleteDetails artist={artist} />
      </Modal>
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
            <Buttons.PrimaryGreenButton onClick={() => setShowDet(true)}>
              <FaPlus />
              <span>{t('cards:show_details')}</span>
            </Buttons.PrimaryGreenButton>
            <OpenSpotifyButton url={artist.spotifyUrl || ""} />
          </Styled.Inline>
          <p>{t('cards:popularity2')} {formatPopularity(artist?.spotifyPopularity || 0)}</p>
          {artist.spotifyGenres?.length || 0 > 0 ? (
            <b>{t('cards:artist_genres')}</b>
          ) : (
            <b>{t('cards:no_genres')}</b>
          )}
          <Styled.GenrePillWrap>
            {artist.spotifyGenres?.map((g) => (
              <Styled.GenrePill key={g}>{g}</Styled.GenrePill>
            ))}
          </Styled.GenrePillWrap>
        </Styled.ColumnItems>
      </Styled.HorizontalCard>
    </>
  );
}

export default ArtistHorizontalCard;
