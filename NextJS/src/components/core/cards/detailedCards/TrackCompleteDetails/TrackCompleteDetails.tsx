import React, { ReactNode, useEffect } from "react";
import { useState } from "react";

import Styled from "./TrackCompleteDetails.styles";
import StyledText from "styles/Text";
import parse from "html-react-parser";

import prettyMilliseconds from "pretty-ms";

import { Track } from "data/cacheDB/dexieDB/models/Track";
import { Album } from "data/cacheDB/dexieDB/models/Album";
import { Artist } from "data/cacheDB/dexieDB/models/Artist";
import { useClientsStore } from "store/useClients";
import { ILastFMAlbum, LastFMDetails } from "interfaces/lastFM";
import useTrackPreview from "hooks/useTrackPreview/useTrackPreview";
import ArtistHorizontalCard from "../../horizontalCards/ArtistHorizontalCard";
import Collapsible from "components/core/display/atoms/Collapsible";
import {
  DownloadPreview,
  EnqueueButton,
  OpenLastFMButton,
  OpenSpotifyButton,
  PlayAlbum,
  SpotifyButton,
  TagButton,
} from "../../buttons/CardButtons";
import formatPopularity from "util/spotify/formatPopularity";
import { toast } from "react-toastify";
import { SaveAlbum, SaveTrack } from "../../buttons/CardButtons/CardButtons";
import HorizontalCardCarousell from "../../horizontalCards/HorizontalCardCarousell";
import { motion } from "framer-motion";
import AlbumTracksView from "../../views/AlbumTracksView";
import useTranslation from "next-translate/useTranslation";
import Buttons from "styles/Buttons";
import Modal from "components/core/display/molecules/Modal";
import { FaLessThanEqual } from "react-icons/fa";
import ModifyAlbumTags from "../../other/ModifyAlbumTags";
import Twemoji from "components/util/Twemoji";
import { BsFillPencilFill } from "react-icons/bs";
interface ITrackCompleteDetailsProps {
  track?: Track;
  album?: Album;
  artists?: Artist[];
  isNested?: boolean;
}

