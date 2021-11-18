import Buttons from "styles/Buttons";
import tw from "twin.macro";

const LastFMButton = tw(Buttons.SecondaryRedButton)`
	py-3
	px-3
`;

const SpotifyButton = tw(Buttons.SecondaryGreenButton)`
	py-3
	px-3
`;

const Styled = {LastFMButton, SpotifyButton};

export default Styled;
