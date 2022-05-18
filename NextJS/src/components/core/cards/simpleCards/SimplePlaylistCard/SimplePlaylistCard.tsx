import Styled from "./SimplePlaylistCard.styles";
import Buttons from "styles/Buttons";
import { useState } from "react";
import Text from "styles/Text";
import { MdGroup, MdLock, MdPublic } from "react-icons/md";
import PlaylistPublicFormat from "components/core/display/atoms/PlaylistPublicFormat";
import useTranslation from "next-translate/useTranslation";
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
  const { t } = useTranslation();
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
                  <PlaylistPublicFormat playlist={playlist} />
                </p>
                <p>{t('cards:by', {'display_name': playlist.owner.display_name})}</p>
              </li>
            </ul>
          </Styled.InfoLayout>
          <Buttons.LayoutCenter>
            <Buttons.PrimaryGreenButton
              onClick={(e) => {
                e.stopPropagation();
                onDetailsClick();
              }}
            >
              {t("cards:show_details")}
            </Buttons.PrimaryGreenButton>
          </Buttons.LayoutCenter>
        </Styled.Content>
      </Styled.CardLayout>
    </>
  );
}

export default SimplePlaylistCard;
