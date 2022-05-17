import axios from "util/axios";
import { parseAxiosError } from "util/axios/parseError";
import { Album } from "data/cacheDB/dexieDB/models/Album";
import { Artist } from "data/cacheDB/dexieDB/models/Artist";
import SpotifyBaseObject from "data/cacheDB/dexieDB/models/SpotifyObject";
import { Track } from "data/cacheDB/dexieDB/models/Track";
import useSpotifyPlayer from "hooks/spotify/useSpotifyPlayer";

import React, { createRef, useCallback, useEffect, useMemo } from "react";
import { BiAddToQueue } from "react-icons/bi";
import {
  FaDownload,
  FaLastfm,
  FaMinus,
  FaPlus,
  FaSpotify,
} from "react-icons/fa";
import { MdAlbum, MdQueueMusic } from "react-icons/md";
import { toast } from "react-toastify";
import { SpotifyClient } from "restClients/spotify/spotifyClient";
import { useClientsStore } from "store/useClients";
import Buttons from "styles/Buttons";
import LikeIcon from "../LikeIcon";
import Styled from "./CardButtons.styles";
import useTranslation from "next-translate/useTranslation";

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

interface ISave {
  item: SpotifyBaseObject;
  api: SpotifyClient;
  isSaved: boolean;
  setIsSaved: (is: boolean) => void;
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

function EnqueueButton({ track }: ITrackArtist): JSX.Element {
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

/**
 * Small Button that Downloads the track preview or opens the preview source url in a new tab.
 * @param param0
 * @returns
 */
function DownloadPreview({ track }: { track: Track }): JSX.Element {
  const url = useMemo(() => track.spotifyPreviewURL, [track.spotifyPreviewURL]);

  const download = useCallback(async () => {
    try {
      const res = await axios({
        url: track.spotifyPreviewURL || "",
        method: "GET",
        responseType: "blob", // important
      });

      // Create a new fake a tag
      const a = document.createElement("a");
      a.style.display = "none";

      a.download = `${track.artists[0]?.name} - ${track.name} (30s Preview)`;
      document.body.appendChild(a);

      a.href = URL.createObjectURL(res.data);
      a.click();
    } catch (e) {
      const err = parseAxiosError(e);
      toast.error(`${err?.message}`);
    }
  }, [track.artists, track.name, track.spotifyPreviewURL]);
  const { t } = useTranslation();

  return url && url.length > 0 ? (
    <>
      <a
        href={url}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
      >
        <Buttons.SecondaryGreenButton onClick={download}>
          <FaDownload />
          <span>{t("cards:preview")}</span>
        </Buttons.SecondaryGreenButton>
      </a>
    </>
  ) : (
    <></>
  );
}

function SaveAlbum({ item, api, isSaved, setIsSaved }: ISave): JSX.Element {
  return (
    <Buttons.SecondaryGreenButton
      onClick={() => {
        if (isSaved) {
          api
            .removeFromMySavedAlbums([item.spotifyId])
            .then(() => setIsSaved(false))
            .catch((e) => toast.error(api.parse(e)?.message));
        } else {
          api
            .addToMySavedAlbums([item.spotifyId])
            .then(() => setIsSaved(true))
            .catch((e) => toast.error(api.parse(e)?.message));
        }
      }}
    >
      <LikeIcon isLiked={isSaved} />
      <span>{isSaved ? "Remove Album" : "Save Album"}</span>
    </Buttons.SecondaryGreenButton>
  );
}

function SaveTrack({ item, api, isSaved, setIsSaved }: ISave): JSX.Element {
  return (
    <Buttons.SecondaryGreenButton
      onClick={() => {
        if (isSaved) {
          api
            .removeFromMySavedTracks([item.spotifyId])
            .then(() => setIsSaved(false))
            .catch((e) => toast.error(api.parse(e)?.message));
        } else {
          api
            .addToMySavedTracks([item.spotifyId])
            .then(() => setIsSaved(true))
            .catch((e) => toast.error(api.parse(e)?.message));
        }
      }}
    >
      <LikeIcon isLiked={isSaved} />
      <span>{isSaved ? "Remove Track" : "Save Track"}</span>
    </Buttons.SecondaryGreenButton>
  );
}

function PlayAlbum({ album }: IAlbum): JSX.Element {
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

function TagButton({ name, url }: ILastTag): JSX.Element {
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

function OpenLastFMButton({ url }: IUrl): JSX.Element {
  return (
    <Buttons.SecondaryRedButton
      rounded
      aria-label={"Open LastFM"}
      onClick={() => {
        window.open(url, "_blank");
      }}
    >
      <FaLastfm />
    </Buttons.SecondaryRedButton>
  );
}

function OpenSpotifyButton({ url }: IUrl): JSX.Element {
  return (
    <Buttons.SecondaryGreenButton
      rounded
      aria-label={"Open Spotify"}
      onClick={() => {
        window.open(url, "_blank");
      }}
    >
      <FaSpotify />
    </Buttons.SecondaryGreenButton>
  );
}

function LikeButton({ isLiked }: { isLiked: boolean }): JSX.Element {
  return (
    <Buttons.SecondaryGreenButton rounded>
      <LikeIcon isLiked={isLiked} />
    </Buttons.SecondaryGreenButton>
  );
}

function PlusButton({ onClick }: { onClick: () => void }): JSX.Element {
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
}: IPlaylistButton): JSX.Element | null {
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
  DownloadPreview,
  SaveAlbum,
  SaveTrack,
};
