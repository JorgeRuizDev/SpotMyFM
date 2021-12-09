import React, { ReactNode, useCallback, useState } from "react";
import Styled from "./PopularitySelector.styles";
import Buttons from "styles/Buttons";
import { IInterval } from "util/filters/intervalFilters";
import DoubleSlider from "../../atoms/Sliders/DoubleSlider";

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
            Between: {100 - lowInterval}% - {100 - topInterval}%
          </p>
          <Buttons.PrimaryGreenButton onClick={resetSlider}>
            Reset to Default
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
