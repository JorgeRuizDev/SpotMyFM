import tw from "twin.macro";

const Observer = tw.div`
  w-0
  h-full
`;

const Snap = tw.div`
  w-full
  scroll-snap-type[x mandatory]
  
  flex
  flex-row

  overflow-x-scroll
  overflow-y-hidden
  gap-x-4
  p-2

  relative

  scroll-behavior[smooth]
`;

const ButtonsWrap = tw.div`
  hidden
  md:flex

  flex-row
  items-center
  justify-evenly
`;

const Styled = { Snap, Observer, ButtonsWrap };

export default Styled;
