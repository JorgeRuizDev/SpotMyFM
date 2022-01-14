import Styled from "./Link.styles";
import tw from "twin.macro";
import { ReactNode } from "react";
import styled from "styled-components";

interface IA {
  fullWidth?: boolean;
}

interface ILinkProps {
  children?: ReactNode | ReactNode[];
  href?: string;

  style?: React.CSSProperties;
}

/**
 * Dynamic Link Component
 *
 * Behaves as an HREF if the href attribute is active
 * @param param0
 * @returns
 */
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
