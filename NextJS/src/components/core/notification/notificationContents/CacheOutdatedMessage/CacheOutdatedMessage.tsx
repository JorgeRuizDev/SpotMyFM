import { useMemo } from "react";
import Styled from "./CacheOutdatedMessage.styles";
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
  return (
    <Styled.NotificationWrapper>
      <div>
        <Styled.b>
          The local library cache seems to be outdated{" "}
          {update && `(Last Update ${update})`}{" "}
        </Styled.b>

        <br />
        <Styled.p>
          ¿Do you want to refresh the Cache? This process will only add your new
          liked tracks.
        </Styled.p>
      </div>

      <Styled.CacheButton onClick={onClick}>Refresh Cache</Styled.CacheButton>
    </Styled.NotificationWrapper>
  );
}

export default CacheOutdatedMessage;
