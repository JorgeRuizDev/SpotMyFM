import tw from "twin.macro";
import Ms from "styles/Miscellaneous";
const SpaceY = tw.div`
  space-y-5
`;

const Center = tw.div`
  flex
  w-full
  justify-center

`;

const Card = tw(Ms.Card)`
  width[clamp(50, 700px, 95)]


`;

const Styled = { Center, SpaceY, Card };

export default Styled;
