import tw from "twin.macro";

const Snap = tw.div`
  w-full
  scroll-snap-type[x mandatory]

  flex
  flex-row

  overflow-y-auto

  gap-x-4
  p-2
`;

const CardWrap = tw.div`

  w-max
`;

const Styled = { Snap, CardWrap };

export default Styled;
