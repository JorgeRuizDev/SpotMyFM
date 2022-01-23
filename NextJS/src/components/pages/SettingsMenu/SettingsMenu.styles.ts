import tw from "twin.macro";

const TabLayout = tw.div`
  flex
  md:(flex-row)
  flex-col
`;

const TabWrap = tw.div`
  flex
  flex-col
  space-y-2
  md:w-1/5
`;

const FullH = tw.div`
  h-full
`;

const Styled = { TabLayout, TabWrap , FullH};

export default Styled;
