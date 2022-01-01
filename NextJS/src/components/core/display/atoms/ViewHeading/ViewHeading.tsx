import { ReactNode } from "react";
import Styled from "./ViewHeading.styles";
interface IViewHeadingProps {
  img?: { src?: string; alt: string };
  children?: ReactNode[];
}

function ViewHeading({ img, children }: IViewHeadingProps): JSX.Element {
  return (
    <Styled.Row>
      {img?.src && <Styled.Img src={img.src} alt={img.alt} />}
      <Styled.Col>{children}</Styled.Col>
    </Styled.Row>
  );
}

export default ViewHeading;
