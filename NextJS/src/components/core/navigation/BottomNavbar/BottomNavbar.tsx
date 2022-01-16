import { ActivePage } from "enums/ActivePage";
import { useSessionStore } from "store/useSession";
import Styled from "./BottomNavbar.styles";
import Link from "components/util/Link";
import { useState } from "react";
import PhoneMenu from "./PhoneMenu";
interface IBottomNavbarProps {
  isLogged?: boolean;
}

function BottomNavbar({ isLogged }: IBottomNavbarProps): JSX.Element {
  const { activePage } = useSessionStore();

  const [isMenuActive, setIsMenuActive] = useState(false);

  return isLogged ? (
    <>
      <Styled.Display>
        <Styled.FixPos
          onClick={() => {
            if (isMenuActive) {
              setIsMenuActive(false);
            }
          }}
        >
          <Link href="/">
            {activePage === ActivePage.HOME ? (
              <Styled.TopIconActive />
            ) : (
              <Styled.TopIcon />
            )}
          </Link>

          <Link href="/libraryManager">
            {activePage === ActivePage.LIBRARY_MGR ? (
              <Styled.LibraryIconActive />
            ) : (
              <Styled.LibraryIcon />
            )}
          </Link>

          <Link href="/albumManager">
            {activePage === ActivePage.ALBUM_MGR ? (
              <Styled.AlbumIconActive />
            ) : (
              <Styled.AlbumIcon />
            )}
          </Link>

          <Link href="/playlistManager">
            {activePage === ActivePage.PLAYLIST_MGR ? (
              <Styled.PlaylistIconActive />
            ) : (
              <Styled.PlaylistIcon />
            )}
          </Link>

          <div
            onClick={() => {
              setIsMenuActive((isActive) => !isActive);
            }}
          >
            {isMenuActive ? <Styled.MenuActive /> : <Styled.Menu />}
          </div>
        </Styled.FixPos>
      </Styled.Display>
      <PhoneMenu
        isOpen={isMenuActive}
        onClose={() => {
          setIsMenuActive(false);
        }}
      />
    </>
  ) : (
    <></>
  );
}

export default BottomNavbar;
