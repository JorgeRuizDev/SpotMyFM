import tw from "twin.macro";

const DemoWrapper = tw.div`
  flex
  flex-col
  flex-grow
  items-center
  
  w-full

  md:p-20
  p-5

  space-y-12
`;

const CenterRow = tw.div`
  w-full
  flex
  flex-row
  justify-center
  items-center
`;

const CenterCol = tw.div`
  w-full
  flex
  flex-col
  justify-center
  items-center

`;

const Styled = { DemoWrapper, CenterCol, CenterRow };
export default Styled;
