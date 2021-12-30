import { RiVolumeMuteFill } from "react-icons/ri";
import Buttons from "styles/Buttons";
import tw from "twin.macro";
import CardStyles from "../../Card.styles";
const CardLayout = tw(CardStyles.Layout)``;

const AlbumCover = tw(CardStyles.Image)``;

const Image = tw(CardStyles.Image)``;

const Content = tw(CardStyles.Content)``

const InfoLayout = tw.section`
	w-full
`;

const Styled = { CardLayout, AlbumCover, Image, InfoLayout, Content };

export default Styled;
