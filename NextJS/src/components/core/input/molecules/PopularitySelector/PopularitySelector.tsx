import React, { ReactNode, useCallback, useState } from "react";
import Styled from "./PopularitySelector.styles";
import Buttons from "styles/Buttons";
import { IInterval } from "util/filters/intervalFilters";
import DoubleSlider from "../../atoms/Sliders/DoubleSlider";
import useTranslation from "next-translate/useTranslation";

interface IPopularitySelectorProps {
  setPopularityInterval: (x: IInterval<number>) => void;
  title: ReactNode;
}

function PopularitySelector({
  setPopularityInterval,
  title,
}: IPopularitySelectorProps) {
  const [lowInterval, setLowInterval] = useState(0);
  const [topInterval, setTopInterval] = useState(100);

  const onChange = useCallback(
    (x, y) => {
      setLowInterval(x);
      setTopInterval(y);
      setPopularityInterval({ low: x, top: y });
    },
    [setPopularityInterval]
  );

  function resetSlider() {
    setLowInterval(0);
    setTopInterval(100);
  }
  const { t } = useTranslation();
  return (
    <Styled.Wrap>
      {title}
      <>
        <Styled.SliderWrap>
          <DoubleSlider
            min={0}
            max={100}
            formatOutput={formatOutput}
            onAfterChange={onChange}
            currentValues={[lowInterval, topInterval]}
          />
        </Styled.SliderWrap>

        <Styled.Center>
          <p>
            {t("cards:between")} {100 - lowInterval}% - {100 - topInterval}%
          </p>
          <Buttons.PrimaryGreenButton onClick={resetSlider}>
            {t("cards:reset_to_default2")}
          </Buttons.PrimaryGreenButton>
        </Styled.Center>
      </>
    </Styled.Wrap>
  );
}

function formatOutput(d: number) {
  return <span style={{ whiteSpace: "nowrap" }}>Top {100 - d}%</span>;
}

export default PopularitySelector;
