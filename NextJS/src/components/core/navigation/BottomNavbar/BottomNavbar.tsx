import { ActivePage } from "enums/ActivePage";
import { useSessionStore } from "store/useSession";
import { GiPodiumThird, GiPodiumWinner } from "react-icons/gi";
import { MdLibraryMusic, MdOutlineLibraryMusic } from "react-icons/md";
import Styled from "./BottomNavbar.styles";
import { BsVinyl, BsVinylFill } from "react-icons/bs";
import { RiPlayListFill, RiPlayListLine } from "react-icons/ri";
import { BiMenuAltRight } from "react-icons/bi";
import { AnimateSharedLayout } from "framer-motion";
import { HiMenuAlt3 } from "react-icons/hi";
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
        <AnimateSharedLayout>
          <Styled.FixPos>
            <Styled.IconWrap isActive={activePage === ActivePage.HOME}>
              <Link href="/">
                {activePage === ActivePage.HOME ? (
                  <GiPodiumWinner style={{ height: "100%", width: "100%" }} />
                ) : (
                  <GiPodiumThird style={{ height: "100%", width: "100%" }} />
                )}
              </Link>
            </Styled.IconWrap>

            <Styled.IconWrap isActive={activePage === ActivePage.LIBRARY_MGR}>
              <Link href="/libraryManager">
                {activePage === ActivePage.LIBRARY_MGR ? (
                  <MdLibraryMusic style={{ height: "100%", width: "100%" }} />
                ) : (
                  <MdOutlineLibraryMusic
                    style={{ height: "100%", width: "100%" }}
                  />
                )}
              </Link>
            </Styled.IconWrap>

            <Styled.IconWrap isActive={activePage === ActivePage.ALBUM_MGR}>
              <Link href="/albumManager">
                {activePage === ActivePage.ALBUM_MGR ? (
                  <BsVinylFill style={{ height: "100%", width: "100%" }} />
                ) : (
                  <BsVinyl style={{ height: "100%", width: "100%" }} />
                )}
              </Link>
            </Styled.IconWrap>

            <Styled.IconWrap>
              <Link href="/playlistManager">
                {activePage === ActivePage.PLAYLIST_MGR ? (
                  <RiPlayListFill style={{ height: "100%", width: "100%" }} />
                ) : (
                  <RiPlayListLine style={{ height: "100%", width: "100%" }} />
                )}
              </Link>
            </Styled.IconWrap>

            <Styled.IconWrap
              isActive={false}
              onClick={() => {
                setIsMenuActive(true);
              }}
            >
              <HiMenuAlt3 style={{ height: "100%", width: "100%" }} />
            </Styled.IconWrap>
          </Styled.FixPos>
        </AnimateSharedLayout>
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
