import Styled from "./MultipleSkeletonCards.styles";
import SkeletonCard from "./../SkelletonCard";
import React from "react";
interface IMultipleSkeletonCardsProps {
  numberOfElements?: number;
}

function MultipleSkeletonCards({
  numberOfElements = 10,
}: IMultipleSkeletonCardsProps) {
  return (
    <Styled.CardLayout>
      {Array.from({ length: numberOfElements }, (_, i) => (
        <SkeletonCard key={i} />
      ))}
    </Styled.CardLayout>
  );
}

export default React.memo(MultipleSkeletonCards);
