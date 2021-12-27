import tw from "twin.macro";
const p = tw.p`
	text-gray-800
	dark:text-gray-800
`;

const b = tw.b`
	text-2xl
	leading-10
	text-black
	dark:text-black
`;

const ProgressWrapper = tw.div`
  min-h-[8px]
  w-full
`;

const NotificationWrapper = tw.div`
  w-full
	flex
	flex-row
	items-center

`;
const FlexRow = tw.div`
  flex
  flex-row
  flex-wrap
  w-full
`;

const Styled = { p, b, NotificationWrapper, ProgressWrapper, FlexRow };

export default Styled;
