import LudwigDropZone from "components/core/input/atoms/LudwigDropZone";
import Styled from "./Upload.styles";
import Text from "../../../styles/Text";
interface IUploadProps {}

function Upload(props: IUploadProps): JSX.Element {
  return (
    <>
      <Text.PageTitle>
        <span>Upload Your Track File!</span>
      </Text.PageTitle>

      <LudwigDropZone />
    </>
  );
}

export default Upload;
