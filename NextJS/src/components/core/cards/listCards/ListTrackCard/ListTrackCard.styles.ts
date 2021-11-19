import tw from "twin.macro";
import StyledList from "./../ListCard.styles";

const ListItem = tw(StyledList.ListItem)`
  min-height[65px]
  p-1
`;

const Cover = tw.img`
  max-height[45px]
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

const LeftSide = tw(StyledList.LeftSide)``;

const RightSide = StyledList.RightSide;

const E1 = tw(StyledList.E1)`flex flex-col`;
const E2 = tw(StyledList.E2)``;
const E3 = tw(StyledList.E3)`max-width[140px]`;
const E4 = tw(StyledList.E4)``;
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
  E1,
  E2,
  E3,
  E4,
  E5,
  E6,
};

export default Styled;
