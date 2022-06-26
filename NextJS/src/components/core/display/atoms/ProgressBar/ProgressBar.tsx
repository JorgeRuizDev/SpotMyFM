import { useMemo } from "react";
import Styled from "./ProgressBar.styles";

interface IBaseProp {
  customTitle?: string;
}

interface IProgressCount extends IBaseProp {
  showPercentage?: boolean;
  currentElement: number;
  numberOfTotalElements: number;
  percentage?: never;
}

interface IProgressPercent extends IBaseProp {
  showPercentage?: never;
  currentElement?: never;
  numberOfTotalElements?: never;
  percentage?: number;
}

type IProgressBarProps = IProgressCount | IProgressPercent;

function ProgressBar(props: IProgressBarProps) {
  const percentage = useMemo(() => {
    return props.percentage !== undefined
      ? props.percentage
      : Math.floor(
          ((props?.currentElement || 1) / (props?.numberOfTotalElements || 1)) *
            100
        );
  }, [props.currentElement, props.numberOfTotalElements, props.percentage]);

  return (
    <>
      <div>
        <Styled.p>{props.customTitle}</Styled.p>
        <Styled.BarWrapper>
          <Styled.BackgroundBar>
            <Styled.ProgressBar
              style={{
                width: `
                  ${percentage}%`,
              }}
            />
          </Styled.BackgroundBar>
          {props.showPercentage ? (
            <Styled.Percentage>{percentage}%</Styled.Percentage>
          ) : null}
        </Styled.BarWrapper>
      </div>
    </>
  );
}

export default ProgressBar;
