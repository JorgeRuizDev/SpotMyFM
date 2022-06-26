import { FaLastfm, FaSpotify } from "react-icons/fa";
import tw from "twin.macro";
const SpotifyIcon = tw(FaSpotify)`
	h-6
	w-6
	text-gray-700
	dark:text-gray-100
`;

const LastfmIcon = tw(FaLastfm)`
	h-6
	w-6
	text-gray-700
	dark:text-gray-100
`;

const Items = tw.div`
	w-full
	flex
	flex-row
	items-center
	justify-start

	space-x-3

	z-30
`;

const Styled = { SpotifyIcon, Items, LastfmIcon };
export default Styled;
