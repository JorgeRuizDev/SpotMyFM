import Modal from "components/core/display/molecules/Modal";
import { Artist } from "data/cacheDB/dexieDB/models/Artist";
import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import Buttons from "styles/Buttons";
import formatPopularity from "util/spotify/formatPopularity";
import ArtistCompleteDetails from "../../detailedCards/ArtistCompleteDetails";
import Styled from "./SimpleArtistCard.styles";
import useTranslation from "next-translate/useTranslation";
interface ISimpleArtistCardProps {
  artist: Artist;
}
/**
 * Artist Card Component
 * @param param0
 * @returns
 */
function SimpleArtistCard({ artist }: ISimpleArtistCardProps): JSX.Element {
  const pop = artist.spotifyPopularity || 0;
  const [showDet, setShowDet] = useState(false);
  const { t } = useTranslation();
  return (
    <>
      <Modal isOpen={showDet} onClose={() => setShowDet(false)}>
        <ArtistCompleteDetails artist={artist} />
      </Modal>
      <Styled.Layout>
        <Styled.Image
          src={artist.spotifyImgs?.[0] || ""}
          alt={artist.name}
          height={"320px"}
          width={"320px"}
        />
        <Styled.Content>
          <h4>{artist.name}</h4>
          <p>
            {t("cards:popularity2")} {formatPopularity(pop)}
          </p>
          <Buttons.PrimaryGreenButton onClick={() => setShowDet(true)}>
            <FaPlus />
            <span>{t("cards:show_details")}</span>
          </Buttons.PrimaryGreenButton>
          <ArtistGenres />
        </Styled.Content>
      </Styled.Layout>
    </>
  );

  function ArtistGenres() {
    return artist.spotifyGenres !== undefined &&
      artist.spotifyGenres.length > 0 ? (
      <>
        <hr />
        <h5>{t("cards:genres2")}</h5>
        <ul>
          {artist.spotifyGenres?.map((g, i) => (
            <li key={i}>
              <p>{g}</p>
            </li>
          ))}
        </ul>
      </>
    ) : (
      <h6>{t("cards:no_genres")}</h6>
    );
  }
}

export default SimpleArtistCard;
