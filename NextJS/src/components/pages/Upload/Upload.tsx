import LudwigDropZone from "components/core/input/atoms/LudwigDropZone";
import Styled from "./Upload.styles";
import Text from "../../../styles/Text";
import useTranslation from "next-translate/useTranslation";
interface IUploadProps {}

function Upload(props: IUploadProps): JSX.Element {
  const { t } = useTranslation();
  return (
    <>
      <Text.PageTitle>
        <span>{t("cards:upload_your_track_file")}</span>
      </Text.PageTitle>

      <LudwigDropZone />
    </>
  );
}

export default Upload;
