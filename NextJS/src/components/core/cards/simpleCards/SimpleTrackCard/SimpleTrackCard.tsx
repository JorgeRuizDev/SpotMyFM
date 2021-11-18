import Modal from "components/core/display/molecules/Modal";
import { Album } from "data/cacheDB/dexieDB/models/Album";
import { Artist } from "data/cacheDB/dexieDB/models/Artist";
import { Track } from "data/cacheDB/dexieDB/models/Track";
import useTrackPreview from "hooks/useTrackPreview/useTrackPreview";
import React, { useEffect, useState } from "react";
import { isMobile } from "react-device-detect";
import { BiAddToQueue } from "react-icons/bi";
import { FaMinus, FaPlus } from "react-icons/fa";

import Buttons from "styles/Buttons";
import { EnqueueButton, SpotifyButton } from "../../buttons/CardButtons";
import TrackCompleteDetails from "../../detailedCards/TrackCompleteDetails";

import Styled from "./SimpleTrackCard.styles";

interface ISimpleTrackCardProps {
  track: Track;
  album?: Album;
  artists?: Artist[];

  playOnHover?: boolean;
  isMuted?: boolean;

  toggleFromPlaylist?: (track: Track) => void;
  inPlaylist?: boolean;
}

function SimpleTrackCard({
  track,
  album,
  artists,
  playOnHover = false,
  isMuted = true,
  toggleFromPlaylist,
  inPlaylist,
}: ISimpleTrackCardProps) {
  const [showDetails, setShowDetails] = useState(false);

  const { play, pause, PreviewButton, isPlayable } = useTrackPreview(
    track.spotifyPreviewURL || "",
    isMuted,
    !playOnHover
  );

  // On Unmount, puase the music:
  useEffect(() => {
    return () => {
      pause();
    };
  }, [pause]);

  return (
    <>
      <Styled.CardLayout>
        <Styled.AlbumCover
          src={album?.spotifyCoverUrl?.[1] || album?.spotifyCoverUrl?.[0]}
          alt={"Cover"}
          width={"280px"}
          height={"280px"}
          onMouseEnter={
            isPlayable && playOnHover && !isMobile ? play : () => {}
          }
          onMouseLeave={
            isPlayable && playOnHover && !isMobile ? pause : () => {}
          }
          whileHover={
            (isPlayable && {
              rotate: 5,
              transition: { ease: "easeInOut", duration: 0.3 },
            }) ||
            {}
          }
        />
        <Styled.ButtonRow>
          <PreviewButton />
          <SpotifyButton track={track} artist={artists?.[0]} />
          <PlaylistButton
            inPlaylist={inPlaylist}
            toggleFromPlaylist={toggleFromPlaylist}
            track={track}
          />
          <EnqueueButton track={track} artist={artists?.[0]} />
          <PlusButton setShowDetails={setShowDetails} />
        </Styled.ButtonRow>

        <a href={track.spotifyUrl}>
          <h4>{track.name}</h4>
        </a>
        <hr />
        <a href={album?.spotifyUrl}>
          <p>
            {album?.name}{" "}
            {album?.spotifyReleaseDate &&
              ` (${album?.spotifyReleaseDate.toLocaleDateString()})`}
          </p>
        </a>
        <ul>
          {artists?.map((x, i) => (
            <li key={i}>
              <a href={x.spotifyUrl}>
                <p>{x.name}</p>
              </a>
            </li>
          ))}
        </ul>
        <h1>{track.spotifyPreviewURL === undefined ? "SI" : ""}</h1>
      </Styled.CardLayout>
      <Modal isOpen={showDetails} onClose={() => setShowDetails(false)}>
        <>
          <TrackCompleteDetails track={track} artists={artists} album={album} />
        </>
      </Modal>
    </>
  );
}

interface IPlaylistButton {
  inPlaylist?: boolean;
  toggleFromPlaylist?: (track: Track) => void;
  track: Track;
}
function PlaylistButton({
  inPlaylist,
  toggleFromPlaylist,
  track,
}: IPlaylistButton) {
  return (
    (toggleFromPlaylist !== undefined && (
      <>
        <Buttons.SecondaryGreenButton onClick={() => toggleFromPlaylist(track)}>
          {inPlaylist ? (
            <>
              <FaMinus /> <span>Remove From Playlist</span>
            </>
          ) : (
            <>
              <BiAddToQueue />
              <span>Add to Playlist</span>
            </>
          )}
        </Buttons.SecondaryGreenButton>
      </>
    )) ||
    null
  );
}

interface IPlusButton {
  setShowDetails: (boolean: boolean) => void;
}
function PlusButton({ setShowDetails }: IPlusButton) {
  return (
    <Styled.RoundButton
      onClick={() => setShowDetails(true)}
      aria-label={"More"}
    >
      <FaPlus />
    </Styled.RoundButton>
  );
}

export default React.memo(SimpleTrackCard);
