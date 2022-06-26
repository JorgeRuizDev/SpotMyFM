import React, { ReactNode } from "react";
import ReactSlider from "react-slider";
import StyledSlider from "styles/Slider";

interface IDoubleSliderProps {
  defaultFirstValue?: number;
  defaultSecondValue?: number;
  max: number;
  min: number;
  currentValues?: number[];
  minDistance?: number;
  step?: number;
  onChange?: (value1: number, value2: number) => void;
  onAfterChange?: (value1: number, value2: number) => void;
  formatOutput?: (x: number) => ReactNode;
}

function DoubleSlider(p: IDoubleSliderProps): JSX.Element {
  const Thumb = (props: any, state: any) => (
    <StyledSlider.ThumbBox {...props}>
      <StyledSlider.StyledThumb />
      <StyledSlider.ValueBox>
        {p.formatOutput !== undefined
          ? p.formatOutput(state.valueNow)
          : state.valueNow}
      </StyledSlider.ValueBox>
    </StyledSlider.ThumbBox>
  );

  return (
    <ReactSlider
      className={"group"}
      defaultValue={[
        p.defaultFirstValue || p.min,
        p.defaultSecondValue || p.max,
      ]}
      value={[p?.currentValues?.[0] || p.min, p?.currentValues?.[1] || p.max]}
      ariaLabel={["Lower thumb", "Upper thumb"]}
      max={p.max}
      min={p.min}
      step={p.step !== undefined ? p.step : 1}
      minDistance={p.minDistance !== undefined ? p.minDistance : 1}
      pearling
      renderTrack={Track}
      renderThumb={Thumb}
      onChange={(x) => {
        if (p.onChange) p.onChange(x[0], x[1]);
      }}
      onAfterChange={(x) => {
        if (p.onAfterChange) p.onAfterChange(x[0], x[1]);
      }}
    />
  );
}

const Track = (props: any, state: any) => (
  <StyledSlider.StyledDoubleTrack index={state.index} {...props} />
);

export default React.memo(DoubleSlider);
