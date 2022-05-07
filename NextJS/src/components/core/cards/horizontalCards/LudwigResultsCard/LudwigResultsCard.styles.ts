import Buttons from "styles/Buttons";
import tw from "twin.macro";
import styled, {css} from "styled-components";
const HorizontalCard = tw.article`
	flex
  flex-col
  space-y-8
  //scroll-snap-align[center]
	//// Wrap
	//2xl:(flex-nowrap justify-start)
	//xl:(flex-wrap justify-center)
	//md:(flex-nowrap justify-start)
	//sm:(flex-wrap justify-center)
  //justify-center
  //content-start
	//flex-wrap

	// Colors
	bg-lightCard-base
	dark:bg-darkCard-base

	// Shape:
  
	min-width[90%]
  height[fit-content]
	rounded-2xl

	shadow-xl
  p-4
`;


const Row = tw.div`
  flex
  flex-row
  space-x-2
`

const Title = tw.h4`
  text-center

`

const Subtitle = tw.h5`
  text-center
`

const ThreeCols = tw.div`
  flex
  flex-row
  flex-wrap
  items-start
  justify-around
  gap-4
`

const Col = tw.div`
  w-auto

  flex
  flex-col
  space-y-2

  items-center



`

interface IPill {
  confidence: "low" | "medium" | "high";
}
const Pill = styled(Buttons.BasicButton)<IPill>(({ confidence }) => [
  confidence == "low" && tw`
    bg-red-50
    text-red-600 
    border-red-600
    
    
    hover:(bg-red-50
      text-red-600 
      border-red-600)`,




  confidence == "medium" && tw`
    bg-yellow-200
    text-yellow-700 
    border-yellow-700
    
    hover:(bg-yellow-200
    text-yellow-700 
    border-yellow-700)
    `,


  




  confidence == "high" && tw`
    bg-green-50 
    text-green-600 
    border-green-600
    
    hover:(bg-green-50 
      text-green-600 
      border-green-600)
  `,
  

  tw`
    border
    capitalize
    
  `,
  
  css`

  `,
]);

const Styled = { HorizontalCard, Pill, Row, Title, Subtitle, ThreeCols, Col };

export default Styled;
