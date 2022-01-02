import { Track } from "data/cacheDB/dexieDB/models/Track";
import Styled from "./SpotifyPlayerCard.styles";
import Buttons from "styles/Buttons";
import {
  FaBackward,
  FaForward,
  FaPause,
  FaPlay,
  FaRecordVinyl,
} from "react-icons/fa";
import { useState } from "react";
import Modal from "components/core/display/molecules/Modal";
import TrackCompleteDetails from "components/core/cards/detailedCards/TrackCompleteDetails";
import { MdTouchApp } from "react-icons/md";
import DropdownMenu from "components/core/input/atoms/DropdownMenu";

interface ISpotifyPlayerCardProps {
  track?: Track;
  isPlaying: boolean;
  pause: () => void;
  resume: () => void;
  next: () => void;
  prev: () => void;
  currentPlayer?: SpotifyApi.UserDevice;
  abvPlayers: SpotifyApi.UserDevice[];
  setPlayer: (player: SpotifyApi.UserDevice) => void;
  refreshPlaying: () => void;
}

/**
 * Spotify Player Card: Requires the same parameters as the player hook
 * @param param0
 * @returns
 */
function SpotifyPlayerCard({
  track,
  isPlaying,
  pause,
  resume,
  next,
  prev,
  currentPlayer,
  abvPlayers,
  setPlayer,
  refreshPlaying,
}: ISpotifyPlayerCardProps): JSX.Element {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <>
      <Modal isOpen={showDetails} onClose={() => setShowDetails(false)}>
        <TrackCompleteDetails
          album={track?.album}
          artists={track?.artists}
          track={track}
        />
      </Modal>
      <Styled.Card>
        <DropPlayerSelector
          abvPlayers={abvPlayers}
          currentPlayer={currentPlayer}
          setPlayer={setPlayer}
        />
        {track?.album?.spotifyCoverUrl.length ? (
          <Styled.relative className="group">
            <Styled.RightCorner>
              <h3>
                <MdTouchApp />
              </h3>
            </Styled.RightCorner>
            <Styled.Cover
              src={track.album.spotifyCoverUrl[0]}
              alt={track.name}
              onClick={() => {
                setShowDetails(true);
              }}
            />
          </Styled.relative>
        ) : (
          <></>
        )}
        <Styled.ButtonRow>
          <Buttons.SecondaryGreenButton rounded onClick={prev}>
            <FaBackward />
          </Buttons.SecondaryGreenButton>
          <Styled.PlayBtn rounded onClick={isPlaying ? pause : resume}>
            {isPlaying ? <FaPause /> : <FaPlay />}
          </Styled.PlayBtn>
          <Buttons.SecondaryGreenButton rounded onClick={next}>
            <FaForward />
          </Buttons.SecondaryGreenButton>
        </Styled.ButtonRow>
        {track && (
          <>
            <h4>{track.name}</h4>
            <a href={track.album?.spotifyUrl}>
              <h6>
                {track.album?.name} (
                {track.album?.spotifyReleaseDate?.toLocaleDateString()})
              </h6>
            </a>
            <Styled.Inline>
              {track.artists.map((a, i) => (
                <a key={i} href={a.spotifyUrl}>
                  <p>{a.name}</p>
                </a>
              ))}
            </Styled.Inline>
            <hr />
          </>
        )}
      </Styled.Card>
    </>
  );
}

interface IDropPlayerSel {
  currentPlayer?: SpotifyApi.UserDevice;
  abvPlayers: SpotifyApi.UserDevice[];
  setPlayer: (player: SpotifyApi.UserDevice) => void;
}

function DropPlayerSelector({
  currentPlayer,
  abvPlayers,
  setPlayer,
}: IDropPlayerSel): JSX.Element {
  return (
    <DropdownMenu
      items={abvPlayers.map((p) => ({
        component: <p>{p.name}</p>,
        onClick: () => {
          setPlayer(p);
        },
      }))}
    >
      <>
        <FaRecordVinyl />{" "}
        <span>{currentPlayer ? currentPlayer.name : "No Active Player"}</span>
      </>
    </DropdownMenu>
  );
}

export default SpotifyPlayerCard;
