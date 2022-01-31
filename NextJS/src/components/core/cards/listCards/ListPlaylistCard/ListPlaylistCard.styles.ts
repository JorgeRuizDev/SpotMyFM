import tw from "twin.macro";
import StyledList from "./../ListCard.styles";

const ListItem = tw(StyledList.ListItem)`
  min-height[65px]
  p-1
  cursor-pointer

`;

const Header = tw(ListItem)`
  sticky
  w-full
  top-0
  hover:(dark:bg-darkMaterialBG-base bg-lightCard-base)
  dark:bg-darkMaterialBG-base
  bg-lightMaterialBG-base
  border-b-2
  border-lightCard-base
  dark:border-darkCard-base

  cursor-default
`;

const GreenP = tw.p`
  text-lg
  text-darkGreen-base
  dark:text-lightGreen-base
  cursor-pointer
`;

const Cover = tw.img`
  max-width[45px]
  max-height[45px]
  background-position[center center]
  background-repeat[no-repeat]
`;

const Pos = tw.div`
  w-10
`;
const TrucateP = tw.p`
  truncate
`;

const FirstTwoCols = tw.div`
  flex
  flex-row
  items-center
  min-width[90px]
`;

const Length = tw.div`
  hidden
  min-width[100px]
  lg:(flex)
  justify-center
`;

const RightSideSpacing = tw.div`
  flex
  
  lg:min-width[150px]
`;

const LeftSide = tw(StyledList.LeftSide)``;

const RightSide = tw(StyledList.RightSide)``;

const E1 = tw(StyledList.E1)`flex flex-col max-width[500px]`;
const E2 = tw(StyledList.E2)`max-width[250px]`;
const E3 = tw(StyledList.E3)`max-width[200px]`;
const E4 = tw(
  StyledList.E4
)`sm:(max-width[200px] min-width[100px]) xl:max-width[300px] 2xl:max-width[400px]`;
const E5 = tw(StyledList.E5)`max-width[300px]`;
const E6 = tw(StyledList.E6)``;

const Styled = {
  ListItem,
  LeftSide,
  RightSide,
  Cover,
  Pos,
  TrucateP,
  FirstTwoCols,
  Length,
  Header,
  RightSideSpacing,
  GreenP,
  E1,
  E2,
  E3,
  E4,
  E5,
  E6,
};

export default Styled;
