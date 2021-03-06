import tw from "twin.macro";
import styled, { css } from "styled-components";
const Wrap = tw.div`
  absolute
  
  height[calc(100% + 200px)]
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

`;

const Img = tw.img`

  w-full
  h-full
  
  opacity-50
  object-fit[cover]
  -mt-5
  `;

const Styled = { Img, Wrap, HideOverflow, ExtraBlur };

export default Styled;