function TrackCompleteDetails({
  track,
  album,
  artists,
  isNested = false,
}: ITrackCompleteDetailsProps): JSX.Element {
  const [lastFMDetails, setLastFMDetails] = useState<ILastFMAlbum | null>(null);
  const [isTrackLiked, setIsTrackLiked] = useState(false);
  const [isAlbumLiked, setIsAlbumLiked] = useState(false);
  const { lastfmApi, spotifyApi } = useClientsStore();
  const [showAlbumTracks, setShowAlbumTracks] = useState(false);
  const { t } = useTranslation();
  const { play, pause, PreviewButton } = useTrackPreview(
    track?.spotifyPreviewURL || "",
    false,
    true
  );

  // On Unmount, puase the music:
  useEffect(() => {
    return () => {
      pause();
    };
  }, [pause]);

  // Get the LastFM items
  useEffect(() => {
    lastfmApi
      .getAlbumDetails(artists?.[0]?.name || "", album?.name || "")
      .then((res) => {
        setLastFMDetails(res[0]);
      });
  }, [artists, album, lastfmApi]);

  // Check if the album & tracks are liked or not
  useEffect(() => {
    album &&
      spotifyApi
        .containsMySavedAlbums([album.spotifyId])
        .then((res) => setIsAlbumLiked(res?.[0]))
        .catch((e) => toast.error(spotifyApi.parse(e)?.message));

    track &&
      spotifyApi
        .containsMySavedTracks([track.spotifyId])
        .then((res) => setIsTrackLiked(res?.[0]))
        .catch((e) => toast.error(spotifyApi.parse(e)?.message));
  }, [album, track, spotifyApi]);

  const hasDesc = (lastFMDetails?.lastfmDescription?.length || 0) > 20;

  return (
    <div>
      <Styled.Wrapper>
        <div style={{ width: "100%" }}>
          <h3>
            {track && (
              <>
                <StyledText.pGreen>{track?.name}</StyledText.pGreen> from{" "}
              </>
            )}
            {
              <>
                {!track && "Album: "}{" "}
                <StyledText.pGreen>{album?.name}</StyledText.pGreen>
              </>
            }
          </h3>
          <hr />
          {hasDesc && (
            <Styled.InfoGrid>
              <Styled.Column>
                <>
                  <Cover album={album} play={play} pause={pause} />
                  <CoverText
                    album={album}
                    track={track}
                    artists={artists}
                    lastFMDetails={lastFMDetails}
                  />
                  <Buttons_ />
                  <LastFMTags />
                  <AlbumTags album={album} />
                </>
              </Styled.Column>
              <RightColumn
                artists={artists || []}
                lastFMDetails={lastFMDetails}
              ></RightColumn>
            </Styled.InfoGrid>
          )}
        </div>
      </Styled.Wrapper>
      {!hasDesc && (
        <Styled.NoDescLayout>
          <Cover album={album} play={play} pause={pause} />

          <HorizontalCardCarousell>
            {(artists || []).map((a) => (
              <ArtistHorizontalCard artist={a} key={a.spotifyId} />
            )) || []}
          </HorizontalCardCarousell>

          <CoverText
            album={album}
            track={track}
            artists={artists}
            lastFMDetails={lastFMDetails}
          />
          <div>
            <Buttons_ />
          </div>
          <AlbumTags album={album} />
          <LastFMTags />
        </Styled.NoDescLayout>
      )}
      {album && !isNested && showAlbumTracks ? (
        <AlbumTracksView album={album} />
      ) : (
        <Styled.CenterElement>
          <Buttons.PrimaryGreenButton
            onClick={() => setShowAlbumTracks(true)}
            style={{ marginTop: "80px" }}
          >
            Show Album Tracks
          </Buttons.PrimaryGreenButton>
        </Styled.CenterElement>
      )}
    </div>
  );

  function LastFMTags(): JSX.Element {
    return (album?.lastfmTagsFull?.length || 0) > 0 ? (
      <Styled.Column>
        <h4>{t("cards:lastfm-tags")}</h4>
        <Styled.TagsButtonRow>
          {album?.lastfmTagsFull?.map((t) => (
            <TagButton url={t.url} name={t.name} key={t.name} />
          ))}
        </Styled.TagsButtonRow>
      </Styled.Column>
    ) : (
      <></>
    );
  }

  function Buttons_(): JSX.Element {
    return (
      <Styled.TagsButtonRow>
        {track && <PreviewButton />}
        {track && <SpotifyButton track={track} artist={artists?.[0]} />}
        {track && <EnqueueButton track={track} artist={artists?.[0]} />}
        {track && <DownloadPreview track={track} />}
        {track && (
          <SaveTrack
            item={track}
            api={spotifyApi}
            isSaved={isTrackLiked}
            setIsSaved={setIsTrackLiked}
          />
        )}
        {album && (
          <SaveAlbum
            item={album}
            api={spotifyApi}
            isSaved={isAlbumLiked}
            setIsSaved={setIsAlbumLiked}
          />
        )}
        <PlayAlbum album={album} />
        <OpenSpotifyButton url={album?.spotifyUrl || ""} />
        <OpenLastFMButton url={lastFMDetails?.lastfmURL || ""} />
      </Styled.TagsButtonRow>
    );
  }
}

function AlbumTags({ album }: { album?: Album }): JSX.Element {
  const [showModal, setShowModal] = useState(false);
  const { t } = useTranslation();
  return album ? (
    <Styled.Column>
      <h4 style={{ marginTop: 20 }}>
        <Twemoji emoji="🏷" type="emoji" /> {t("views:album-tags")}
      </h4>

      <Styled.TagsButtonRow>
        {album.albumTags.map((t) => (
          <Buttons.SecondaryGreenButton key={t}>
            {t}
          </Buttons.SecondaryGreenButton>
        ))}{" "}
        <Buttons.PrimaryGreenButton
          onClick={() => setShowModal(true)}
          rounded={album.albumTags.length !== 0}
        >
          <BsFillPencilFill />{" "}
          {album.albumTags.length === 0 && (
            <span>{t("views:add-new-tags")}</span>
          )}
        </Buttons.PrimaryGreenButton>
      </Styled.TagsButtonRow>

      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <ModifyAlbumTags
          album={album}
          closeModal={() => {
            setShowModal(false);
          }}
        />
      </Modal>
    </Styled.Column>
  ) : (
    <></>
  );
}

