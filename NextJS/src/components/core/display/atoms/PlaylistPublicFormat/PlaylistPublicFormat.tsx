import { MdGroup, MdLock, MdPublic } from "react-icons/md";
import Text from "styles/Text";
import useTranslation from "next-translate/useTranslation";
interface IPlaylistPublicFormatProps {
  playlist?: SpotifyApi.PlaylistObjectSimplified;
}

function PlaylistPublicFormat({
  playlist,
}: IPlaylistPublicFormatProps): JSX.Element {
  const { t } = useTranslation();
  return playlist ? (
    <Text.Inline>
      {playlist.collaborative ? (
        <>
          <span>{t("cards:collaborative")}</span> <MdGroup />
        </>
      ) : playlist.public ? (
        <>
          <span>{t("cards:public")}</span>
          <MdPublic />
        </>
      ) : (
        <>
          <span>{t("cards:private")}</span>
          <MdLock />
        </>
      )}
    </Text.Inline>
  ) : (
    <></>
  );
}

export default PlaylistPublicFormat;
