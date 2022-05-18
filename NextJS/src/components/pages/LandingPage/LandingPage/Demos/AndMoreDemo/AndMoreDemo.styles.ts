import tw from "twin.macro";

const GridWrap = tw.div`
  grid
  xl:grid-cols-2
  grid-cols-1

  justify-items-center
  place-items-center

  gap-10
  gap-y-20
`;

const CenterCol = tw.div`
  w-full
  flex
  flex-col
  items-center
  justify-center
`;

const VideoWrap = tw.div`
  grid

`;
const Styled = { GridWrap, CenterCol };

export default Styled;
