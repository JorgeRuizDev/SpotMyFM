import { FaPlus, FaTags } from "react-icons/fa";
import React, { memo, useCallback, useState } from "react";
import Buttons from "styles/Buttons";
import Styled from "./SimpleAlbumCard.styles";
import { Album } from "data/cacheDB/dexieDB/models/Album";
import formatPopularity from "util/spotify/formatPopularity";
import LikeIcon from "../../buttons/LikeIcon";
import Modal from "components/core/display/molecules/Modal";
import TrackCompleteDetails from "../../detailedCards/TrackCompleteDetails";
import ModifyAlbumTags from "../../other/ModifyAlbumTags";
import { SaveAlbum } from "../../buttons/CardButtons/CardButtons";
import { useClientsStore } from "store/useClients";
import useTranslation from "next-translate/useTranslation";

interface ISimpleAlbumCardProps {
  album: Album;
  // Style:
  compact?: boolean;
}

function SimpleAlbumCard({
  album,
  compact = false,
}: ISimpleAlbumCardProps): JSX.Element {
  const pop = album.spotifyPopularity;
  const api = useClientsStore((s) => s.spotifyApi);
  // Modal States:
  const [showDetails, setShowDetails] = useState(false);
  const [showTagManager, setShowTagManager] = useState(false);
  const { t } = useTranslation();
  return (
    <>
      <Styled.Layout compact={compact}>
        <Styled.Image
          src={album.spotifyCoverUrl[1] || album.spotifyCoverUrl[0]}
          alt={album.name}
        />
        <Styled.CardContent>
          <ButtonRow />
          <a href={album.spotifyUrl}>
            <h4>{album.name}</h4>
          </a>
          {album.spotifyReleaseDate && (
            <p>Released on {album.spotifyReleaseDate?.toLocaleDateString()}</p>
          )}
          <hr />
          <p>
            {t("cards:popularity2")} {formatPopularity(pop)}
          </p>
          <ul>
            {album.artists?.map((x, i) => (
              <li key={i}>
                <a href={x.spotifyUrl}>
                  <p>{x.name}</p>
                </a>
              </li>
            ))}
          </ul>
          <TagLayout />
        </Styled.CardContent>
      </Styled.Layout>
      <Modals
        album={album}
        setShowDetails={setShowDetails}
        setShowTagManager={setShowTagManager}
        showDetails={showDetails}
        showTagManager={showTagManager}
      />
    </>
  );

  function ButtonRow(): JSX.Element {
    // re-render button row
    const [_, set_] = useState([]);

    return (
      <Buttons.LayoutLeft>
        <SaveAlbum
          api={api}
          isSaved={!!album.savedAt}
          item={album}
          setIsSaved={(isSaved) => {
            album.savedAt = isSaved ? new Date() : undefined;
            set_([]);
          }}
        ></SaveAlbum>

        <Buttons.SecondaryGreenButton
          onClick={() => {
            setShowTagManager(true);
          }}
        >
          <FaTags /> <span>{t("cards:tag_manager")}</span>
        </Buttons.SecondaryGreenButton>

        <Buttons.SecondaryGreenButton
          rounded
          onClick={() => {
            setShowDetails(true);
          }}
        >
          <FaPlus />
        </Buttons.SecondaryGreenButton>
      </Buttons.LayoutLeft>
    );
  }

  function TagLayout(): JSX.Element {
    return (
      <>
        {album.albumTags.length > 0 && (
          <>
            <hr />
            <b>🏷 SpotMyFM Tags:</b>
            <Buttons.LayoutCenter>
              {album.albumTags.slice(0, 4).map((t, i) => (
                <Buttons.SecondaryGreenButton key={i}>
                  {t}
                </Buttons.SecondaryGreenButton>
              ))}
              {album.albumTags.length > 4 && (
                <Buttons.SecondaryGreenButton>...</Buttons.SecondaryGreenButton>
              )}
            </Buttons.LayoutCenter>
          </>
        )}
      </>
    );
  }
}

interface IModals {
  showDetails: boolean;
  showTagManager: boolean;

  setShowDetails: (x: boolean) => void;
  setShowTagManager: (x: boolean) => void;

  album: Album;
}

function Modals({
  showDetails,
  showTagManager,
  setShowDetails,
  setShowTagManager,
  album,
}: IModals): JSX.Element {
  return (
    <>
      <Modal
        isOpen={showDetails}
        onClose={useCallback(() => setShowDetails(false), [setShowDetails])}
      >
        <>
          <TrackCompleteDetails artists={album.artists} album={album} />
        </>
      </Modal>
      <Modal
        isOpen={showTagManager}
        onClose={useCallback(
          () => setShowTagManager(false),
          [setShowTagManager]
        )}
      >
        <>
          <ModifyAlbumTags
            album={album}
            closeModal={() => setShowTagManager(false)}
          />
        </>
      </Modal>
    </>
  );
}

export default memo(SimpleAlbumCard);
