import tw from "twin.macro";
import StyledList from "../ListCard.styles";

const ListItem = tw(StyledList.ListItem)`
  min-height[65px]
  height[65px]
  p-1
  cursor-pointer
  hover:(dark:bg-darkMaterialBG-base bg-lightMaterialBG-base)
`;

const LeftSide = tw(StyledList.LeftSide)`h-1/2`;

const E1 = tw(StyledList.E1)`h-full`;
const E2 = tw(StyledList.E2)`h-full`;
const E3 = tw(StyledList.E3)`h-full`;

const LoadingSkel = tw.div`
  h-full
  w-full
  m-1
  dark:bg-darkCard-base
  bg-lightCard-base
  rounded-full
  animate-pulse
  
`;

const Styled = { ListItem, LeftSide, E1, E2, E3, LoadingSkel };

export default Styled;
