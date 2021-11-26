import Styled from "./Link.styles";
import tw from "twin.macro";
import { ReactNode } from "react";
import styled from "styled-components";

interface IA {
  fullWidth?: boolean;
}

const A = styled.a<IA>(({ fullWidth }) => [
  tw`
    hover:no-underline
    h-full
    width[inherit]

    flex
    flex-row

    items-center
    justify-center
    space-x-2
  `,

  fullWidth && tw`w-full`,
]);

interface ILinkProps {
  children?: ReactNode | ReactNode[];
  href?: string;

  style?: React.CSSProperties;
}

function Link({ href, children, style }: ILinkProps) {
  return href ? (
    <Styled.NextLink href={href} passHref>
      <Styled.A style={style}>{children}</Styled.A>
    </Styled.NextLink>
  ) : (
    <>{children}</>
  );
}

export default Link;
