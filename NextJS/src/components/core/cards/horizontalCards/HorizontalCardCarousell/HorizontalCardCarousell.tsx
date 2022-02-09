import React, {
  createRef,
  useCallback,
  useEffect,
  useMemo,
  useRef,
} from "react";
import { ReactNode } from "react";
import { useInView } from "react-hook-inview";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import Buttons from "styles/Buttons";
import Styled from "./HorizontalCardCarousell.styles";
interface IHorizontalCardCarousellProps {
  children: ReactNode[];
}

function HorizontalCardCarousell({ children }: IHorizontalCardCarousellProps) {
  const [leftRef, leftInView] = useInView();
  const [rightRef, rightInView] = useInView();

  const scrollRef = createRef<HTMLDivElement>();

  useEffect(() => {
    console.log(scrollRef.current?.clientWidth);
  }, [scrollRef]);

  const scrollLeft = useCallback(() => {
    scrollRef.current?.scrollTo({
      left: scrollRef.current.scrollLeft - 0.8 * scrollRef.current?.clientWidth,
    });
  }, [scrollRef]);

  const scrollRight = useCallback(() => {
    scrollRef.current?.scrollTo({
      left: scrollRef.current.scrollLeft + 0.8 * scrollRef.current?.clientWidth,
    });
  }, [scrollRef]);

  return (
    <>
      {children.length > 1 ? (
        <Styled.Bundle>
          <Styled.Snap ref={scrollRef}>
            <Styled.Observer ref={leftRef} />
            {children}
            <Styled.Observer ref={rightRef} />
          </Styled.Snap>

          <Styled.ButtonsWrap>
            <Buttons.PrimaryGreenButton
              disabled={leftInView}
              onClick={scrollLeft}
            >
              <FaArrowLeft />
            </Buttons.PrimaryGreenButton>
            <Buttons.PrimaryGreenButton
              disabled={rightInView}
              onClick={scrollRight}
            >
              <FaArrowRight />
            </Buttons.PrimaryGreenButton>
          </Styled.ButtonsWrap>
        </Styled.Bundle>
      ) : (
        children
      )}
    </>
  );
}

export default React.memo(HorizontalCardCarousell);
