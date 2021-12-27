interface ILoadingSpinnerProps {
  stroke?: number;
  radius?: number;
}

import styled from "styled-components";

export function LoadingSpinner({
  stroke = 3,
  radius = 10,
}: ILoadingSpinnerProps) {
  return (
    <StyledSpinner viewBox="0 0 50 50">
      <circle
        className="path"
        cx="25"
        cy="25"
        r={radius}
        fill="none"
        strokeWidth={stroke}
      />
    </StyledSpinner>
  );
}
const StyledSpinner = styled.svg`
  animation: rotate 1s linear infinite;
  margin: 40px;
  width: 50px;
  height: 50px;

  & .path {
    stroke: #5652bf;
    stroke-linecap: round;
    animation: dash 1.5s ease-in-out infinite;
  }

  @keyframes rotate {
    100% {
      transform: rotate(360deg);
    }
  }
  @keyframes dash {
    0% {
      stroke-dasharray: 1, 150;
      stroke-dashoffset: 0;
    }
    50% {
      stroke-dasharray: 90, 150;
      stroke-dashoffset: -35;
    }
    100% {
      stroke-dasharray: 90, 150;
      stroke-dashoffset: -124;
    }
  }
`;

export default LoadingSpinner;
