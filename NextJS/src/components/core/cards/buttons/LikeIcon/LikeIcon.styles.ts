
import { RiHeart3Line, RiHeartAddLine, RiHeartFill } from "react-icons/ri";
import styled from "styled-components";
import tw from "twin.macro";



const FillIcon = tw(RiHeartFill)`
	height[18px]
	width[18px]
	text-green-600
`

const LineIcon = tw(RiHeartAddLine)`
	height[18px]
	width[18px]
	text-green-600
`

const Styled = {FillIcon, LineIcon};

export default Styled;