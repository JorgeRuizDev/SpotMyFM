import React from "react";
import { ReactNode } from "react";
import Styled from "./HorizontalCardCarousell.styles";
interface IHorizontalCardCarousellProps {
  children: ReactNode[];
}

function HorizontalCardCarousell({ children }: IHorizontalCardCarousellProps) {
  return (
    <>
      {children.length > 1 ? <Styled.Snap>{children}</Styled.Snap> : children}
    </>
  );
}

export default React.memo(HorizontalCardCarousell);
