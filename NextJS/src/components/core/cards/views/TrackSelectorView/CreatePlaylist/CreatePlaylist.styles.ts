import tw from "twin.macro";

const TwoCols = tw.div`
	grid
	grid-cols-1
	md:grid-cols-2
	
	space-y-5
	justify-items-center
	content-center

	mt-3
`;

const Box = tw.div`
	space-y-5
	overflow-hidden
`;

const Form = tw.form`
	md:mr-10
	mb-10
`;
const Styled = { Box, Form, TwoCols };

export default Styled;
