import { ActivePage } from "enums/ActivePage";
import useScrollPosition from "hooks/scrollPosition/useScrollPosition";
import useSpotifyPlayer from "hooks/spotify/useSpotifyPlayer";
import { ReactNode, useEffect, useState } from "react";
import { useClientsStore } from "store/useClients";
import { useLoginStore } from "store/useLogin";
import { useSessionStore } from "store/useSession";
import Styled from "./ImageHead.styles";
interface IImageHeadProps {
  children?: ReactNode | ReactNode[];
}

const showHead = (isLogged: boolean, activePage: ActivePage) => {
  return isLogged && activePage != ActivePage.SETTINGS;
};

function ImageHead({ children }: IImageHeadProps): JSX.Element {
  const { cacheClient } = useClientsStore();

  const isLogged = useLoginStore((s) => s.isLogged);

  const { activePage } = useSessionStore();

  const [mtop, setMtop] = useState(0);

  const position = useScrollPosition();

  useEffect(() => {
    if (position < 600) {
      setMtop(position * 0.6);
    }
  }, [position]);

  const [img, setImg] = useState<string>("a");
  useEffect(() => {
    const f = async () => {
      const albums = await cacheClient.getAllAlbums();
      const rand = Math.floor(Math.random() * albums.length - 2);

      setImg(albums[rand]?.spotifyCoverUrl[0] || "a");
    };
    f();
  }, [cacheClient]);

  return (
    <div>
      {img && showHead(!!isLogged, activePage) && (
        <Styled.HideOverflow>
          <Styled.Wrap style={{ marginTop: mtop }}>
            <Styled.Img
              src={img}
              alt="Heading"
              onError={({ currentTarget }) => {
                currentTarget.onerror = null;
                currentTarget.src = "/img/head/court.jpg";
              }}
            />

            <Styled.ExtraBlur />
          </Styled.Wrap>
          {children}
        </Styled.HideOverflow>
      )}
    </div>
  );
}

export default ImageHead;
