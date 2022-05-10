import React, { useEffect } from "react";
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
import LudwigResultsCard from "../../horizontalCards/LudwigResultsCard";
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
  const { lastfmApi, spotifyApi, ludwigApi } = useClientsStore();
  const [showAlbumTracks, setShowAlbumTracks] = useState(false);
  const { t } = useTranslation();
  const [isMirLoading, setIsMirLoading] = useState(false);

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
  useEffect(() => {
    if (
      track &&
      (track?.ludwigMoods == undefined || track.ludwigGenres == undefined)
    ) {
      setIsMirLoading(true);
      const fn = async () => {
        const [res, error] = await ludwigApi.getTrackDetails(track, true, true);

        if (res && !error) {
          track.ludwigGenres = res.genres;
          track.ludwigMoods = res.moods;
          track.ludwigSubgenres = res.subgenres;
        } else {
          toast.error(
            `An error ocured while analyzing the track: ${error?.message}`
          );
        }
        setIsMirLoading(false);
      };

      fn();
    }
  }, [ludwigApi, setIsMirLoading, track]);
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

  return (
    <div>
      <Styled.Wrapper>
        <div>
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
          <Styled.InfoGrid>
            <Styled.Column>
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

                <AlbumCollapsible album={album} />

                <CoverText
                  album={album}
                  track={track}
                  artists={artists}
                  lastFMDetails={lastFMDetails}
                />
              </Styled.AlbumColumn>
              <Buttons_ />
              <LastFMTags />
              <AlbumTags album={album} />
            </Styled.Column>
            <RightColumn
              track={track}
              isMirLoading={isMirLoading}
              artists={artists || []}
              lastFMDetails={lastFMDetails}
            />
          </Styled.InfoGrid>
        </div>
      </Styled.Wrapper>
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
      <>
        <h4>{t("cards:lastfm-tags")}</h4>
        <Styled.TagsButtonRow>
          {album?.lastfmTagsFull?.map((t) => (
            <TagButton url={t.url} name={t.name} key={t.name} />
          ))}
        </Styled.TagsButtonRow>
      </>
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

function RightColumn({
  artists,
  track,
  isMirLoading,
  lastFMDetails,
}: {
  artists: Artist[];
  lastFMDetails: ILastFMAlbum | null;
  track?: Track;
  isMirLoading: boolean;
}): JSX.Element {
  return (
    <Styled.Column>
      <HorizontalCardCarousell>
        {artists.map((a) => (
          <ArtistHorizontalCard artist={a} key={a.spotifyId} />
        )) || []}
      </HorizontalCardCarousell>
      <LudwigResultsCard
        isLoading={isMirLoading}
        genres={track?.ludwigGenres}
        moods={track?.ludwigMoods}
        subgenres={track?.ludwigSubgenres}
      />
      {lastFMDetails?.lastfmDescription ? (
        <>
          <h4>Album Description</h4>
          <Styled.DescriptionBox>
            <p>{parse(lastFMDetails?.lastfmDescription || "")}</p>
          </Styled.DescriptionBox>
        </>
      ) : (
        <>
          <h4>This album does not have a description</h4>
        </>
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

function AlbumCollapsible({ album }: { album?: Album }): JSX.Element {
  return (
    <Styled.CenterElement>
      <Collapsible>
        <iframe
          src={`https://open.spotify.com/embed/album/${album?.spotifyId}`}
          width="100%"
          height="380"
          frameBorder="0"
          allow="encrypted-media"
        ></iframe>
      </Collapsible>
    </Styled.CenterElement>
  );
}
export default React.memo(TrackCompleteDetails);
