import { Album } from "data/cacheDB/dexieDB/models/Album";
import { Artist } from "data/cacheDB/dexieDB/models/Artist";
import { Track } from "data/cacheDB/dexieDB/models/Track";

import React from "react";
import { FaLastfm, FaSpotify } from "react-icons/fa";
import { MdAlbum, MdQueueMusic } from "react-icons/md";
import { toast } from "react-toastify";
import Buttons from "styles/Buttons";
import LikeIcon from "../LikeIcon";
import Styled from "./CardButtons.styles";

interface ICardButtonsProps {}

interface ITrackArtist {
  track: Track;
  artist?: Artist;
}

interface IAlbum {
  album?: Album;
}

interface ILastTag {
  name: string;
  url: string;
}
interface IonClick {
  onClick: () => void;
}

interface IUrl {
  url: string;
}

function SpotifyButton({ track, artist }: ITrackArtist) {
  return (
    <>
      <Buttons.PrimaryGreenButton
        onClick={() => {
          toast.info(`🎵 Now Playing "${track.name}" by "${artist?.name}".`);
        }}
      >
        <FaSpotify />
        <span>Play Now</span>
      </Buttons.PrimaryGreenButton>
    </>
  );
}

function EnqueueButton({ track, artist }: ITrackArtist) {
  return (
    <>
      <Buttons.SecondaryGreenButton
        onClick={() => {
          toast.info(
            `"${track.name}" by "${artist?.name}" has been added to the queue`
          );
        }}
      >
        <MdQueueMusic />
        <span>Add to Queue</span>
      </Buttons.SecondaryGreenButton>
    </>
  );
}

function PlayAlbum({ album }: IAlbum) {
  return (
    <>
      <Buttons.SecondaryGreenButton
        onClick={() => {
          toast.info(`🎵 Now Playing The Album "${album?.name}".`);
        }}
      >
        <MdAlbum />
        <span>Play Full Album</span>
      </Buttons.SecondaryGreenButton>
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
export {
  EnqueueButton,
  SpotifyButton,
  OpenLastFMButton,
  OpenSpotifyButton,
  PlayAlbum,
  TagButton,
  LikeButton,
};
