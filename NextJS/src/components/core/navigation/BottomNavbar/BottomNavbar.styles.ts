import styled, { css } from "styled-components";
import tw from "twin.macro";
import { BsVinyl, BsVinylFill } from "react-icons/bs";
import { RiPlayListFill, RiPlayListLine } from "react-icons/ri";
import { HiMenuAlt3 } from "react-icons/hi";
import { GiPodiumThird, GiPodiumWinner } from "react-icons/gi";
import { MdLibraryMusic, MdOutlineLibraryMusic } from "react-icons/md";

const Display = tw.nav`
  flex
  md:hidden
  w-full
  h-16
`;


const FixPos = styled.div(() => [
  tw`
    // Position
    fixed
    bottom-0
    z-30
    w-full
    h-12

    // Content
    flex
    flex-row
    flex-nowrap
    justify-evenly
    items-center

    // color:
    bg-darkGreen-base
    dark:bg-darkGreen-base
    drop-shadow-2xl
  `,

  css`
    a {
      width: fit-content;
      height: fit-content;
    }
  `,
]);

const IconWrap = styled.span(({ isActive }: { isActive?: boolean }) => [
  tw`
    w-8
    h-8

    transition-colors
    ease-in-out
    duration-150

    fill-current
  `,
]);

const icon = `
  w-8
  h-8
  transition-colors
  ease-in-out
  duration-150

  fill-current

  text-white
  dark:(text-white cursor-pointer)

  cursor-pointer

`;

const activeIcon = `
  ${icon}
  text-green-300
  dark:text-green-300
`;

const TopIcon = tw(GiPodiumThird)`
  ${icon}
`;

const TopIconActive = tw(GiPodiumWinner)`

  ${activeIcon}
`;

const LibraryIcon = tw(MdOutlineLibraryMusic)`
  ${icon}
`;

const LibraryIconActive = tw(MdLibraryMusic)`
  ${activeIcon}
`;

const AlbumIcon = tw(BsVinyl)`
  ${icon}
`;

const AlbumIconActive = tw(BsVinylFill)`
  ${activeIcon}
`;

const PlaylistIcon = tw(RiPlayListLine)`
  ${icon}
`;

const PlaylistIconActive = tw(RiPlayListFill)`
  ${activeIcon}
`;

const Menu = tw(HiMenuAlt3)`
  ${icon}
`;

const MenuActive = tw(HiMenuAlt3)`
  ${activeIcon}
`;

const Styled = {
  Display,
  FixPos,
  IconWrap,
  LibraryIcon,
  LibraryIconActive,
  AlbumIcon,
  AlbumIconActive,
  PlaylistIcon,
  PlaylistIconActive,
  Menu,
  MenuActive,
  TopIcon,
  TopIconActive,
};

export default Styled;
