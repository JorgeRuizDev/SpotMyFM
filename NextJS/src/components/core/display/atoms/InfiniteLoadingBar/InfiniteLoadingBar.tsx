import Styled from "./InfiniteLoadingBar.styles";
interface IInfiniteLoadingBarProps {
  isLoading: boolean;
}

function InfiniteLoadingBar({ isLoading }: IInfiniteLoadingBarProps) {
  return <>{isLoading ? <Styled.Bar /> : <Styled.InvisibleBar />}</>;
}

export default InfiniteLoadingBar;
