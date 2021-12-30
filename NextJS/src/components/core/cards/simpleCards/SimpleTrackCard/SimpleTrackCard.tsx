import Modal from "components/core/display/molecules/Modal";
import { Album } from "data/cacheDB/dexieDB/models/Album";
import { Artist } from "data/cacheDB/dexieDB/models/Artist";
import { Track } from "data/cacheDB/dexieDB/models/Track";
import { motion } from "framer-motion";
import useTrackPreview from "hooks/useTrackPreview/useTrackPreview";
import React, { useEffect, useState } from "react";
import { isMobile } from "react-device-detect";
import { BiAddToQueue } from "react-icons/bi";
import { FaMinus, FaPlus } from "react-icons/fa";

import Buttons from "styles/Buttons";
import { EnqueueButton, SpotifyButton } from "../../buttons/CardButtons";
import {
  PlaylistButton,
  PlusButton,
} from "../../buttons/CardButtons/CardButtons";
import TrackCompleteDetails from "../../detailedCards/TrackCompleteDetails";

import Styled from "./SimpleTrackCard.styles";

interface ISimpleTrackCardProps {
  track: Track;

  playOnHover?: boolean;
  isMuted?: boolean;

  toggleFromPlaylist?: (track: Track) => void;
  inPlaylist?: boolean;
}

function SimpleTrackCard({
  track,
  playOnHover = false,
  isMuted = true,
  toggleFromPlaylist,
  inPlaylist = false,
}: ISimpleTrackCardProps) {
  const [showDetails, setShowDetails] = useState(false);

  const { play, pause, PreviewButton, isPlayable } = useTrackPreview(
    track.spotifyPreviewURL || "",
    isMuted,
    !playOnHover
  );
  const album = track.album;
  const artists = track.artists;
  // On Unmount, puase the music:
  useEffect(() => {
    return () => {
      pause();
    };
  }, [pause]);

  const img = album?.spotifyCovers?.[1] || album?.spotifyCovers?.[0];

  return (
    <>
      <Styled.CardLayout>
        <motion.div
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
        >
          <Styled.AlbumCover
            alt={track.name}
            src={img?.url || ""}
            width={"320px"}
            height={"320px"}
            quality={100}
            placeholder={"empty"}
          />
        </motion.div>

        <Styled.CardContent>
          <Styled.ButtonRow>
            <PreviewButton />
            <SpotifyButton track={track} artist={artists[0]} />
            <PlaylistButton
              inPlaylist={inPlaylist}
              toggleFromPlaylist={toggleFromPlaylist}
              track={track}
            />
            <EnqueueButton track={track} artist={artists[0]} />
            <PlusButton onClick={() => setShowDetails(true)} />
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
            {artists.map((x, i) => (
              <li key={i}>
                <a href={x.spotifyUrl}>
                  <p>{x.name}</p>
                </a>
              </li>
            ))}
          </ul>
          <h1>{track.spotifyPreviewURL === undefined ? "SI" : ""}</h1>
        </Styled.CardContent>
      </Styled.CardLayout>
      <Modal isOpen={showDetails} onClose={() => setShowDetails(false)}>
        <>
          <TrackCompleteDetails track={track} artists={artists} album={album} />
        </>
      </Modal>
    </>
  );
}

export default React.memo(SimpleTrackCard);
