import tw from "twin.macro";

const FullScreen = tw.div`
  bg-lightMaterialBG-base
  dark:bg-darkMaterialBG-base

  h-full
  w-full

  fixed

  top-0
  left-0
  z-20

  p-3
`

const Styled = {FullScreen};

export default Styled;
