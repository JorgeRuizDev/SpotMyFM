import Styled from "./GroupedGreenButton.styles";

interface IButton {
  body: JSX.Element;
  secondary?: boolean;
  onClick: () => void;
  disabled?: boolean;
  title?: string;
}

interface IGroupedGreenButtonProps {
  buttons: IButton[];
}

function GroupedGreenButton({
  buttons,
}: IGroupedGreenButtonProps): JSX.Element {
  return (
    <Styled.BtnWrap>
      {buttons.map((b, i) => {
        return b.secondary ? (
          <Styled.BtnSecondary
            disabled={b.disabled}
            onClick={b.onClick}
            key={i}
            title={b.title}
          >
            {b.body}
          </Styled.BtnSecondary>
        ) : (
          <Styled.Btn
            disabled={b.disabled}
            onClick={b.onClick}
            key={i}
            title={b.title}
          >
            {b.body}
          </Styled.Btn>
        );
      })}
    </Styled.BtnWrap>
  );
}

export default GroupedGreenButton;
