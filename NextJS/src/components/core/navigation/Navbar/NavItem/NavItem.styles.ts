import styled, { css } from "styled-components";
import tw from "twin.macro";

const Inline = tw.div`
  flex
  flex-row
  items-center
  justify-center
  space-x-3

`;

const Wrap = styled.div(() => [
  tw`
    flex
    items-center
    justify-start
    
    bg-green-300

    rounded-full
    p-2

    max-width[200px]
    h-12

    cursor-pointer
    `,

  css`
    a > {
      width: fit-content;
      height: fit-content;
    }
  `,
]);

const Styled = { Inline, Wrap };

export default Styled;
