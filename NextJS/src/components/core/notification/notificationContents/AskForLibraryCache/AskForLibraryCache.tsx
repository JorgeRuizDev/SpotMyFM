import { useLibraryCache } from "hooks/cache/useLibraryCache";
import Styled from "./AskForLibraryCache.styles";

interface IAskForLibraryCacheProps {
  onClick: () => void;
}

function AskForLibraryCache({ onClick }: IAskForLibraryCacheProps) {
  return (
    <Styled.Flex>
      <div>
        <Styled.b>
          ¿Do you want to store your Spotify Library in this browser?
        </Styled.b>
        <br />
        <Styled.p>
          Some features like "Library Manager" or "Real Shuffle" need to know
          all your favorite songs in order to work properly.
          <br />
          This process can take a long time depending on the number of songs you
          have marked as favorite.
        </Styled.p>
      </div>
      <Styled.CacheButton onClick={onClick}>
        Download My Library
      </Styled.CacheButton>
    </Styled.Flex>
  );
}

export default AskForLibraryCache;
