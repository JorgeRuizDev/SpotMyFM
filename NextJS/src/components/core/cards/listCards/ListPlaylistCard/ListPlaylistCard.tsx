import PlaylistPublicFormat from "components/core/display/atoms/PlaylistPublicFormat";
import Modal from "components/core/display/molecules/Modal";
import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import Buttons from "styles/Buttons";
import PlaylistCompleteDetails from "../../detailedCards/PlaylistCompleteDetails";
import Styled from "./ListPlaylistCard.styles";
interface IListPlaylistCardProps {
  playlist: SpotifyApi.PlaylistObjectSimplified;
  pos?: number;
  onMore?: () => void;
}

function ListPlaylistCardHeader({ pos }: { pos?: boolean }): JSX.Element {
  return (
    <Styled.Header>
      <Styled.LeftSide>
        <Styled.FirstTwoCols>
          <Styled.Pos>{pos && <p>#</p>}</Styled.Pos>
        </Styled.FirstTwoCols>

        <Styled.E1>
          <Styled.GreenP>Title</Styled.GreenP>
        </Styled.E1>

        <Styled.E2>
          <Styled.GreenP>Owner</Styled.GreenP>
        </Styled.E2>
        <Styled.E3>
          <Styled.GreenP>Status</Styled.GreenP>
        </Styled.E3>
        <Styled.E4>
          <Styled.GreenP>Description</Styled.GreenP>
        </Styled.E4>
      </Styled.LeftSide>

      <Styled.RightSide>
        <Styled.RightSideSpacing>
          <Styled.E4>
            <Styled.GreenP>Track Count</Styled.GreenP>
          </Styled.E4>
        </Styled.RightSideSpacing>
      </Styled.RightSide>
    </Styled.Header>
  );
}

function ListPlaylistCard({
  playlist,
  pos,
  onMore = () => {},
}: IListPlaylistCardProps): JSX.Element {
  return (
    <>
      <Styled.ListItem
        onClick={(e) => {
          onMore();
          e.preventDefault();
        }}
      >
        <Styled.LeftSide>
          <Styled.FirstTwoCols>
            <Styled.Pos>{pos != undefined && <p>{pos}</p>}</Styled.Pos>
            <Styled.Cover
              src={playlist.images[playlist.images.length - 1]?.url}
              alt={"Playlist Cover"}
            ></Styled.Cover>
          </Styled.FirstTwoCols>

          <Styled.E1>
            <p>{playlist.name}</p>
          </Styled.E1>

          <Styled.E2>
            <a href={playlist.owner.href}>{playlist.owner.display_name}</a>
            {playlist.owner.images?.[0] && (
              <Styled.Cover
                src={playlist.owner.images[0].url}
                alt="asdf"
              ></Styled.Cover>
            )}
          </Styled.E2>
          <Styled.E3>
            <PlaylistPublicFormat playlist={playlist} />
          </Styled.E3>
          <Styled.E4>
            <Styled.TrucateP>
              {playlist.description || "No Description"}
            </Styled.TrucateP>
          </Styled.E4>
        </Styled.LeftSide>

        <Styled.RightSide onClick={(e) => e.stopPropagation()}>
          <Styled.Length>
            <p>{playlist.tracks.total}</p>
          </Styled.Length>

          <Buttons.SecondaryGreenButton rounded onClick={onMore}>
            <FaPlus />
          </Buttons.SecondaryGreenButton>
        </Styled.RightSide>
      </Styled.ListItem>
    </>
  );
}

export { ListPlaylistCard, ListPlaylistCardHeader };
