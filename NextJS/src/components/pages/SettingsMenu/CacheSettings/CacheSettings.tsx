import Styled from "./CacheSettings.styles";
import Buttons from "styles/Buttons";
import Text from "styles/Text";
import useTranslation from "next-translate/useTranslation";
import { useLibraryCache } from "hooks/cache/useLibraryCache";
interface ICacheSettingsProps {}

function CacheSettings(props: ICacheSettingsProps): JSX.Element {
  const { t } = useTranslation();
  const { dropCache, deepRefreshTrackCache, cacheTrackLibrary } =
    useLibraryCache();
  return (
    <Styled.Col>
      <Styled.Inline>
        <Buttons.SecondaryGreenButton onClick={dropCache}>
          {t("settings:flush-cache")}
        </Buttons.SecondaryGreenButton>
        <Styled.Desc>{t("settings:removes-all-the-item")}</Styled.Desc>
      </Styled.Inline>

      <Styled.Inline>
        <Buttons.SecondaryGreenButton onClick={cacheTrackLibrary}>
          {t("settings:quick-library-refres")}{" "}
        </Buttons.SecondaryGreenButton>
        <Styled.Desc>{t("settings:adds-missing-new-tra")} </Styled.Desc>
      </Styled.Inline>

      <Styled.Inline>
        <Buttons.SecondaryGreenButton onClick={deepRefreshTrackCache}>
          {t("settings:full-library-refresh")}{" "}
        </Buttons.SecondaryGreenButton>
        <Styled.Desc>{t("settings:downloads-the-entire")}</Styled.Desc>
      </Styled.Inline>
    </Styled.Col>
  );
}

export default CacheSettings;
