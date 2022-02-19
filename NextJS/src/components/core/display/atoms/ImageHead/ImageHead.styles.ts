import tw from "twin.macro";

const Wrap = tw.div`
  absolute

  z-index[-10]
  bg-darkMaterialBG-base
  blur-md
  
  w-full
`

const ExtraBlur = tw.div`
  blur-3xl


`

const HideOverflow = tw.div`
  w-full
  relative
`

const Img = tw.img`
  w-full
  h-52
  md:mt-8
  opacity-50

  
  object-fit[cover]
`

const Styled = {Img, Wrap, HideOverflow, ExtraBlur};

export default Styled;
