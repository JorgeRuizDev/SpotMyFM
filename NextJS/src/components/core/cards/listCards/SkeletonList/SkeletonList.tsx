import Styled from "./SkeletonList.styles";
interface ISkelletonListProps {}

function SkeletonList(props: ISkelletonListProps) {
  return (
    <Styled.ListItem>
      <Styled.LeftSide>
        <Styled.E1>
          <Styled.LoadingSkel />
        </Styled.E1>
        <Styled.E2>
          <Styled.LoadingSkel />
        </Styled.E2>
        <Styled.E3>
          <Styled.LoadingSkel />
        </Styled.E3>
        <Styled.E3>
          <Styled.LoadingSkel />
        </Styled.E3>
      </Styled.LeftSide>
    </Styled.ListItem>
  );
}

export default SkeletonList;
