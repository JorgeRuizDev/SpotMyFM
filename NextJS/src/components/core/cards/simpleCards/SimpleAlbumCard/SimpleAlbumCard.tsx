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

  return (
    <>
      <Styled.Layout compact={compact}>
        <Styled.Image
          src={album.spotifyCoverUrl[1] || album.spotifyCoverUrl[0]}
          alt={album.name}
        />
        <ButtonRow />
        <a href={album.spotifyUrl}>
          <h4>{album.name}</h4>
        </a>
        {album.spotifyReleaseDate && (
          <p>Released on {album.spotifyReleaseDate?.toLocaleDateString()}</p>
        )}
        <hr />
        <p>Popularity: {formatPopularity(pop)}</p>
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
    return (
      <Buttons.LayoutLeft>
        <SaveAlbum
          api={api}
          isSaved={!!album.savedAt}
          item={album}
          setIsSaved={() => {
            album.savedAt = album.savedAt ? undefined : new Date();
          }}
        ></SaveAlbum>

        <Buttons.SecondaryGreenButton
          onClick={() => {
            setShowTagManager(true);
          }}
        >
          <FaTags /> <span>Tag Manager</span>
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
            <b>🏷 MySpotifyFm Tags:</b>
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
