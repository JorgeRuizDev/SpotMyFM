import { useMemo } from "react";
import Styled from "./CacheOutdatedMessage.styles";
import useTranslation from "next-translate/useTranslation";
interface ICacheOutdatedMessageProps {
  onClick: () => void;
  lastCacheUpdate?: Date;
}

function CacheOutdatedMessage({
  onClick,
  lastCacheUpdate,
}: ICacheOutdatedMessageProps) {
  const update = useMemo(
    () => lastCacheUpdate?.toLocaleDateString(),
    [lastCacheUpdate]
  );

  const { t } = useTranslation();
  return (
    <Styled.NotificationWrapper>
      <div>
        <Styled.b>
          {t("cards:the_local_library_cache_seems_to_be_outdated")}{" "}
          {update && `(Last Update ${update})`}{" "}
        </Styled.b>

        <br />
        <Styled.p>
          {t("cards:do_you_want_to_refresh_the_cache_this_process_will")}
        </Styled.p>
      </div>

      <Styled.CacheButton onClick={onClick}>
        {t("cards:refresh_cache")}
      </Styled.CacheButton>
    </Styled.NotificationWrapper>
  );
}

export default CacheOutdatedMessage;
