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
interface ITrackCompleteDetailsProps {
  track?: Track;
  album?: Album;
  artists?: Artist[];
}

function TrackCompleteDetails({
  track,
  album,
  artists,
}: ITrackCompleteDetailsProps) {
  const [lastFMDetails, setLastFMDetails] = useState<ILastFMAlbum | null>(null);
  const { lastfmApi } = useClientsStore();
  useEffect(() => {
    lastfmApi
      .getAlbumDetails(artists?.[0]?.name || "", album?.name || "")
      .then((res) => {
        setLastFMDetails(res[0]);
      });
  }, [artists, album, lastfmApi]);

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
            <RightColumn />
          </Styled.InfoGrid>
        </div>
      </Styled.Wrapper>
    </div>
  );

  function AlbumCollapsible() {
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

  function LastFMTags() {
    return album?.lastfmTagsFull?.length || 0 > 0 ? (
      <>
        <hr />
        <h4>LastFM Tags:</h4>
        <Styled.TagsButtonRow>
          {album?.lastfmTagsFull?.map((t) => (
            <TagButton url={t.url} name={t.name} key={t.name} />
          ))}
        </Styled.TagsButtonRow>
      </>
    ) : null;
  }

  function Buttons() {
    return (
      <Styled.ButtonRow>
        {track && <PreviewButton />}
        {track && <SpotifyButton track={track} artist={artists?.[0]} />}
        {track && <EnqueueButton track={track} artist={artists?.[0]} />}
        <PlayAlbum album={album} />
        <OpenSpotifyButton url={album?.spotifyUrl || ""} />
        <OpenLastFMButton url={lastFMDetails?.lastfmURL || ""} />
      </Styled.ButtonRow>
    );
  }

  function RightColumn() {
    return (
      <Styled.Column>
        {artists?.map((a) => (
          <ArtistHorizontalCard artist={a} key={a.spotifyId} />
        ))}
        <Styled.DescriptionBox>
          <p>{parse(lastFMDetails?.lastfmDescription || "")}</p>
        </Styled.DescriptionBox>
        {album?.lastfmTagsNames || 0 > 0 ? <Styled.BouncyArrow /> : null}
      </Styled.Column>
    );
  }

  function CoverText() {
    return (
      <ul>
        <li>
          <h5>
            Released on{" "}
            <StyledText.pGreen>
              {album?.spotifyReleaseDate?.toLocaleDateString()}
            </StyledText.pGreen>
          </h5>
        </li>

        <li>
          {track && (
            <h5>
              Track Length{" "}
              <StyledText.pGreen>
                {prettyMilliseconds(track.spotifyDurationMS)}
              </StyledText.pGreen>
            </h5>
          )}
        </li>
        <li>
          <h5>
            Album Popularity:
            <br />
            <StyledText.pGreen>
              &nbsp;&nbsp;
              {formatPopularity(album?.spotifyPopularity || 0)}
            </StyledText.pGreen>
          </h5>
        </li>
        <li>
          <h5>
            Artist Popularity:
            <br />
            <StyledText.pGreen>
              &nbsp;&nbsp;
              {formatPopularity(artists?.[0]?.spotifyPopularity || 0)}
            </StyledText.pGreen>
          </h5>
        </li>
        <>
          {" "}
          <li>
            <h5>
              <StyledText.pGreen>
                {lastFMDetails?.lastfmListenersCount}
              </StyledText.pGreen>{" "}
              LastFM Listeners
            </h5>
          </li>
          <li>
            <h5>
              <StyledText.pGreen>
                {lastFMDetails?.lastfmPlayCount}
              </StyledText.pGreen>{" "}
              LastFM Plays
            </h5>
          </li>{" "}
        </>
      </ul>
    );
  }
}

export default TrackCompleteDetails;
