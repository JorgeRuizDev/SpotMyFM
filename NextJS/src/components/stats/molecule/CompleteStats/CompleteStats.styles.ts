import tw from "twin.macro";

const Layout = tw.div`
  flex
  flex-row
  flex-wrap

  gap-5

`;

const OverScroll = tw.div`
  flex
  flex-col
	width[fit-content]
	overflow-x-auto
	overflow-y-hidden
  space-y-3
`;


const Styled = { Layout, OverScroll};

export default Styled;
