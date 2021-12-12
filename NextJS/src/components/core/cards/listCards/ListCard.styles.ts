import tw from "twin.macro";

const ListItem = tw.tr`
  w-full
  flex
  flex-row
  items-center
  

  hover:(bg-lightCard-base dark:bg-darkCard-base)
  
`;

const LeftSide = tw.td`
  flex
  flex-row
  flex-nowrap
  items-center
  flex-grow
  space-x-2
  
`;

const RightSide = tw.td`
  flex
  flex-row
  flex-nowrap
  items-center
  justify-around
  flex-grow-0
  space-x-2
  min-width[80px]
`;

const E1 = tw.td`
  flex
  flex-1

`;

const E2 = tw.td`
  sm:(flex flex-1)
  hidden
  
`;

const E3 = tw.td`
  md:(flex flex-1)
  hidden
  
`;

const E4 = tw.td`
  lg:(flex flex-1)
  hidden
`;

const E5 = tw.td`
  xl:(flex flex-1)
  hidden
`;

const E6 = tw.td`
  2xl:(flex flex-1)
  hidden
`;
const Styled = {
  ListItem,
  RightSide,
  LeftSide,
  E1,
  E2,
  E3,
  E4,
  E5,
  E6,
};

export default Styled;
