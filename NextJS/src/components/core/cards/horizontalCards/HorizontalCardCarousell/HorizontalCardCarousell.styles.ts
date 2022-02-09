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
  items-center

  overflow-x-scroll
  overflow-y-hidden
  gap-x-4
  p-2

  relative

  scroll-behavior[smooth]
`;

const Bundle = tw.div`

  flex
  flex-col
  overflow-hidden


  w-full
`

const ButtonsWrap = tw.div`
  hidden
  md:flex

  flex-row
  items-center
  justify-center
`;

const Styled = { Snap, Observer, ButtonsWrap, Bundle };

export default Styled;