function Cover({
  album,
  play,
  pause,
}: {
  album?: Album;
  play: () => void;
  pause: () => void;
}) {
  return (
    <Styled.AlbumColumn>
      <motion.div
        onMouseEnter={play}
        onMouseLeave={pause}
        whileHover={{
          scale: 1.1,
          transition: { ease: "easeInOut", duration: 0.3 },
        }}
      >
        <Styled.Image
          src={album?.spotifyCoverUrl[0] || ""}
          alt={album?.name}
          height={"320px"}
          width={"320px"}
        />
      </motion.div>
    </Styled.AlbumColumn>
  );
}

function RightColumn({
  artists,
  lastFMDetails,
  children,
}: {
  artists: Artist[];
  lastFMDetails: ILastFMAlbum | null;
  children?: ReactNode | ReactNode[];
}): JSX.Element {
  return (
    <Styled.Column
      centerCol={(lastFMDetails?.lastfmDescription?.length || 0) < 20}
    >
      <HorizontalCardCarousell>
        {artists.map((a) => (
          <ArtistHorizontalCard artist={a} key={a.spotifyId} />
        )) || []}
      </HorizontalCardCarousell>
      {children}
      {lastFMDetails?.lastfmDescription ? (
        <>
          <h4>Album Description</h4>
          <Styled.DescriptionBox>
            <p>{parse(lastFMDetails?.lastfmDescription || "")}</p>
          </Styled.DescriptionBox>
        </>
      ) : (
        <></>
      )}
    </Styled.Column>
  );
}

function CoverText({
  album,
  track,
  artists,
  lastFMDetails,
}: {
  album?: Album;
  track?: Track;
  artists?: Artist[];
  lastFMDetails: ILastFMAlbum | null;
}): JSX.Element {
  const { t } = useTranslation("cards");
  return (
    <ul>
      <li>
        <h6>
          {t("cards:released-on")}{" "}
          <StyledText.pGreen>
            {album?.spotifyReleaseDate?.toLocaleDateString()}
          </StyledText.pGreen>
        </h6>
      </li>

      <li>
        {track && (
          <h6>
            {t("cards:track-length")}h{" "}
            <StyledText.pGreen>
              {prettyMilliseconds(track.spotifyDurationMS)}
            </StyledText.pGreen>
          </h6>
        )}
      </li>
      <li>
        <h6>
          {t("cards:album-popularity")} <br />
          <StyledText.pGreen>
            &nbsp;&nbsp;
            {formatPopularity(album?.spotifyPopularity || 0)}
          </StyledText.pGreen>
        </h6>
      </li>
      <li>
        <h6>
          {t("cards:artist-popularity")} <br />
          <StyledText.pGreen>
            &nbsp;&nbsp;
            {formatPopularity(artists?.[0]?.spotifyPopularity || 0)}
          </StyledText.pGreen>
        </h6>
      </li>
      <>
        <li>
          <h6>
            <StyledText.pGreen>
              {lastFMDetails?.lastfmListenersCount}
            </StyledText.pGreen>{" "}
            {t("cards:lastfm-listeners")}{" "}
          </h6>
        </li>
        <li>
          <h6>
            <StyledText.pGreen>
              {lastFMDetails?.lastfmPlayCount}
            </StyledText.pGreen>{" "}
            {t("cards:lastfm-plays")}{" "}
          </h6>
        </li>
      </>
    </ul>
  );
}

export default React.memo(TrackCompleteDetails);
