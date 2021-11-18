import Styled from "./SkelletonCard.styles";
interface ISkelletonCardProps {}

function SkelletonCard(props: ISkelletonCardProps) {
  return (
    <>
      <Styled.Layout>
        <Styled.Image />
        <Styled.ButtonRow>
          <Styled.Button />
          <Styled.Button />
          <Styled.Button />
        </Styled.ButtonRow>
        <Styled.Text1 />
        <Styled.Text2 />
        <Styled.Text2 />
      </Styled.Layout>
    </>
  );
}

export default SkelletonCard;
