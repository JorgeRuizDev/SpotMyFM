import React, { useMemo } from "react";

import Styled from "./LikeIcon.styles";
interface ILikeIconProps {
  isLiked: boolean;
}

function LikeIcon({ isLiked }: ILikeIconProps) {
  return (
    <>
      <div>{isLiked ? <Styled.FillIcon /> : <Styled.LineIcon />}</div>
    </>
  );
}

export default React.memo(LikeIcon);
