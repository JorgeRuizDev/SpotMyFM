import GroupedGreenButton from "components/core/input/atoms/GroupedGreenButton";
import useTranslation from "next-translate/useTranslation";
import { BiAddToQueue } from "react-icons/bi";
import { MdRemove } from "react-icons/md";
import Styled from "./SelectAllButton.styles";
interface ISelectAllButtonProps {
  onSelect: () => void;
  onUnselect: () => void;
  disableSelect?: boolean;
  disableUnselect?: boolean;
}

function SelectAllButton({
  onSelect,
  onUnselect,
  disableSelect,
  disableUnselect,
}: ISelectAllButtonProps): JSX.Element {
  const { t } = useTranslation();

  return (
    <GroupedGreenButton
      style={{ margin: "0.25rem" }}
      buttons={[
        {
          body: (
            <>
              <BiAddToQueue />
              <span>{t("views:select-all")}</span>
            </>
          ),
          title: t("views:select-all-elements-"),
          onClick: onSelect,
          disabled: disableSelect,
        },
        {
          body: (
            <>
              <MdRemove />
            </>
          ),
          title: t("views:unselect-all-selecte"),
          onClick: onUnselect,
          disabled: disableUnselect,
        },
      ]}
    />
  );
}

export default SelectAllButton;
