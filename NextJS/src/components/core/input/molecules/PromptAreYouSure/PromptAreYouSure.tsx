import Styled from "./PromptAreYouSure.styles";
import Buttons from "styles/Buttons";
import Text from "styles/Text";
import { ReactNode } from "react";
import useTranslation from "next-translate/useTranslation";
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
  const { t } = useTranslation();
  return (
    <Styled.Col>
      <Text.Center>
        <h3>{t("cards:are_you_sure")}</h3>
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
          {t("cards:yes_im_sure")}
        </Buttons.PrimaryRedButton>
        <Buttons.SecondaryRedButton
          onClick={() => {
            onCancel();
            onClose();
          }}
        >
          {t("cards:im_not_sure")}
        </Buttons.SecondaryRedButton>
      </Styled.BtnRow>
    </Styled.Col>
  );
}

export default PromptAreYouSure;
