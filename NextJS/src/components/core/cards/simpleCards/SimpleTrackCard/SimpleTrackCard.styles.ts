import { RiVolumeMuteFill } from "react-icons/ri";
import Buttons from "styles/Buttons";
import tw from "twin.macro";
import CardStyles from "../../Card.styles";
const CardLayout = tw(CardStyles.Layout)``;

const AlbumCover = tw(CardStyles.Image)``;

const ButtonRow = tw(CardStyles.ButtonRow)``;

const Mute = tw(RiVolumeMuteFill)`
	text-red-500
`;

const RoundButton = tw(Buttons.SecondaryGreenButton)`
	py-3
	px-3
`;

const Styled = { CardLayout, AlbumCover, ButtonRow, Mute, RoundButton };

export default Styled;
