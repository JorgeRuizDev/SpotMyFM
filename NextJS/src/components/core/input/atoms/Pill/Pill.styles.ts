import styled from "styled-components";
import tw from "twin.macro";
import Buttons from "styles/Buttons";
interface IPill {
  typeColor: string;
}

const Pill = styled(Buttons.BasicButton)<IPill>(({ typeColor }) => [
  typeColor === "tag" &&
    tw`
		bg-red-500
		hover:bg-red-400
	`,

  typeColor === "genre" &&
    tw`
		bg-blue-400
		hover:bg-blue-500
	`,

  typeColor === "artist" &&
    tw`
	bg-lightGreen-base
	hover:bg-lightGreen-hover
`,
  typeColor === "MySpotifyFmTags" &&
    tw`
    bg-green-100
    text-green-700
    border-green-700
    border
    hover:bg-green-200
    hover:text-green-600
  
  `,

  typeColor == "mood" && tw`
  
    bg-yellow-200
    text-yellow-700
    border
    border-yellow-700
    hover:bg-yellow-100
    hover:text-yellow-600

  `,

  typeColor == "subgenre" && tw`
  
  bg-indigo-200
  text-indigo-700
  border
  border-indigo-600
  hover:bg-indigo-100
  hover:text-indigo-600

`
]);

const Styled = { Pill };

export default Styled;
