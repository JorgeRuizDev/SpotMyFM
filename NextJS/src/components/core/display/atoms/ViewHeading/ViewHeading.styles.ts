import tw from "twin.macro";

const Row = tw.div`
  w-full
  flex
  md:flex-row
  flex-col
  gap-4
  items-center
`;

const Col = tw.div`
  flex
  flex-col
  
  space-y-2
  md:(items-start space-y-4 text-left)
  items-center

  text-center
`;

const Img = tw.img`
  md:max-w-[300px]
  sm:max-w-[250px]
  max-w-[200px]
`;

const Styled = { Row, Col, Img };

export default Styled;
