import tw from "twin.macro";
import MiscStyles from "styles/Miscellaneous";
const FullPageCenter = tw.div`
	h-full
	w-full

	flex
	flex-col

	justify-center
	content-center
	items-center
`;

const Card = tw(MiscStyles.Card)`
	max-width[1000px]
	justify-center
	content-center
	items-center

	space-y-4
`;

const Styled = { FullPageCenter, Card };
export default Styled;
