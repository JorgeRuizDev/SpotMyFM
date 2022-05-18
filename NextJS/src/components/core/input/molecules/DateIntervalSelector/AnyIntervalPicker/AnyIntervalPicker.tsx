import DatePicker from "components/core/input/atoms/DatePicker";
import React from "react";
import Styled from "./AnyIntervalPicker.styles";
import useTranslation from "next-translate/useTranslation";

interface IAnyIntervalPickerProps {
  oldestDate: Date;
  newestDate: Date;
  setMin(d: Date): void;
  setMax(d: Date): void;
}
function AnyIntervalPicker({
  oldestDate,
  newestDate,
  setMin,
  setMax,
}: IAnyIntervalPickerProps) {
  const { t } = useTranslation();
  return (
    <>
      <Styled.CenterRow>
        <Styled.Col>
          <p>{t("cards:start_date")}</p>
          <DatePicker
            onDayChange={(d) => setMin(d)}
            defaultDate={oldestDate}
            dayPickerProps={{
              disabledDays: {
                before: oldestDate,
              },
            }}
          />
        </Styled.Col>

        <Styled.Col>
          <p>{t("cards:end_date")}</p>
          <DatePicker
            onDayChange={(d) => setMax(d)}
            defaultDate={newestDate}
            dayPickerProps={{
              disabledDays: {
                after: newestDate,
              },
            }}
          />
        </Styled.Col>
      </Styled.CenterRow>
    </>
  );
}

export default AnyIntervalPicker;
