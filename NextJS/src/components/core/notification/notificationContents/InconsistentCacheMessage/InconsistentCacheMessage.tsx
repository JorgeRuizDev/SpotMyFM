import Styled from "./InconsistentCacheMessage.styles";
import useTranslation from "next-translate/useTranslation";
interface IInconsistentCacheMessageProps {
  onClick: () => void;
}

function InconsistentCacheMessage({ onClick }: IInconsistentCacheMessageProps) {
  const { t } = useTranslation();

  return (
    <Styled.NotificationWrapper>
      <div>
        <Styled.b>{t("cards:the_cache_seems_to_be_inconsistent")}</Styled.b>

        <br />
        <Styled.p>
          {t("cards:there_was_an_error_while_caching_your_library_did")}
        </Styled.p>
      </div>

      <Styled.CacheButton onClick={onClick}>
        {t("cards:fix_now")}
      </Styled.CacheButton>
    </Styled.NotificationWrapper>
  );
}

export default InconsistentCacheMessage;
