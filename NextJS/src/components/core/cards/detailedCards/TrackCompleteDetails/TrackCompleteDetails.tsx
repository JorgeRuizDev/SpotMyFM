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
import { ILastFMAlbum } from "interfaces/lastFM";
import useTrackPreview from "hooks/useTrackPreview/useTrackPreview";
import ArtistHorizontalCard from "../../horizontalCards/ArtistHorizontalCard";
import Collapsible from "components/core/display/atoms/Collapsible";
import {
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
interface ITrackCompleteDetailsProps {
  track?: Track;
  album?: Album;
  artists?: Artist[];
}

function TrackCompleteDetails({
  track,
  album,
  artists,
}: ITrackCompleteDetailsProps): JSX.Element {
  const [lastFMDetails, setLastFMDetails] = useState<ILastFMAlbum | null>(null);
  const [isTrackLiked, setIsTrackLiked] = useState(false);
  const [isAlbumLiked, setIsAlbumLiked] = useState(false);

  const { lastfmApi, spotifyApi } = useClientsStore();

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
                <Styled.Image
                  src={album?.spotifyCoverUrl[0]}
                  alt={album?.name}
                  onMouseEnter={play}
                  onMouseLeave={pause}
                  whileHover={{
                    scale: 1.1,
                    transition: { ease: "easeInOut", duration: 0.3 },
                  }}
                />
                <AlbumCollapsible />
                <hr />
                <CoverText />
              </Styled.AlbumColumn>
              <Buttons />
              <LastFMTags />
            </Styled.Column>
            <RightColumn
              artists={artists || []}
              lastFMDetails={lastFMDetails}
            />
          </Styled.InfoGrid>
        </div>
      </Styled.Wrapper>
    </div>
  );

  function AlbumCollapsible(): JSX.Element {
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

  function LastFMTags(): JSX.Element {
    return (album?.lastfmTagsFull?.length || 0) > 0 ? (
      <>
        <hr />
        <h4>LastFM Tags:</h4>
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

  function Buttons(): JSX.Element {
    return (
      <Styled.ButtonRow>
        {track && <PreviewButton />}
        {track && <SpotifyButton track={track} artist={artists?.[0]} />}
        {track && <EnqueueButton track={track} artist={artists?.[0]} />}
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
      </Styled.ButtonRow>
    );
  }

  function CoverText(): JSX.Element {
    return (
      <ul>
        <li>
          <h6>
            Released on
            <StyledText.pGreen>
              {album?.spotifyReleaseDate?.toLocaleDateString()}
            </StyledText.pGreen>
          </h6>
        </li>

        <li>
          {track && (
            <h6>
              Track Length{" "}
              <StyledText.pGreen>
                {prettyMilliseconds(track.spotifyDurationMS)}
              </StyledText.pGreen>
            </h6>
          )}
        </li>
        <li>
          <h6>
            Album Popularity:
            <br />
            <StyledText.pGreen>
              &nbsp;&nbsp;
              {formatPopularity(album?.spotifyPopularity || 0)}
            </StyledText.pGreen>
          </h6>
        </li>
        <li>
          <h6>
            Artist Popularity:
            <br />
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
              LastFM Listeners
            </h6>
          </li>
          <li>
            <h6>
              <StyledText.pGreen>
                {lastFMDetails?.lastfmPlayCount}
              </StyledText.pGreen>{" "}
              LastFM Plays
            </h6>
          </li>
        </>
      </ul>
    );
  }
}

function RightColumn({
  artists,
  lastFMDetails,
}: {
  artists: Artist[];
  lastFMDetails: ILastFMAlbum | null;
}): JSX.Element {
  return (
    <Styled.Column>
      <HorizontalCardCarousell>
        {artists.map((a) => (
          <ArtistHorizontalCard artist={a} key={a.spotifyId} />
        )) || []}
      </HorizontalCardCarousell>

      <Styled.DescriptionBox>
        <p>{parse(lastFMDetails?.lastfmDescription || "")}</p>
      </Styled.DescriptionBox>
      <Styled.BouncyArrow />
    </Styled.Column>
  );
}
export default TrackCompleteDetails;
