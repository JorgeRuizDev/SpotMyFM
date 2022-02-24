import ViewHeading from "components/core/display/atoms/ViewHeading";
import { Artist } from "data/cacheDB/dexieDB/models/Artist";
import { ILastFMArtist } from "interfaces/lastFM";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useClientsStore } from "store/useClients";
import ArtistAlbumsView from "../../views/ArtistAlbumsView";
import Text from "styles/Text";
import Styled from "./ArtistCompleteDetails.styles";
import Buttons from "styles/Buttons";
import { FaLastfm, FaSpotify } from "react-icons/fa";
import Collapsible from "components/core/display/atoms/Collapsible";
import parse from "html-react-parser";
import Modal from "components/core/display/molecules/Modal";
import { last } from "lodash";
interface IArtistCompleteDetailsProps {
  artist: Artist;
  isNested?: boolean;
}

function ArtistCompleteDetails({
  artist,
  isNested,
}: IArtistCompleteDetailsProps): JSX.Element {
  const { lastfmApi } = useClientsStore();

  const [lastDet, setLastDet] = useState<ILastFMArtist>();
  const [showDesc, setShowDesc] = useState(false);
  const [showAlbums, setShowAlbums] = useState(false);
  useEffect(() => {
    const f = async () => {
      const [res, err] = await lastfmApi.getArtistDetails(artist.name);

      if (err || !res) {
        return toast.error(err?.message);
      }
      setLastDet(res);
    };
    f();
  }, [artist, lastfmApi]);

  return (
    <>
      <Modal isOpen={showDesc} onClose={() => setShowDesc(false)}>
        <Styled.BioBox>
          <h3>
            Biography for <Text.green>{artist.name}</Text.green>
          </h3>
          <hr />
          <p>{parse(lastDet?.bio.content || "")}</p>
        </Styled.BioBox>
      </Modal>
      <ViewHeading
        img={{
          src: artist.spotifyImgs?.[0] || "",
          alt: `${artist.name} Profile Picture`,
        }}
      >
        <Styled.TwoCols>
          <Styled.Col>
            <Text.Inline>
              <h3>{artist.name}</h3>{" "}
              <Buttons.SecondaryGreenButton rounded>
                <FaSpotify />
              </Buttons.SecondaryGreenButton>
              <Buttons.SecondaryRedButton rounded>
                <FaLastfm />
              </Buttons.SecondaryRedButton>
            </Text.Inline>
            <LastStats d={lastDet} />
          </Styled.Col>
        </Styled.TwoCols>
        <></>
      </ViewHeading>
      <Styled.PillCols>
        {!!artist.spotifyGenres?.length && (
          <Styled.PillCol>
            <h4>Artist Genres</h4>
            <Styled.PillWrap>
              {artist.spotifyGenres?.map((g, i) => (
                <Styled.GenrePill key={i}>{g}</Styled.GenrePill>
              ))}
            </Styled.PillWrap>
          </Styled.PillCol>
        )}

        {!!lastDet?.tags?.length && (
          <Styled.PillCol>
            <h4>Artist LastFM Tags</h4>
            <Styled.PillWrap>
              {(lastDet.tags || []).map((t, i) => (
                <Buttons.PrimaryRedButton key={i}>
                  {t.name}
                </Buttons.PrimaryRedButton>
              ))}
            </Styled.PillWrap>
          </Styled.PillCol>
        )}

        {(lastDet?.bio?.summary?.length || 0) > 20 && (
          <Styled.PillCol>
            <>
              <Styled.BioBox>
                <p>{parse(lastDet?.bio.summary || "")}</p>
              </Styled.BioBox>
              <Text.Center>
                <Buttons.PrimaryGreenButton onClick={() => setShowDesc(true)}>
                  Read More
                </Buttons.PrimaryGreenButton>
              </Text.Center>
            </>
          </Styled.PillCol>
        )}
      </Styled.PillCols>
      {showAlbums ? (
        <ArtistAlbumsView artist={artist} />
      ) : (
        <Text.Center>
          <Buttons.PrimaryGreenButton onClick={() => setShowAlbums(true)} style={{marginTop: "50px"}}>
            Show Artist Albums
          </Buttons.PrimaryGreenButton>
        </Text.Center>
      )}
    </>
  );
}

function LastStats({ d }: { d?: ILastFMArtist }) {
  return (
    <div>
      <h6>
        <Text.pGreen>{d?.plays}</Text.pGreen> LastFM Plays
      </h6>
      <h6>
        <Text.pGreen>{d?.listeners}</Text.pGreen> LastFM Listeners
      </h6>
    </div>
  );
}

export default ArtistCompleteDetails;
