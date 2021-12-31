import tw from "twin.macro";

const Title = tw.h1`
  text-center
`;

const CardWrap = tw.div`
  max-w-[400px]

`;

const Center = tw.div`
  w-full
  flex
  flex-row
  justify-center
`;

const CardTitle = tw.h4`
  text-center

`;

const Wrap = tw.div`
  space-y-5

`;

const Styled = { Title, Wrap, CardTitle, Center, CardWrap };

export default Styled;
