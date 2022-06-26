import tw from "twin.macro";

const FullPage = tw.div`
`;

const CenterItem = tw.div`
  min-height[100vh]
  height[max-content]
  w-screen

	flex
	
	justify-center
	content-center
	items-center
`;

const Observer = tw.div`
  height[0]
  relative

  width[100vh]
  top[50vh]
  bg-red-300

`;

const Styled = { FullPage, CenterItem, Observer };

export default Styled;
