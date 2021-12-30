import tw from "twin.macro";

const MinH = tw.div`
  min-h-[300px]
`;

const SliderContainer = tw.section`
	lg:w-1/2
	width[80%]
	m-4
`;

const Wrap = tw.div`
  width[clamp(50%, 700px, 95%)]

`;

const CenterSliderContainer = tw.div`
	w-full
  min-h-[200px]
	flex
	flex-col
	items-center
	justify-center
`;

const Styled = {
  SliderContainer,
  Wrap,
  CenterSliderContainer,
  MinH,
};

export default Styled;
