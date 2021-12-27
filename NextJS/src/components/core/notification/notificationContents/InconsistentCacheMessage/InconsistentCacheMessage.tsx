import Styled from "./InconsistentCacheMessage.styles";
interface IInconsistentCacheMessageProps {
  onClick: () => void;
}

function InconsistentCacheMessage({ onClick }: IInconsistentCacheMessageProps) {
  return (
    <Styled.NotificationWrapper>
      <div>
        <Styled.b>
          The Cache seems to be inconsistent!
        </Styled.b>

        <br />
        <Styled.p>
          There was an error while caching your library ¿Did you close the page before the the caching process was completed?
        </Styled.p>
      </div>

      <Styled.CacheButton onClick={onClick}>Fix Now</Styled.CacheButton>
    </Styled.NotificationWrapper>
  );
}

export default InconsistentCacheMessage;
