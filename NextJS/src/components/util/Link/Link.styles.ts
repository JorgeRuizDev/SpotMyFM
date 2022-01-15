import Link from "next/link";
import styled, { css } from "styled-components";
import tw from "twin.macro";

const NextLink = tw(Link)`
	width[inherit]
	height[inherit]
	color[inherit]
`;

const A = styled.a(() => [
  tw`
    width[inherit]
    height[inherit]
    color[inherit]
    dark:color[inherit]
    hover:no-underline
  `,

  css`
    .dark & {
      color: inherit;
    }
  `,
]);

const Styled = { NextLink, A };

export default Styled;
