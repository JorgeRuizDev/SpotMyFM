import Styled from "./MultipleSkeletonCards.styles";
import SkeletonCard from "./../SkelletonCard";
import React from "react";
interface IMultipleSkeletonCardsProps {}

function MultipleSkeletonCards(props: IMultipleSkeletonCardsProps) {
  return (
    <Styled.CardLayout>
      {Array.from({ length: 10 }, (_, i) => (
        <SkeletonCard key={i} />
      ))}
    </Styled.CardLayout>
  );
}

export default React.memo(MultipleSkeletonCards);
