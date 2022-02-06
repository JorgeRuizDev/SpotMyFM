import styled, { css } from "styled-components";
import tw from "twin.macro";

const Inline = tw.div`
  flex
  flex-row
  items-center
  justify-start
  space-x-3

`;

const Wrap = styled.div(({ isActive }: { isActive?: boolean }) => [
  isActive &&
    tw`
    bg-green-400
  `,

  tw`
    flex
    items-center
    justify-start

    // Shape
    h-12
    width[min-content]
    rounded-full
    p-2
    pl-4
    pr-4
    text-xl
    
    // Color Animation
    transition-colors
    duration-200

    cursor-pointer

    hover:bg-green-500

    text-white
    dark:text-white
    `,

  css`
    a > {
      width: fit-content;
      height: min-content
      display: flex
      flex
    }

  `,
]);

const Label = tw.span`
  whitespace-nowrap

`;

const Styled = { Inline, Wrap, Label };

export default Styled;
