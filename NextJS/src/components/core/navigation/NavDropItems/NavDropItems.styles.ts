import styled, { css } from "styled-components";
import tw from "twin.macro";

const Avatar = tw.img`
  rounded-full
  object-fit["cover"]
  h-10
`;

const PlayerWrap = tw.section`
  bg-darkCard-base
  dark:bg-darkCard-base

  rounded-md
  m-3
  p-2

  shadow-md

  max-width[300px]
`;

const LinkWrap = styled.div(() => [
  css`
    a > {
      height: fit-content;
      width: fit-content;
    }
  `,
]);

const IconWrap = styled.span(() => [
  css`
    svg > {
      ${tw`
        h-32
        w-32
      `}
    }
  `,
]);

const Col = tw.div`
  flex
  w-full
  h-full

  flex-col
  space-y-4

  text-xl
  text-textColor-lightTheme
  dark:text-textColor-darkTheme
`;

const Center = tw.div`
  w-full
  space-x-4

  flex
  items-center
  justify-center
`;

const SpaceRow = tw.section`
  w-full
  flex
  flex-row
  items-center
  justify-evenly

`;

const RowItem = tw.button`
  flex
  flex-row
  items-center
  space-x-3
  
  hover:opacity-80

`;
const Styled = {
  Col,
  SpaceRow,
  RowItem,
  IconWrap,
  Center,
  Avatar,
  PlayerWrap,
  LinkWrap,
};

export default Styled;
