import Modal from "components/core/display/molecules/Modal";
import { Track } from "data/cacheDB/dexieDB/models/Track";
import prettyMilliseconds from "pretty-ms";
import React, { useState } from "react";
import formatPopularity from "util/spotify/formatPopularity";
import { PlaylistButton } from "../../buttons/CardButtons/CardButtons";
import TrackCompleteDetails from "../../detailedCards/TrackCompleteDetails";
import { AiOutlineClockCircle } from "react-icons/ai";
import Styled from "./ListTrackCard.styles";
import { IGenericCardViewSortProps } from "../../views/GenericCardView/GenericCardView";
interface IListTrackCardProps {
  track: Track;
  pos?: number;

  toggleFromPlaylist?: (track: Track) => void;
  inPlaylist?: boolean;
  isNested?: boolean;
}

function ListTrackCard({
  track,
  pos,
  inPlaylist,
  toggleFromPlaylist,
  isNested = false,
}: IListTrackCardProps): JSX.Element {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <Styled.ListItem
        onClick={(e) => {
          setIsModalOpen((s) => !s);
          e.preventDefault();
        }}
      >
        <Styled.LeftSide>
          <Styled.FirstTwoCols>
            <Styled.Pos>{pos != undefined && <p>{pos}</p>}</Styled.Pos>
            <Styled.Cover
              src={
                track.album?.spotifyCoverUrl[
                  track.album?.spotifyCoverUrl.length - 1
                ]
              }
              alt={"Album Cover"}
            ></Styled.Cover>
          </Styled.FirstTwoCols>

          <Styled.E1>
            <p>{track.name}</p>
            <span onClick={(e) => e.stopPropagation()}>
              {track.artists.map((a, i) => (
                <a href={a.spotifyUrl} key={i}>
                  {a.name + " "}
                </a>
              ))}
            </span>
          </Styled.E1>

          <Styled.E2>
            <p>{track.album?.name}</p>
          </Styled.E2>

          <Styled.E3>
            <p>{track.album?.spotifyReleaseDate?.toLocaleDateString()}</p>
          </Styled.E3>

          <Styled.E5>
            <Styled.TrucateP>
              {track.artists[0]?.spotifyGenres?.slice(0, 2).join(", ") ||
                "No Genres"}
            </Styled.TrucateP>
          </Styled.E5>

          <Styled.E6>
            <p>{formatPopularity(track.spotifyPopularity)}</p>
          </Styled.E6>
        </Styled.LeftSide>

        <Styled.RightSide onClick={(e) => e.stopPropagation()}>
          <Styled.Length>
            <p>{prettyMilliseconds(track.spotifyDurationMS)}</p>
          </Styled.Length>
          <PlaylistButton
            track={track}
            inPlaylist={inPlaylist}
            toggleFromPlaylist={toggleFromPlaylist}
            showLabels={false}
          />
        </Styled.RightSide>
      </Styled.ListItem>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <TrackCompleteDetails
          track={track}
          album={track.album}
          artists={track.artists}
          isNested={isNested}
        />
      </Modal>
    </>
  );
}

function ListTrackCardHeader({
  pos,
  sorting,
}: {
  pos?: boolean;
  sorting?: IGenericCardViewSortProps;
}): JSX.Element {
  return (
    <Styled.Header>
      <Styled.LeftSide>
        <Styled.FirstTwoCols>
          <Styled.Pos>{pos && <p>#</p>}</Styled.Pos>
        </Styled.FirstTwoCols>

        <Styled.E1>
          <Styled.GreenP>Name</Styled.GreenP>
        </Styled.E1>

        <Styled.E2>
          <Styled.GreenP>Album</Styled.GreenP>
        </Styled.E2>

        <Styled.E3>
          <Styled.GreenP>Release Date</Styled.GreenP>
        </Styled.E3>

        <Styled.E5>
          <Styled.GreenP>Genres</Styled.GreenP>
        </Styled.E5>

        <Styled.E6>
          <Styled.GreenP>Popularity</Styled.GreenP>
        </Styled.E6>
      </Styled.LeftSide>

      <Styled.RightSide>
        <Styled.RightSideSpacing>
          <Styled.GreenP>
            <AiOutlineClockCircle />
          </Styled.GreenP>
        </Styled.RightSideSpacing>
      </Styled.RightSide>
    </Styled.Header>
  );
}

export { ListTrackCard, ListTrackCardHeader };
