import { Theme } from "enums/Theme";
import { useCallback, useMemo } from "react";
import { Legend, Tooltip } from "recharts";
import { Payload } from "recharts/types/component/DefaultTooltipContent";
import { useThemeStore } from "store/useTheme";
import tw from "twin.macro";

const TooltipWrap = tw.div`
  rounded
  bg-lightCard-base
  dark:bg-darkCard-base
  p-3
`;

const colors = [
  "#10B981",
  "#75CA79",
  "#B2DA79",
  "#EAE784",
  "#3DA2FF",
  "#FF7450",
];

const width = "100%";
const height = 300;

const margin = { bottom: 40, top: 25, left: 0, right: 0 };

const animationDuration = 1000;

interface ICustomTooltip {
  payload?: Payload<any, any>[];
  sort?: (payloadA: any, payloadB: any) => any;
  label: any;
}

function CustomTooltip({ payload, label, sort = () => 0 }: ICustomTooltip) {
  return (
    <TooltipWrap>
      <p>{label}</p>
      {payload?.length &&
        payload.sort(sort).map(({ name, color, value }, index) => {
          return (
            <p key={index} className="tooltip-items" style={{ color: color }}>
              {`${name}: ${value}`}
            </p>
          );
        })}
    </TooltipWrap>
  );
}

function Tooltip_() {
  return (
    <Tooltip
      content={({ payload, label }) => (
        <CustomTooltip payload={payload} label={label} />
      )}
    />
  );
}

export function useRechartsHelper() {
  const { currentTheme } = useThemeStore();

  const months = useMemo(
    () => [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "June",
      "July",
      "Aug",
      "Sept",
      "Oct",
      "Nov",
      "Dec",
    ],
    []
  );

  const getStroke = useCallback(
    () => (currentTheme === Theme.DARK ? "white" : "#4b5563"),
    [currentTheme]
  );

  return {
    getStroke,
    colors,
    width,
    height,
    margin,
    months,
    animationDuration,
    CustomTooltip,
    Tooltip: Tooltip_,
  };
}
