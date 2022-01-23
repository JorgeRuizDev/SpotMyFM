import Styled from "./PromptAreYouSure.styles";
import Buttons from "styles/Buttons";
import Text from "styles/Text";
import { ReactNode } from "react";
interface IPromptAreYouSureProps {
  message: string;
  svg?: ReactNode;
  onClose?: () => void;
  onSure: () => void;
  onCancel: () => void;
}
/**
 * Basic Prompt that asks the user for an action
 *
 * message: Message to display under the "Are You Sure" message
 * onClose: Optional: If given, the function will be called after the user presses one of the buttons.
 * svg: SVG to display in the center of the screen
 *
 * onSure: Action to run if the user is sure about the action
 * onCancel: Action to run if the user is not sure about the action.
 *
 * @param param0
 * @returns
 */
function PromptAreYouSure({
  message,
  svg,
  onClose = () => {},
  onSure,
  onCancel,
}: IPromptAreYouSureProps): JSX.Element {
  return (
    <Styled.Col>
      <Text.Center>
        <h3>Are You Sure?</h3>
      </Text.Center>
      <Text.Center>
        <h4>{message}</h4>
      </Text.Center>
      <Text.Center>
        <Styled.Red>{svg}</Styled.Red>
      </Text.Center>
      <Styled.BtnRow>
        <Buttons.PrimaryRedButton
          onClick={() => {
            onSure();
            onClose();
          }}
        >
          Yes, Im Sure!
        </Buttons.PrimaryRedButton>
        <Buttons.SecondaryRedButton
          onClick={() => {
            onCancel();
            onClose();
          }}
        >
          I'm Not Sure
        </Buttons.SecondaryRedButton>
      </Styled.BtnRow>
    </Styled.Col>
  );
}

export default PromptAreYouSure;
