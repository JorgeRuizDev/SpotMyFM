import Buttons from "styles/Buttons";
import tw from "twin.macro";

const BioBox = tw.article`
	max-width[60ch]
	
	m-2
`;

const Col = tw.div`
  w-full
  flex
  flex-col
  md:items-start
  items-center
  space-y-3

`;

const TwoCols = tw.section`
  w-full
  flex
  md:flex-row
  flex-col
  
  items-center
  justify-between
  
  content-center
`;

const PillCols = tw(TwoCols)`
  items-start
  justify-start
  mt-5
`;

const PillCol = tw(Col)`
  items-center
`;

const PillWrap = tw.div`
  flex
  flex-wrap
  flex-row
  items-center
  justify-center
  max-width[500px]

`;

const GenrePill = tw(Buttons.BasicButton)`
	bg-blue-400
	hover:bg-blue-500

	cursor-default
`;

const Styled = { BioBox, TwoCols, Col, PillWrap, GenrePill, PillCols, PillCol };

export default Styled;