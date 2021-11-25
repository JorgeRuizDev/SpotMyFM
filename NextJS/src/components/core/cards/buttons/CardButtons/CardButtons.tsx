import { Album } from "data/cacheDB/dexieDB/models/Album";
import { Artist } from "data/cacheDB/dexieDB/models/Artist";
import { Track } from "data/cacheDB/dexieDB/models/Track";
import useSpotifyPlayer from "hooks/spotify/useSpotifyPlayer";

import React from "react";
import { BiAddToQueue } from "react-icons/bi";
import { FaLastfm, FaMinus, FaPlus, FaSpotify } from "react-icons/fa";
import { MdAlbum, MdQueueMusic } from "react-icons/md";
import { toast } from "react-toastify";
import { useClientsStore } from "store/useClients";
import Buttons from "styles/Buttons";
import { BlockLike } from "typescript";
import LikeIcon from "../LikeIcon";
import Styled from "./CardButtons.styles";

interface ICardButtonsProps {}

interface ITrackArtist {
  track: Track;
  artist?: Artist;
}

interface IAlbum {
  album: Album | undefined;
}

interface ILastTag {
  name: string;
  url: string;
}

interface IUrl {
  url: string;
}

function SpotifyButton({ track, artist }: ITrackArtist): JSX.Element {
  const isPremium = useClientsStore((s) => s.user.isPremium);
  const { playTrack } = useSpotifyPlayer();
  return (
    <>
      {isPremium && (
        <Buttons.PrimaryGreenButton
          onClick={() => {
            playTrack(track);
          }}
        >
          <FaSpotify />
          <span>Play Now</span>
        </Buttons.PrimaryGreenButton>
      )}
    </>
  );
}

function EnqueueButton({ track, artist }: ITrackArtist): JSX.Element {
  const isPremium = useClientsStore((s) => s.user.isPremium);
  const { enqueue } = useSpotifyPlayer();
  return (
    <>
      {isPremium && (
        <Buttons.SecondaryGreenButton
          onClick={() => {
            enqueue(track);
          }}
        >
          <MdQueueMusic />
          <span>Add to Queue</span>
        </Buttons.SecondaryGreenButton>
      )}
    </>
  );
}

function PlayAlbum({ album }: IAlbum) {
  const isPremium = useClientsStore((s) => s.user.isPremium);
  const { playAlbum } = useSpotifyPlayer();

  return (
    <>
      {isPremium && album && (
        <Buttons.SecondaryGreenButton
          onClick={() => {
            playAlbum(album);
          }}
        >
          <MdAlbum />
          <span>Play Full Album</span>
        </Buttons.SecondaryGreenButton>
      )}
    </>
  );
}

function TagButton({ name, url }: ILastTag) {
  return (
    <Buttons.PrimaryRedButton
      onClick={() => {
        window.open(url, "_blank");
      }}
    >
      {name}
    </Buttons.PrimaryRedButton>
  );
}

function OpenLastFMButton({ url }: IUrl) {
  return (
    <Styled.LastFMButton
      aria-label={"Open LastFM"}
      onClick={() => {
        window.open(url, "_blank");
      }}
    >
      <FaLastfm />
    </Styled.LastFMButton>
  );
}

function OpenSpotifyButton({ url }: IUrl) {
  return (
    <Styled.SpotifyButton
      aria-label={"Open Spotify"}
      onClick={() => {
        window.open(url, "_blank");
      }}
    >
      <FaSpotify />
    </Styled.SpotifyButton>
  );
}

function LikeButton({ isLiked }: { isLiked: boolean }) {
  return (
    <Buttons.SecondaryGreenButton rounded>
      <LikeIcon isLiked={isLiked} />
    </Buttons.SecondaryGreenButton>
  );
}

function PlusButton({ onClick }: { onClick: () => void }) {
  return (
    <Buttons.SecondaryGreenButton rounded onClick={onClick} aria-label={"More"}>
      <FaPlus />
    </Buttons.SecondaryGreenButton>
  );
}

interface IPlaylistButton {
  inPlaylist?: boolean;
  toggleFromPlaylist?: (track: Track) => void;
  track: Track;
  showLabels?: boolean;
}
function PlaylistButton({
  inPlaylist,
  toggleFromPlaylist,
  track,
  showLabels = true,
}: IPlaylistButton) {
  return (
    (toggleFromPlaylist !== undefined && (
      <>
        <Buttons.SecondaryGreenButton
          onClick={() => toggleFromPlaylist(track)}
          rounded={!showLabels}
        >
          {inPlaylist ? (
            <>
              <FaMinus /> {showLabels && <span>Remove From Playlist</span>}
            </>
          ) : (
            <>
              <BiAddToQueue />
              {showLabels && <span>Add to Playlist</span>}
            </>
          )}
        </Buttons.SecondaryGreenButton>
      </>
    )) ||
    null
  );
}
export {
  EnqueueButton,
  SpotifyButton,
  OpenLastFMButton,
  OpenSpotifyButton,
  PlayAlbum,
  TagButton,
  LikeButton,
  PlusButton,
  PlaylistButton,
};
