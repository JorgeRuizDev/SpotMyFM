import tw from "twin.macro";

const Col = tw.div`
  flex
  flex-col
  space-y-2
`;

const Inline = tw.section`
  flex
  flex-row
  items-center
  space-x-3
`;

const Desc = tw.p`
  text-base
  opacity-80
`;

const Styled = { Col, Inline, Desc };

export default Styled;
