import tw from "twin.macro";

const Bar = tw.div`
  h-2
  w-full
  mb-2
  animate-pulse
  bg-blue-500

  rounded-full
  z-50
`;

const InvisibleBar = tw.div`
  h-2
  w-full
`;

const Styled = { Bar, InvisibleBar };

export default Styled;
