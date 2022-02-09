import tw from "twin.macro";

const Row = tw.div`
  w-full
  flex
  md:flex-row
  flex-col
  gap-4
  items-center
  p-3
`;

const Col = tw.div`
  w-full
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
  rounded
`;

const Styled = { Row, Col, Img };

export default Styled;
