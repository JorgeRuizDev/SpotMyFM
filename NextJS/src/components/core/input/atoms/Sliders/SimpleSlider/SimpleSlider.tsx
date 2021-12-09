import ReactSlider from "react-slider";
import StyledSlider from "styles/Slider";
interface ISimpleSliderProps {
  defaultValue?: number;
  max: number;
  min: number;
  onAfterChange?: (value: number) => void;
  onChange?: (value: number) => void;
}

function SimpleSlider(p: ISimpleSliderProps) {
  return (
    <ReactSlider
      className={"group"}
      defaultValue={p.defaultValue}
      max={p.max}
      min={p.min}
      ariaLabel={"Thumb"}
      renderTrack={Track}
      renderThumb={Thumb}
      key={0}
      onChange={x => {
        if (p.onChange) p.onChange(x);
      }}
      onAfterChange={x => {
        if (p.onAfterChange) p.onAfterChange(x);
      }}
    />
  );
}

const Track = (props: any, state: any) => (
  <StyledSlider.StyledTrack index={state.index} {...props} />
);
const Thumb = (props: any, state: any) => (
  <StyledSlider.ThumbBox {...props} key={state.index}>
    <StyledSlider.StyledThumb />
    <StyledSlider.ValueBox>{state.value}</StyledSlider.ValueBox>
  </StyledSlider.ThumbBox>
);

export default SimpleSlider;
