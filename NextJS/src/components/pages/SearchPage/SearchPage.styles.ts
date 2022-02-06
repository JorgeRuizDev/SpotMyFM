import tw from "twin.macro";
import Ms from "styles/Miscellaneous";

const Col = tw.div`
  flex
  flex-col
  space-y-5

`;

const CardWrap = tw.div`
  width[400px]
  min-w-[300px]

`;
const Card = tw(Ms.Card)`
  pt-5
  pb-5
  flex
  flex-col
  items-center
  justify-center
  space-y-4
  
`;

const Form = tw.form`
  m-4
  mt-10
`

const Center = tw.div`
  w-full
  flex
  flex-row
  justify-center
`;

const Styled = { Center, CardWrap, Col, Card, Form };

export default Styled;
