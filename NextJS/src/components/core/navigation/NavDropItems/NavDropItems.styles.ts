import tw from "twin.macro";

const Col = tw.div`
  flex
  w-full
  h-full

  flex-col
  space-y-4

  text-xl
  text-textColor-lightTheme
  dark:text-textColor-darkTheme
`;

const HoriCenter = tw.div`
  w-full
  items-center
  justify-center
`

const IconWrap = tw.span`
  text-textColor-lightTheme
  dark:text-textColor-darkTheme
`;

const SpaceRow = tw.section`
  w-full
  flex
  flex-row
  items-center
  justify-around
`;

const RowItem = tw.button`
  flex
  flex-row
  items-center
  space-x-3
  
  hover:opacity-80

`;
const Styled = { Col, SpaceRow, RowItem, IconWrap, HoriCenter };

export default Styled;
