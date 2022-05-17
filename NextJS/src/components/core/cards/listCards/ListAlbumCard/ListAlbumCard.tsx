import Modal from "components/core/display/molecules/Modal";
import { Album } from "data/cacheDB/dexieDB/models/Album";
import useTranslation from "next-translate/useTranslation";
import { useState } from "react";
import { FaPlus, FaTags } from "react-icons/fa";
import Buttons from "styles/Buttons";
import TrackCompleteDetails from "../../detailedCards/TrackCompleteDetails";
import Styled from "./ListAlbumCard.styles";
import formatPop from "util/spotify/formatPopularity";
import ModifyAlbumTags from "../../other/ModifyAlbumTags";
interface IListAlbumCardProps {
  album: Album;
  pos?: number;
}

function ListAlbumCardHeader({ pos }: { pos?: boolean }) {
  const {t} = useTranslation();

  return (
    <Styled.Header>
      <Styled.LeftSide>
        <Styled.FirstTwoCols>
          <Styled.Pos>{pos && <p>#</p>}</Styled.Pos>
        </Styled.FirstTwoCols>

        <Styled.E1>
          <Styled.GreenP>{t('cards:name')}</Styled.GreenP>
        </Styled.E1>

        <Styled.E2>
          <Styled.GreenP>{t('cards:released_on2')}</Styled.GreenP>
        </Styled.E2>

        <Styled.E3>
          <Styled.GreenP>{t('cards:popularity')}</Styled.GreenP>
        </Styled.E3>

        <Styled.E5>
          <Styled.GreenP>{t('views:album-tags')}</Styled.GreenP>
        </Styled.E5>

        <Styled.E6>
          <Styled.GreenP>{t('cards:lastfm_tags')}</Styled.GreenP>
        </Styled.E6>
      </Styled.LeftSide>

      <Styled.RightSide/>
    </Styled.Header>
  );
}

function ListAlbumCard({ album, pos }: IListAlbumCardProps): JSX.Element {
  const { t, lang } = useTranslation();
  const [showDet, setShowDet] = useState(false);
  const [showTagMgr, setShowTagMgr] = useState(false);

  return (
    <>
      <Styled.ListItem
        onClick={(e) => {
          setShowDet(true);
          e.preventDefault();
        }}
      >
        <Styled.LeftSide>
          <Styled.FirstTwoCols>
            <Styled.Pos>{pos != undefined && <p>{pos}</p>}</Styled.Pos>
            <Styled.Cover
    src={album.spotifyCoverUrl?.[album.spotifyCoverUrl.length - 1]}
    alt={"Album Cover"}
    />
          </Styled.FirstTwoCols>

          <Styled.E1>
            <p>{album.name}</p>
            <span>
              {album.artists.map((a, i) => (
                <a
                  href={a.spotifyUrl}
                  key={i}
                  onClick={(e) => e.stopPropagation()}
                >
                  {a.name + " "}
                </a>
              ))}
            </span>
          </Styled.E1>

          <Styled.E2>
            {album.spotifyReleaseDate?.toLocaleDateString(lang)}
          </Styled.E2>
          <Styled.E3>{formatPop(album.spotifyPopularity)}</Styled.E3>
          <Styled.E4>
            <Styled.TrucateP>
              {album.albumTags.length
                ? album.albumTags.join(", ")
                : "No User Tags"}
            </Styled.TrucateP>
          </Styled.E4>
          <Styled.E5>
            <Styled.TrucateP>
              {album.lastfmTagsNames.length
                ? album.lastfmTagsNames.join(", ")
                : "No LastFM Tags"}
            </Styled.TrucateP>
          </Styled.E5>
        </Styled.LeftSide>

        <Styled.RightSide onClick={(e) => e.stopPropagation()}>
          <Buttons.SecondaryGreenButton
            rounded
            onClick={() => setShowTagMgr(true)}
          >
            <FaTags />
          </Buttons.SecondaryGreenButton>

          <Buttons.SecondaryGreenButton
            rounded
            onClick={() => setShowDet(true)}
          >
            <FaPlus />
          </Buttons.SecondaryGreenButton>
        </Styled.RightSide>
      </Styled.ListItem>
      <Modal isOpen={showDet} onClose={() => setShowDet(false)}>
        <TrackCompleteDetails album={album} artists={album.artists} />
      </Modal>
      <Modal isOpen={showTagMgr} onClose={() => setShowTagMgr(false)}>
        <ModifyAlbumTags
          album={album}
          closeModal={() => setShowTagMgr(false)}
        />
      </Modal>
    </>
  );
}

export default ListAlbumCard;
export { ListAlbumCard, ListAlbumCardHeader };
