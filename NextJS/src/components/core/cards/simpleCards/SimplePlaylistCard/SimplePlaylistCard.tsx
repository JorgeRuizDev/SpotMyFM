import Styled from "./SimplePlaylistCard.styles";
import Buttons from "styles/Buttons";
import { useState } from "react";

interface ISmallPlaylistCardProps {
  playlist: SpotifyApi.PlaylistObjectSimplified;
  onDetailsClick: () => void;
  compact?: boolean;
}

function SimplePlaylistCard({
  playlist,
  onDetailsClick,
  compact = false,
}: ISmallPlaylistCardProps) {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <>
      <Styled.CardLayout compact>
        <Styled.Image
          src={playlist.images[1]?.url || playlist.images[0]?.url}
          alt={playlist.name + " cover"}
        />
        <Styled.Content>
          <Styled.InfoLayout>
            <h5>{playlist.name}</h5>
            <ul>
              <li>
                {" "}
                <p>
                  {playlist.tracks.total}
                  {" tracks"}
                </p>
              </li>
              <li>
                <p>
                  {playlist.collaborative
                    ? "Collaborative"
                    : playlist.public
                    ? "Public"
                    : "Private"}
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
