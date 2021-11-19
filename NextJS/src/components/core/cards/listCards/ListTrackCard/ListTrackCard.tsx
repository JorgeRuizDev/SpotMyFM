import Modal from "components/core/display/molecules/Modal";
import { Track } from "data/cacheDB/dexieDB/models/Track";
import prettyMilliseconds from "pretty-ms";
import { useState } from "react";
import formatPopularity from "util/spotify/formatPopularity";
import { PlaylistButton } from "../../buttons/CardButtons/CardButtons";
import TrackCompleteDetails from "../../detailedCards/TrackCompleteDetails";
import Styled from "./ListTrackCard.styles";
interface IListTrackCardProps {
  track: Track;
  pos?: number;

  toggleFromPlaylist?: (track: Track) => void;
  inPlaylist?: boolean;
}

function ListTrackCard({
  track,
  pos,
  inPlaylist,
  toggleFromPlaylist,
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

        <Styled.RightSide>
          <PlaylistButton
            track={track}
            inPlaylist={inPlaylist}
            toggleFromPlaylist={toggleFromPlaylist}
          />
          <p>{prettyMilliseconds(track.spotifyDurationMS)}</p>
        </Styled.RightSide>
      </Styled.ListItem>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <TrackCompleteDetails
          track={track}
          album={track.album}
          artists={track.artists}
        />
      </Modal>
    </>
  );
}

function ListTrackCardHeader({ pos }: { pos?: boolean }) {
  return (
    <Styled.ListItem>
      <Styled.LeftSide>
        <Styled.FirstTwoCols>
          <Styled.Pos>{pos && <p>#</p>}</Styled.Pos>
        </Styled.FirstTwoCols>

        <Styled.E1>
          <p>Name</p>
        </Styled.E1>

        <Styled.E2>
          <p>Album</p>
        </Styled.E2>

        <Styled.E3>
          <p>Release Date</p>
        </Styled.E3>

        <Styled.E5>
          <p>Genres</p>
        </Styled.E5>

        <Styled.E6>
          <p>Popularity</p>
        </Styled.E6>
      </Styled.LeftSide>

      <Styled.RightSide>
        <p></p>
      </Styled.RightSide>
    </Styled.ListItem>
  );
}

export { ListTrackCard, ListTrackCardHeader };
