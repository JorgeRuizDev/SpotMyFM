import GroupedGreenButton from "components/core/input/atoms/GroupedGreenButton";
import useTranslation from "next-translate/useTranslation";
import { BiReset } from "react-icons/bi";
import { HiFilter } from "react-icons/hi";
import Styled from "./FilterButton.styles";
interface IFilterButtonProps {
  onFilter: () => void;
  onReset: () => void;
  disableReset?: boolean;
  disableFilter?: boolean;
}

function FilterButton({
  onFilter,
  onReset,
  disableFilter,
  disableReset,
}: IFilterButtonProps): JSX.Element {
  const { t } = useTranslation();

  return (
    <GroupedGreenButton
      style={{ margin: "0.25rem" }}
      buttons={[
        {
          body: (
            <>
              <HiFilter /> <span>{t("views:filter")}</span>
            </>
          ),
          title: t("views:open-advance-filter"),
          onClick: onFilter,
        },
        {
          body: (
            <>
              <BiReset />
            </>
          ),
          title: t("views:reset-filter"),
          onClick: onReset,
          disabled: disableReset,
          secondary: true,
        },
      ]}
    />
  );
}

export default FilterButton;
