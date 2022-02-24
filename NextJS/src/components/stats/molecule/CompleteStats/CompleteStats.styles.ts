import tw from "twin.macro";

const Layout = tw.div`
  flex
  flex-row
  flex-wrap
  items-start
  justify-around
  flex-1
  gap-8
`;

const OverScroll = tw.div`
  flex
  flex-col
  md:min-width[600px]
  overflow-hidden
  space-y-3
`;

const Inline = tw.div`
  w-full
  flex
  flex-row
  items-center
  justify-center
  space-x-2
`;

const AlbumViewMinH = tw.div`
  w-full
  min-height[400px]
  flex
  justify-center

`;

const Styled = { Layout, OverScroll, Inline, AlbumViewMinH };

export default Styled;
