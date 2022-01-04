import tw from "twin.macro";
import Buttons from "styles/Buttons";

const Card = tw.div`

	flex
	flex-col
	space-y-6

	p-6

	md:(min-width[50vw])
	min-width[300px]

  overflow-y-auto
`;

const Center = tw.div`

	w-full

	flex
	flex-col
	space-y-6

	justify-center
	items-center
`;

const PillWrap = tw.div`
	flex
	flex-row
	flex-wrap
   
	justify-center
    
	w-full
`;

const Pill = Buttons.SecondaryGreenButton;

const Styled = { Card, PillWrap, Pill, Center };

export default Styled;
