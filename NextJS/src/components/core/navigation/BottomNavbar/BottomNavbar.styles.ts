import styled from "styled-components";
import tw from "twin.macro";

const Display = tw.nav`
  flex
  md:hidden
  w-full
  h-16
`;

const Padding = tw.div`
  w-full
  h-14
`;

const FixPos = tw(Padding)`
  // Position
  fixed
  bottom-0
  z-30

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
`;

const IconWrap = styled.span(({ isActive }: { isActive?: boolean }) => [
  tw`
    w-8
    h-8
  `,

  `
    {color: rgba(229, 231, 235)}
    .dark & {color: rgba(229, 231, 235)}
  `,

  isActive &&
    `
    {color: rgba(110, 231, 183)}
    .dark & {color: rgba(110, 231, 183)}
  `,
]);

const ActiveTab = tw.div`
  h-2
  rounded-full
  bg-green-200
`;

const Styled = { Display, FixPos, ActiveTab, IconWrap };

export default Styled;
