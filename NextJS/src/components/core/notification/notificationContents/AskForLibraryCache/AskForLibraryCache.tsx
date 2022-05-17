import { useLibraryCache } from "hooks/cache/useLibraryCache";
import Styled from "./AskForLibraryCache.styles";
import useTranslation from "next-translate/useTranslation";
import Trans from "next-translate/Trans"
interface IAskForLibraryCacheProps {
  onClick: () => void;
}


function AskForLibraryCache({ onClick }: IAskForLibraryCacheProps) {
    const {t} = useTranslation();
  return (
    <Styled.Flex>
      <div>
        <Styled.b>
          {t('cards:do_you_want_to_store_your_spotify_library_in_this')}
        </Styled.b>
        <br />
        <Styled.p>
            <Trans
                i18nKey="cards:some_features_like_library_manager_or_real_shuffle"
                components={{
                    b: <br/>
                }}
            />
        </Styled.p>
      </div>
      <Styled.CacheButton onClick={onClick}>
        {t('cards:download_my_library')}
      </Styled.CacheButton>
    </Styled.Flex>
  );
}

export default AskForLibraryCache;
