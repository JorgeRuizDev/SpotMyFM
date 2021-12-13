import tw from "twin.macro";

const Snap = tw.div`
  w-full
  scroll-snap-type[x mandatory]
  
  flex
  flex-row

  overflow-x-scroll

  gap-x-4
  p-2
`;

const Styled = { Snap };

export default Styled;
