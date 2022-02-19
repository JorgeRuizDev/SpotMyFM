import tw from "twin.macro";
import styled, { css } from "styled-components";
const Wrap = tw.div`
  absolute
  h-full
  z-index[-10]
  bg-darkMaterialBG-base
  blur-md
  
  w-full
`;

const ExtraBlur = tw.div`
  


`;

const HideOverflow = tw.div`
  w-full
  relative
  min-height[fit-content]
`;

const Img = tw.img`

  w-full
  
  height[calc(100% + 200px)]
  opacity-50

  object-fit[cover]
  `;

const Styled = { Img, Wrap, HideOverflow, ExtraBlur };

export default Styled;
