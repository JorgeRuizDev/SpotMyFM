import tw from "twin.macro";

const Wrap = tw.div`
  absolute

  z-index[-10]
  bg-black
  blur-md
  -mt-5
  w-full
`;

const ExtraBlur = tw.div`
  blur-3xl
  h-0.5

`;

const HideOverflow = tw.div`
  w-full
  relative
  
`;

const Img = tw.img`
  w-full
  h-52
  dark:opacity-50
  
  object-fit[cover]
`;

const Styled = { Img, Wrap, HideOverflow, ExtraBlur };

export default Styled;
