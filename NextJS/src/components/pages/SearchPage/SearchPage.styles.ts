import tw from "twin.macro";
import Ms from "styles/Miscellaneous";

const Col = tw.div`
  flex
  flex-col
  space-y-5

`;

const Inline = tw.article`
  flex
  w-full
  flex-row
  flex-wrap
  items-center
  justify-center
  gap-2
  
`

const CardWrap = tw.div`
  w-auto

`;
const Card = tw(Ms.Card)`
  sm:p-5
  p-2
  flex
  items-center
  justify-center
  gap-5
  space-y-0
  flex-row
  flex-wrap

  
`;

const Form = tw.form`
  w-full
  m-4
  mt-10
`;

const Center = tw.div`
  w-full
  flex
  flex-row
  justify-center
`;

const Styled = { Center, CardWrap, Col, Card, Form, Inline};

export default Styled;
