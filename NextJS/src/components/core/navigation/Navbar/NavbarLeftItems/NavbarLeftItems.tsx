import { ActivePage } from "enums/ActivePage";
import React from "react";
import { useState } from "react";
import { AiFillHome } from "react-icons/ai";
import { BiSearch } from "react-icons/bi";
import { BsVinylFill } from "react-icons/bs";
import { MdLibraryMusic } from "react-icons/md";
import { RiPlayListFill } from "react-icons/ri";
import { useSessionStore } from "store/useSession";
import NavItem from "../NavItem";
import Styled from "./NavbarLeftItems.styles";

function NavbarLeftItems(): JSX.Element {
  const { activePage } = useSessionStore();

  return (
    <Styled.Items>
      <>
        <NavItem
          isActive={activePage === ActivePage.HOME}
          href="/"
          item={<AiFillHome />}
          label={"Top"}
        />

        <NavItem
          isActive={activePage === ActivePage.LIBRARY_MGR}
          href="/libraryManager"
          item={<MdLibraryMusic />}
          label={"Library Manager"}
        />

        <NavItem
          isActive={activePage === ActivePage.ALBUM_MGR}
          href="/albumManager"
          item={<BsVinylFill />}
          label={"Album Manager"}
        />

        <NavItem
          isActive={activePage === ActivePage.PLAYLIST_MGR}
          href="/playlistManager"
          item={<RiPlayListFill />}
          label={"Playlist Manager"}
        />

        <NavItem
          isActive={activePage === ActivePage.SEARCH}
          href="/search"
          item={<BiSearch/>}
          label={"Search"}
        />
      </>
    </Styled.Items>
  );
}
export default React.memo(NavbarLeftItems);
