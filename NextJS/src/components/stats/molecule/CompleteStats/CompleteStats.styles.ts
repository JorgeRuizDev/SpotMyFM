import tw from "twin.macro";

const Layout = tw.div`
  flex
  flex-row
  flex-wrap
  items-end
  justify-around

  gap-5

  mb-[800px]
`;

const OverScroll = tw.div`
  flex
  flex-col
  md:min-width[600px]
  overflow-hidden
  space-y-3
`;

const Styled = { Layout, OverScroll };

export default Styled;
