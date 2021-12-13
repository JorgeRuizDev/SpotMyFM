import { ReactNode } from "react";
import Styled from "./HorizontalCardCarousell.styles";
interface IHorizontalCardCarousellProps {
  children: ReactNode[];
}

function HorizontalCardCarousell({ children }: IHorizontalCardCarousellProps) {
  return (
    <>
      <Styled.Snap>
        {children.map((c, i) => (
          <>{c}</>
        ))}
      </Styled.Snap>
    </>
  );
}

export default HorizontalCardCarousell;
