import tw from "twin.macro";

const Card = tw.div`

  
	bg-lightCard-base
	dark:bg-darkCard-base

	shadow-2xl

	flex
	flex-col
	flex-nowrap
  flex-grow[100]

	p-4
	space-y-2
  w-full
`;

const Col = tw.div`
  flex
  flex-col
  flex-grow
  items-center
  justify-center
  
  space-y-4
  w-full
  max-width[1000px]

`;

const Styled = { Card, Col };

export default Styled;
