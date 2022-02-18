import useScrollPosition from "hooks/scrollPosition/useScrollPosition";
import useSpotifyPlayer from "hooks/spotify/useSpotifyPlayer";
import { ReactNode, useEffect, useState } from "react";
import { useClientsStore } from "store/useClients";
import Styled from "./ImageHead.styles";
interface IImageHeadProps {
  children?: ReactNode | ReactNode[];
}

function ImageHead({ children }: IImageHeadProps): JSX.Element {
  const { cacheClient } = useClientsStore();

  const position = useScrollPosition();

  const [img, setImg] = useState<string>();
  const { nowPlaying } = useSpotifyPlayer();
  useEffect(() => {
    setImg(nowPlaying?.album?.spotifyCoverUrl?.[0]);
  }, [nowPlaying]);

  return (
    <>
      {
        <Styled.HideOverflow>
          <Styled.Wrap style={{ marginTop: position * 0.6 }}>
            <Styled.Img src={img} alt="Heading" />
            <Styled.ExtraBlur />
          </Styled.Wrap>
          {children}
        </Styled.HideOverflow>
      }
    </>
  );
}

export default ImageHead;
