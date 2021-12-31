import Styled from "./SimplePlaylistCard.styles";
import Buttons from "styles/Buttons";
import { useState } from "react";
import Text from "styles/Text";
import { MdGroup, MdLock, MdPublic } from "react-icons/md";
interface ISmallPlaylistCardProps {
  playlist: SpotifyApi.PlaylistObjectSimplified;
  onDetailsClick: () => void;
  compact?: boolean;
}

function SimplePlaylistCard({
  playlist,
  onDetailsClick,
  compact = false,
}: ISmallPlaylistCardProps): JSX.Element {
  return (
    <>
      <Styled.CardLayout compact={compact}>
        <Styled.Image
          src={playlist.images[1]?.url || playlist.images[0]?.url}
          alt={playlist.name + " cover"}
          height={"320px"}
          width={"320px"}
        />
        <Styled.Content>
          <Styled.InfoLayout>
            <h5>{playlist.name}</h5>
            <ul>
              <li>
                <p>
                  {playlist.tracks.total}
                  {" tracks"}
                </p>
              </li>
              <li>
                <p>
                  <Text.Inline>
                    {playlist.collaborative ? (
                      <>
                        <span>Collaborative</span> <MdGroup />
                      </>
                    ) : playlist.public ? (
                      <>
                        <span>Public</span>
                        <MdPublic />
                      </>
                    ) : (
                      <>
                        <span>Private</span>
                        <MdLock />
                      </>
                    )}
                  </Text.Inline>
                </p>
                <p>By {playlist.owner.display_name}</p>
              </li>
              <li></li>
            </ul>
          </Styled.InfoLayout>
          <Buttons.LayoutCenter>
            <Buttons.PrimaryGreenButton
              onClick={(e) => {
                e.stopPropagation();
                onDetailsClick();
              }}
            >
              Show Details
            </Buttons.PrimaryGreenButton>
          </Buttons.LayoutCenter>
        </Styled.Content>
      </Styled.CardLayout>
    </>
  );
}

export default SimplePlaylistCard;
