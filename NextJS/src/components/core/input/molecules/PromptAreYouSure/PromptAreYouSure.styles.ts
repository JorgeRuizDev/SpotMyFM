import tw from "twin.macro";

const Col = tw.article`
  flex
  flex-col
  space-y-6
  
`;

const Red = tw.h1`
  m-4
  text-7xl

  lg:text-8xl
  text-red-500
  dark:text-red-500
`;

const BtnRow = tw.div`
  flex
  flex-row

  items-center
  justify-around

`;

const Styled = { Col, Red, BtnRow };

export default Styled;
