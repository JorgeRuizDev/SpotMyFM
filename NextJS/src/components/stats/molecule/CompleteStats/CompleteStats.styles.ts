import tw from "twin.macro";

const Layout = tw.div`
  flex
  flex-row
  flex-wrap
  items-start
  justify-around

  gap-5

`;

const OverScroll = tw.div`
  flex
  flex-col
  md:min-width[600px]
  space-y-3
`;

const Styled = { Layout, OverScroll };

export default Styled;
